import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/data'

// Full article bodies keyed by slug
const articleContent: Record<string, string> = {
  'optimising-spring-boot-apis': `
## The Problem

On a high-traffic IT governance platform at BT Group, our REST APIs were consistently hitting 400–600ms p95 latency under enterprise load. Dashboards felt sluggish, and users were complaining. The platform ran on Spring Boot backed by Oracle SQL, deployed on WebLogic.

Here's what we did to cut that to sub-200ms.

## 1. Diagnose Before Optimising

Before touching a single line of code, we instrumented everything with Actuator + Micrometer and connected it to a monitoring stack. We identified three culprits:

- **N+1 queries** from lazy-loaded JPA associations
- **Missing indexes** on frequently filtered columns
- **HikariCP pool exhaustion** under concurrent load

## 2. Fix N+1 Queries First

This was the biggest win. We had entities like \`DiscrepancyRecord\` lazily loading \`AuditEntry\` lists. A dashboard call fetching 200 records would fire 201 queries.

**Before:**
\`\`\`java
@OneToMany(fetch = FetchType.LAZY)
private List<AuditEntry> auditEntries;
\`\`\`

**After — JPQL JOIN FETCH:**
\`\`\`java
@Query("SELECT d FROM DiscrepancyRecord d LEFT JOIN FETCH d.auditEntries WHERE d.status = :status")
List<DiscrepancyRecord> findByStatusWithAudit(@Param("status") String status);
\`\`\`

Single query. Massive difference.

## 3. Strategic Indexing on Oracle

We ran \`EXPLAIN PLAN\` on our worst queries and found full table scans on a \`compliance_events\` table with 4M+ rows.

\`\`\`sql
-- Before: full scan
SELECT * FROM compliance_events WHERE tenant_id = ? AND event_date > ?;

-- Added composite index
CREATE INDEX idx_compliance_tenant_date ON compliance_events(tenant_id, event_date DESC);
\`\`\`

Query cost dropped from 142,000 to 312. Report generation time fell by **40%**.

## 4. Tune HikariCP

Default pool size of 10 was a bottleneck. We tuned for our WebLogic thread count:

\`\`\`yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 30
      minimum-idle: 10
      connection-timeout: 20000
      idle-timeout: 300000
      max-lifetime: 1200000
\`\`\`

## 5. Cache Reference Data with Redis

Lookup tables — roles, status codes, tenant configs — were being queried on every request. We introduced Redis with Spring Cache:

\`\`\`java
@Cacheable(value = "tenantConfig", key = "#tenantId")
public TenantConfig getConfig(String tenantId) {
    return tenantConfigRepo.findById(tenantId).orElseThrow();
}
\`\`\`

TTL set to 15 minutes. Database load dropped significantly for read-heavy endpoints.

## Results

| Metric | Before | After |
|--------|--------|-------|
| API p95 latency | ~480ms | ~160ms |
| Report generation | baseline | -40% |
| DB query count per request | 40–200 | 1–5 |

The 30% improvement figure we report is a conservative average across all endpoints — some saw 60–70% gains, others less. The key insight: measure first, optimise second.
  `,

  'kafka-vs-rabbitmq-microservices': `
## Background

Our discrepancy detection platform — OR Imperium — originally used synchronous REST calls between services. Service A would call Service B, which called Service C, and so on. When processing millions of inventory records, timeouts cascaded. One slow downstream service would take down the whole pipeline.

We evaluated Kafka and RabbitMQ before choosing Kafka. Here's the honest comparison.

## Where They Differ

### Message Retention
RabbitMQ deletes messages once consumed. Kafka retains them for a configurable period (we use 7 days). This was critical for us — we needed the ability to replay entire comparison runs when bugs were found downstream.

### Throughput
Kafka is built for high-throughput sequential writes. RabbitMQ is built for flexible routing with lower latency. For batch record comparison — millions of events in a run — Kafka's sequential log model was a natural fit.

### Consumer Groups
Kafka's consumer group model let us run multiple independent consumers against the same topic. Our audit service, alerting service, and remediation service all consume the same \`discrepancy.detected\` topic independently. With RabbitMQ, we'd need to duplicate messages across queues.

## Our Implementation

\`\`\`java
// Producer — publish detected discrepancy
@Service
public class DiscrepancyEventPublisher {
    private final KafkaTemplate<String, DiscrepancyEvent> kafkaTemplate;

    public void publish(DiscrepancyEvent event) {
        kafkaTemplate.send("discrepancy.detected", event.getRecordId(), event);
    }
}

// Consumer — remediation service
@KafkaListener(topics = "discrepancy.detected", groupId = "remediation-service")
public void handle(DiscrepancyEvent event) {
    remediationWorkflow.trigger(event);
}
\`\`\`

## What I'd Tell My Past Self

1. **Schema Registry is not optional at scale.** Use Confluent Schema Registry or AWS Glue — producer/consumer schema drift will burn you in production.
2. **Partition count is hard to change later.** Overprovision early. We started with 3 partitions and had to increase — painful.
3. **Dead letter topics from day one.** Don't add them after your first production incident.
4. **Idempotent consumers.** Always design consumers to handle duplicate delivery. Kafka guarantees at-least-once by default.

## When RabbitMQ Is Better

Choose RabbitMQ when you need: complex routing logic (topic exchanges, headers), per-message TTL, priority queues, or low-latency pub/sub with small payloads. It's also simpler to operate at smaller scale.

Kafka wins when you need: high throughput, message replay, event sourcing, or fan-out to many independent consumers.
  `,

  'camunda-bpm-workflow-automation': `
## The Manual Mess We Inherited

When I joined the OR Imperium project, the discrepancy remediation process looked like this:

1. Engineer spots a discrepancy alert in a dashboard
2. Engineer manually files a Jira ticket
3. Ticket goes to a network team queue (days of wait)
4. Network team investigates and updates the ticket
5. Change goes through a manual approval from a manager
6. Engineer closes the ticket and marks the record resolved

Every step was manual, undocumented, and unmeasurable. Audit teams had no visibility. SLA tracking was a spreadsheet.

We replaced this with Camunda BPM.

## What is Camunda BPM?

Camunda is an open-source workflow and decision automation engine. You model processes as BPMN diagrams, and Camunda executes them — tracking state, routing tasks, and calling external services.

The killer feature: your Spring Boot app calls Camunda's API to start and progress workflows, so business logic stays in Java while process orchestration lives in the BPMN model.

## Our BPMN Process

\`\`\`
[Discrepancy Detected] → [Auto-classify severity]
  → HIGH: [Create Jira + Page on-call] → [Manager approval] → [Resolve]
  → LOW:  [Create Jira] → [Team queue] → [Resolve]
  → [Audit log throughout]
\`\`\`

## Spring Boot Integration

\`\`\`java
@Service
public class RemediationWorkflowService {
    private final RuntimeService runtimeService;

    public void startRemediation(DiscrepancyEvent event) {
        Map<String, Object> variables = Map.of(
            "discrepancyId", event.getId(),
            "severity", event.getSeverity(),
            "affectedSystem", event.getSystem()
        );
        runtimeService.startProcessInstanceByKey("discrepancy-remediation", variables);
    }
}

// External task worker — auto-classification
@Component
public class SeverityClassifierWorker implements ExternalTaskHandler {
    @Override
    public void execute(ExternalTask task, ExternalTaskService service) {
        String system = (String) task.getVariable("affectedSystem");
        String severity = classifySeverity(system);
        service.complete(task, Map.of("severity", severity));
    }
}
\`\`\`

## Results

| Metric | Before | After |
|--------|--------|-------|
| Manual steps per remediation | ~6 | ~2 |
| Average resolution time | 3–5 days | 18 hours |
| Manual intervention rate | 100% | ~50% |
| Audit trail completeness | Spreadsheet | Full BPMN history |

## When to Use Camunda

Use it when: you have multi-step approval workflows, need full audit trails, want to visualise process state, or your business process involves humans + automated systems working together.

Don't use it for: simple request/response flows, pure event streaming (Kafka does that better), or when you just need a scheduled job.

The 50% manual intervention reduction was real — and it made our compliance team very happy.
  `,
}

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return { title: `${post.title} — Ayush Soni`, description: post.excerpt }
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const content = articleContent[post.slug] ?? ''

  return (
    <article style={{ maxWidth: 720, margin: '0 auto', padding: '10rem 3rem 6rem' }}>

      {/* Back */}
      <Link href="/blog" style={{
        fontFamily: 'var(--mono)', fontSize: '0.78rem',
        color: 'var(--text2)', letterSpacing: '0.06em',
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        marginBottom: '3rem', transition: 'color 0.2s',
      }} className="blog-back-link">
        ← Back to Blog
      </Link>

      {/* Tags */}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {post.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--mono)', fontSize: '0.68rem',
            color: 'var(--accent)', background: 'rgba(184,245,90,0.08)',
            border: '1px solid rgba(184,245,90,0.2)',
            padding: '0.15rem 0.55rem', borderRadius: 3, letterSpacing: '0.05em',
          }}>{tag}</span>
        ))}
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        color: 'var(--text)', lineHeight: 1.2,
        marginBottom: '1rem',
      }}>{post.title}</h1>

      {/* Meta */}
      <div style={{
        display: 'flex', gap: '1.5rem',
        fontFamily: 'var(--mono)', fontSize: '0.75rem',
        color: 'var(--muted)', marginBottom: '3rem',
        paddingBottom: '2rem', borderBottom: '1px solid var(--border)',
      }}>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>

      {/* Excerpt */}
      <p style={{
        fontSize: '1.1rem', color: 'var(--text2)',
        lineHeight: 1.8, marginBottom: '2.5rem',
        fontStyle: 'italic', borderLeft: '3px solid var(--accent)',
        paddingLeft: '1.25rem',
      }}>{post.excerpt}</p>

      {/* Article body — rendered as formatted sections */}
      <div style={{ color: 'var(--text2)', lineHeight: 1.9, fontSize: '0.97rem' }}>
        {content.trim().split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return (
              <h2 key={i} style={{
                fontFamily: 'var(--serif)', fontSize: '1.6rem',
                color: 'var(--text)', margin: '2.5rem 0 1rem',
              }}>{line.replace('## ', '')}</h2>
            )
          }
          if (line.startsWith('### ')) {
            return (
              <h3 key={i} style={{
                fontFamily: 'var(--serif)', fontSize: '1.2rem',
                color: 'var(--text)', margin: '2rem 0 0.75rem',
              }}>{line.replace('### ', '')}</h3>
            )
          }
          if (line.startsWith('```')) {
            return null // handled below in block grouping
          }
          if (line.startsWith('| ')) {
            return (
              <div key={i} style={{
                fontFamily: 'var(--mono)', fontSize: '0.8rem',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '0.6rem 1rem', margin: '0.2rem 0',
                color: line.includes('---') ? 'transparent' : 'var(--text2)',
                borderLeft: '3px solid var(--accent)',
              }}>{line.replace(/\|/g, '  |  ')}</div>
            )
          }
          if (line.startsWith('- ') || line.startsWith('1. ') || line.match(/^\d+\. /)) {
            return (
              <li key={i} style={{
                paddingLeft: '1.2rem', position: 'relative',
                marginBottom: '0.4rem', listStyle: 'none',
              }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>▸</span>
                <span dangerouslySetInnerHTML={{ __html: line.replace(/^[-\d]+\.?\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>') }} />
              </li>
            )
          }
          if (line.trim() === '') return <div key={i} style={{ height: '0.75rem' }} />

          // Inline code blocks
          const withCode = line.replace(/`([^`]+)`/g, '<code style="font-family:var(--mono);font-size:0.85em;background:var(--surface2);border:1px solid var(--border);padding:0.1rem 0.4rem;border-radius:3px;color:var(--accent)">$1</code>')
          const withBold = withCode.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>')

          return (
            <p key={i} style={{ marginBottom: '1rem' }}
              dangerouslySetInnerHTML={{ __html: withBold }} />
          )
        })}
      </div>

      {/* Code blocks — extracted separately */}
      <style>{`
        pre {
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-family: var(--mono);
          font-size: 0.82rem;
          line-height: 1.7;
          color: var(--text2);
        }
      `}</style>

      {/* Render code blocks */}
      {(() => {
        const blocks: React.ReactNode[] = []
        const lines = content.trim().split('\n')
        let inCode = false
        let codeLines: string[] = []
        let lang = ''

        lines.forEach((line, i) => {
          if (line.startsWith('```') && !inCode) {
            inCode = true
            lang = line.replace('```', '')
            codeLines = []
          } else if (line.startsWith('```') && inCode) {
            inCode = false
            blocks.push(
              <pre key={`code-${i}`}>
                <code>{codeLines.join('\n')}</code>
              </pre>
            )
          } else if (inCode) {
            codeLines.push(line)
          }
        })
        return blocks
      })()}

      {/* Footer nav */}
      <div style={{
        marginTop: '4rem', paddingTop: '2rem',
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Link href="/blog" style={{
          fontFamily: 'var(--mono)', fontSize: '0.78rem',
          color: 'var(--text2)', transition: 'color 0.2s',
        }}
        >← All posts</Link>
        <Link href="/#contact" style={{
          fontFamily: 'var(--mono)', fontSize: '0.78rem',
          color: 'var(--accent)',
        }}>Get in touch →</Link>
      </div>
      <style>{`
        .blog-back-link:hover {
          color: var(--accent) !important;
        }
        a[href="/blog"]:hover {
          color: var(--accent) !important;
        }
      `}</style>
    </article>
  )
}


