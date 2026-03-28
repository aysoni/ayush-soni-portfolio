import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', textAlign: 'center',
    }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
        404
      </p>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--text)', marginBottom: '1rem' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>
        This route doesn&apos;t exist. Maybe it was moved or deleted.
      </p>
      <Link href="/" style={{
        fontFamily: 'var(--mono)', fontSize: '0.82rem',
        background: 'var(--accent)', color: 'var(--bg)',
        padding: '0.8rem 1.8rem', borderRadius: 4,
        letterSpacing: '0.06em',
      }}>← Back home</Link>
    </div>
  )
}