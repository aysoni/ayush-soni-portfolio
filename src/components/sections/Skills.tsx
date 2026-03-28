'use client'

import { useEffect, useRef, useState } from 'react'
import { skillRatings } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

function SkillCard({
  name,
  iconClass,
  filled,
  total,
}: {
  name: string
  iconClass: string
  filled: number
  total: number
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [landed, setLanded] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const bo = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            setLanded(true)
            bo.unobserve(e.target)
          }
        })
      },
      { threshold: 0.25 }
    )
    bo.observe(el)
    return () => bo.disconnect()
  }, [])

  const pct = `${String(filled).padStart(2, '0')}/${total}`

  return (
    <div ref={rootRef} className="skill-card">
      <div className="skill-hdr">
        <div className="skill-name-row">
          <i className={`${iconClass} skill-icon`} />
          <span className="skill-name">{name}</span>
        </div>
        <span className="skill-pct">{pct}</span>
      </div>
      <div className="balls-row">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`ball${i >= filled ? ' empty' : ''}${landed ? ' landed' : ''}`}
            style={{ transitionDelay: landed ? `${i * 75 + 200}ms` : undefined }}
          />
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="sl">03 — Expertise</div>
      <div className="st">
        Technical <span>Skills</span>
      </div>
      <div className="skills-grid">
        {skillRatings.map((s) => (
          <Reveal key={s.name}>
            <SkillCard name={s.name} iconClass={s.icon} filled={s.filled} total={s.total} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
