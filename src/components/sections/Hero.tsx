'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { personal, typedPhrases, heroStats } from '@/lib/data'

export function Hero() {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let cancelled = false
    let pi = 0
    let ci = 0
    let del = false
    let timeoutId: ReturnType<typeof setTimeout>

    const tick = () => {
      if (cancelled) return
      const cur = typedPhrases[pi]
      if (!del) {
        if (ci < cur.length) {
          ci += 1
          setTyped(cur.slice(0, ci))
          timeoutId = setTimeout(tick, 88)
        } else {
          del = true
          timeoutId = setTimeout(tick, 1900)
        }
      } else {
        if (ci > 0) {
          ci -= 1
          setTyped(cur.slice(0, ci))
          timeoutId = setTimeout(tick, 45)
        } else {
          del = false
          pi = (pi + 1) % typedPhrases.length
          timeoutId = setTimeout(tick, 88)
        }
      }
    }

    timeoutId = setTimeout(tick, 88)
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [])

  const downloadCv = async () => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const filename = `${personal.resumeFileBase}_${y}-${m}-${day}.pdf`

    try {
      const res = await fetch(personal.resumePublicPath)
      if (!res.ok) throw new Error('Resume not found')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.rel = 'noopener'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      window.open(`mailto:${personal.email}?subject=Resume%20Request`, '_blank')
    }
  }

  const [firstName, ...restName] = personal.name.split(' ')

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-eyebrow">Open to new opportunities</div>
        <h1 className="hero-name">
          {firstName}
          <br />
          {restName.join(' ')}
        </h1>
        <div className="hero-role-wrap">
          <span className="role-label">I AM A</span>
          <span className="role-text" id="typed-text">
            {typed}
            <span className="typed-cursor">|</span>
          </span>
        </div>
        <div className="hero-location">
          <span>
            <i className="fas fa-map-marker-alt" />
            {personal.location}
          </span>
          <span className="hero-loc-sep">|</span>
          <span>
            <i className="fas fa-phone" />
            {personal.phone}
          </span>
          <span className="hero-loc-sep">|</span>
          <span>
            <i className="fas fa-envelope" />
            {personal.email}
          </span>
        </div>
        <p
          className="hero-desc"
          dangerouslySetInnerHTML={{
            __html: `<strong>${personal.role}</strong> — ${personal.tagline}`,
          }}
        />
        <div className="hero-actions">
          <button type="button" className="btn-g" id="dl-cv" onClick={downloadCv}>
            <i className="fas fa-download" /> Download CV
          </button>
          <Link href="#projects" className="btn-o">
            <i className="fas fa-code-branch" /> View Projects
          </Link>
        </div>
        <div className="hero-stats">
          {heroStats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-num">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
