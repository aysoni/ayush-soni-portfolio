import Link from 'next/link'
import { blogPosts } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Blog — Ayush Soni',
  description: 'Thoughts on Java, Spring Boot, Kafka, microservices, and backend engineering.',
}

export default function BlogPage() {
  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '10rem 3rem 6rem' }}>
      <SectionLabel>Writing</SectionLabel>
      <h1 style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        color: 'var(--text)',
        marginBottom: '0.75rem',
        lineHeight: 1.1,
      }}>
        The <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Blog</em>
      </h1>
      <p style={{
        color: 'var(--text2)', fontSize: '1rem',
        lineHeight: 1.75, marginBottom: '4rem', maxWidth: 520,
      }}>
        Deep-dives on backend engineering — performance tuning, microservices patterns,
        workflow automation, and lessons from production systems.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {blogPosts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <article
              style={{
                padding: '2rem 0',
                borderTop: '1px solid var(--border)',
                borderBottom: i === blogPosts.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '1.5rem',
                alignItems: 'start',
                transition: 'background 0.2s',
                cursor: 'pointer',
              }}
            
            >
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--mono)', fontSize: '0.68rem',
                      color: 'var(--accent)', background: 'rgba(184,245,90,0.08)',
                      border: '1px solid rgba(184,245,90,0.2)',
                      padding: '0.15rem 0.55rem', borderRadius: 3,
                      letterSpacing: '0.05em',
                    }}>{tag}</span>
                  ))}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                    color: 'var(--text)',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem',
                    transition: 'color 0.2s',
                  }}
                > 

                  {post.title}

                </h2>



                <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7, maxWidth: 560 }}>
                  {post.excerpt}
                </p>
              </div>

              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-end', gap: '0.4rem',
                flexShrink: 0, paddingTop: '0.2rem',
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.72rem',
                  color: 'var(--text2)', whiteSpace: 'nowrap',
                }}>{post.date}</span>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.72rem',
                  color: 'var(--muted)', whiteSpace: 'nowrap',
                }}>{post.readTime}</span>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.8rem',
                  color: 'var(--accent)', marginTop: '0.5rem',
                }}>→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

    </section>

  )

}
