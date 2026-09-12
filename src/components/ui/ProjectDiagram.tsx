'use client'

interface Props {
  type: 'taskflow-arch' | 'social-arch'
}

export function ProjectDiagram({ type }: Props) {
  if (type === 'taskflow-arch') {
    return (
      <div className="proj-diagram-wrap" aria-label="TaskFlow Microservice Architecture Diagram">
        <svg
          viewBox="0 0 500 160"
          className="w-full h-auto"
          style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 180 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Docker Network Boundary */}
          <rect
            x="110"
            y="12"
            width="378"
            height="136"
            rx="8"
            stroke="var(--border)"
            strokeDasharray="4 4"
            fill="rgba(255, 255, 255, 0.015)"
          />
          <text
            x="120"
            y="26"
            fill="var(--muted)"
            fontSize="9"
            fontFamily="var(--mono)"
            letterSpacing="0.08em"
          >
            DOCKER CONTAINER NETWORK
          </text>

          {/* Client Node */}
          <rect x="12" y="52" width="76" height="52" rx="6" fill="var(--surface2)" stroke="var(--border)" />
          <text x="50" y="74" fill="var(--text)" fontSize="10" fontWeight="600" fontFamily="var(--mono)" textAnchor="middle">
            React
          </text>
          <text x="50" y="88" fill="var(--muted)" fontSize="8.5" fontFamily="var(--mono)" textAnchor="middle">
            SPA Client
          </text>

          {/* Arrow Client -> Gateway */}
          <path d="M88 78 L126 78" stroke="var(--gold)" strokeWidth="1.5" markerEnd="url(#arrow-gold)" />
          <text x="107" y="72" fill="var(--gold)" fontSize="7.5" fontFamily="var(--mono)" textAnchor="middle">
            JWT/REST
          </text>

          {/* API Gateway */}
          <rect x="128" y="44" width="76" height="68" rx="6" fill="var(--surface2)" stroke="rgba(245,197,24,0.35)" />
          <text x="166" y="68" fill="var(--gold)" fontSize="10" fontWeight="700" fontFamily="var(--mono)" textAnchor="middle">
            Nginx
          </text>
          <text x="166" y="82" fill="var(--text)" fontSize="8.5" fontFamily="var(--mono)" textAnchor="middle">
            API Gateway
          </text>
          <text x="166" y="96" fill="var(--muted)" fontSize="7.5" fontFamily="var(--mono)" textAnchor="middle">
            Port 80/443
          </text>

          {/* Routes to Services */}
          <path d="M204 64 L244 48" stroke="var(--jade)" strokeWidth="1.5" markerEnd="url(#arrow-jade)" />
          <path d="M204 92 L244 108" stroke="var(--jade)" strokeWidth="1.5" markerEnd="url(#arrow-jade)" />

          {/* Service 1: Auth */}
          <rect x="246" y="24" width="112" height="48" rx="6" fill="var(--surface2)" stroke="var(--border)" />
          <text x="302" y="44" fill="var(--text)" fontSize="9.5" fontWeight="600" fontFamily="var(--mono)" textAnchor="middle">
            Auth Service
          </text>
          <text x="302" y="58" fill="var(--jade)" fontSize="8" fontFamily="var(--mono)" textAnchor="middle">
            Spring Boot / JWT
          </text>

          {/* Service 2: Task Board */}
          <rect x="246" y="86" width="112" height="48" rx="6" fill="var(--surface2)" stroke="var(--border)" />
          <text x="302" y="106" fill="var(--text)" fontSize="9.5" fontWeight="600" fontFamily="var(--mono)" textAnchor="middle">
            Task Service
          </text>
          <text x="302" y="120" fill="var(--jade)" fontSize="8" fontFamily="var(--mono)" textAnchor="middle">
            Spring Boot / REST
          </text>

          {/* Connectors to DBs */}
          <path d="M358 48 L390 48" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)" />
          <path d="M358 110 L390 110" stroke="var(--border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)" />

          {/* Database 1 */}
          <rect x="392" y="28" width="86" height="40" rx="5" fill="var(--surface)" stroke="var(--border)" />
          <text x="435" y="46" fill="var(--text)" fontSize="9" fontWeight="600" fontFamily="var(--mono)" textAnchor="middle">
            Users DB
          </text>
          <text x="435" y="58" fill="var(--muted)" fontSize="7.5" fontFamily="var(--mono)" textAnchor="middle">
            PostgreSQL (isolated)
          </text>

          {/* Database 2 */}
          <rect x="392" y="90" width="86" height="40" rx="5" fill="var(--surface)" stroke="var(--border)" />
          <text x="435" y="108" fill="var(--text)" fontSize="9" fontWeight="600" fontFamily="var(--mono)" textAnchor="middle">
            Tasks DB
          </text>
          <text x="435" y="120" fill="var(--muted)" fontSize="7.5" fontFamily="var(--mono)" textAnchor="middle">
            PostgreSQL (isolated)
          </text>

          {/* Marker Defs */}
          <defs>
            <marker id="arrow-gold" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--gold)" />
            </marker>
            <marker id="arrow-jade" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--jade)" />
            </marker>
            <marker id="arrow-dim" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--muted)" />
            </marker>
          </defs>
        </svg>
      </div>
    )
  }

  return (
    <div className="proj-diagram-wrap" aria-label="Social Media Backend Scalability Architecture Diagram">
      <svg
        viewBox="0 0 500 160"
        className="w-full h-auto"
        style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 180 }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* System Boundary */}
        <rect
          x="126"
          y="12"
          width="362"
          height="136"
          rx="8"
          stroke="var(--border)"
          strokeDasharray="4 4"
          fill="rgba(255, 255, 255, 0.015)"
        />
        <text
          x="136"
          y="26"
          fill="var(--muted)"
          fontSize="9"
          fontFamily="var(--mono)"
          letterSpacing="0.08em"
        >
          STATELESS BACKEND CLUSTER
        </text>

        {/* Client / Traffic */}
        <rect x="12" y="48" width="84" height="60" rx="6" fill="var(--surface2)" stroke="var(--border)" />
        <text x="54" y="72" fill="var(--text)" fontSize="10" fontWeight="600" fontFamily="var(--mono)" textAnchor="middle">
          API Traffic
        </text>
        <text x="54" y="86" fill="var(--gold)" fontSize="8.5" fontFamily="var(--mono)" textAnchor="middle">
          High Concurrency
        </text>
        <text x="54" y="98" fill="var(--muted)" fontSize="7.5" fontFamily="var(--mono)" textAnchor="middle">
          Paginated Requests
        </text>

        {/* Arrow Traffic -> Service */}
        <path d="M96 78 L142 78" stroke="var(--gold)" strokeWidth="1.5" markerEnd="url(#arrow2-gold)" />
        <text x="119" y="72" fill="var(--gold)" fontSize="7.5" fontFamily="var(--mono)" textAnchor="middle">
          REST
        </text>

        {/* Spring Boot Microservice Engine */}
        <rect x="144" y="38" width="138" height="80" rx="6" fill="var(--surface2)" stroke="rgba(0,229,160,0.35)" />
        <text x="213" y="60" fill="var(--jade)" fontSize="10.5" fontWeight="700" fontFamily="var(--mono)" textAnchor="middle">
          Spring Boot Service
        </text>
        <text x="213" y="76" fill="var(--text)" fontSize="8.5" fontFamily="var(--mono)" textAnchor="middle">
          Stateless Controllers
        </text>
        <text x="213" y="90" fill="var(--muted)" fontSize="8" fontFamily="var(--mono)" textAnchor="middle">
          HikariCP Connection Pool
        </text>
        <text x="213" y="104" fill="var(--gold)" fontSize="7.5" fontFamily="var(--mono)" textAnchor="middle">
          Server-Side Pagination
        </text>

        {/* Arrows to DB & Cache */}
        <path d="M282 64 L334 46" stroke="var(--jade)" strokeWidth="1.5" markerEnd="url(#arrow2-jade)" />
        <path d="M282 92 L334 110" stroke="var(--gold)" strokeWidth="1.5" markerEnd="url(#arrow2-gold)" />

        {/* Caching / Session Tier */}
        <rect x="336" y="24" width="138" height="46" rx="5" fill="var(--surface)" stroke="var(--border)" />
        <text x="405" y="43" fill="var(--jade)" fontSize="9.5" fontWeight="600" fontFamily="var(--mono)" textAnchor="middle">
          Redis Cache
        </text>
        <text x="405" y="58" fill="var(--muted)" fontSize="8" fontFamily="var(--mono)" textAnchor="middle">
          User Sessions &amp; Feeds
        </text>

        {/* Optimized PostgreSQL */}
        <rect x="336" y="88" width="138" height="48" rx="5" fill="var(--surface)" stroke="rgba(245,197,24,0.35)" />
        <text x="405" y="106" fill="var(--gold)" fontSize="9.5" fontWeight="700" fontFamily="var(--mono)" textAnchor="middle">
          PostgreSQL Database
        </text>
        <text x="405" y="120" fill="var(--text)" fontSize="8" fontFamily="var(--mono)" textAnchor="middle">
          B-Tree Indexes · 25% Latency ↓
        </text>

        {/* Marker Defs */}
        <defs>
          <marker id="arrow2-gold" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L6 3 L0 6 z" fill="var(--gold)" />
          </marker>
          <marker id="arrow2-jade" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L6 3 L0 6 z" fill="var(--jade)" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

