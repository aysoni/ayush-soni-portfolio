import Link from 'next/link'
import { blogPosts } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Blog — Ayush Soni',
  description: 'Thoughts on Java, Spring Boot, Kafka, microservices, and backend engineering.',
}

export default function BlogPage() {
  return (
    <section style={{ maxWidth: 880, margin: '0 auto', padding: '9rem 2rem 6rem' }}>
      <SectionLabel>Writing</SectionLabel>
      <h1
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          color: 'var(--text)',
          marginBottom: '0.75rem',
          lineHeight: 1.15,
        }}
      >
        The <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Blog</em>
      </h1>
      <p
        style={{
          color: 'var(--text2)',
          fontSize: '1.05rem',
          lineHeight: 1.75,
          marginBottom: '3.5rem',
          maxWidth: 580,
        }}
      >
        Deep-dives on backend engineering — performance tuning, microservices patterns,
        workflow automation, and lessons from production systems.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="blog-card"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.85rem',
                }}
              >
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)',
                  color: 'var(--text)',
                  lineHeight: 1.3,
                  marginBottom: '0.75rem',
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--text2)',
                  lineHeight: 1.7,
                  maxWidth: 620,
                }}
              >
                {post.excerpt}
              </p>
            </div>

            <div className="blog-card-meta">
              <span className="blog-date">{post.date}</span>
              <span className="blog-read-time">{post.readTime}</span>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.95rem',
                  color: 'var(--accent)',
                  marginTop: '0.25rem',
                }}
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
