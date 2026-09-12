'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { skillCapabilities, type SkillItem } from '@/lib/data'
import { cardVariant, fadeInUp, staggerContainer } from '@/lib/motion'

function SkillCard({ skill }: { skill: SkillItem }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [landed, setLanded] = useState(false)

  useEffect(() => {
    // If reduced motion is active, land immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLanded(true)
      return
    }

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
      { threshold: 0.2 }
    )
    bo.observe(el)
    return () => bo.disconnect()
  }, [])

  return (
    <motion.div ref={rootRef} variants={cardVariant} className="skill-card">
      <div className="skill-hdr">
        <div className="skill-name-row">
          <i className={`${skill.icon} skill-icon`} />
          <span className="skill-name">{skill.name}</span>
        </div>
        <span
          className="skill-pct"
          style={{
            fontSize: '0.7rem',
            color: skill.tier === 'Production' ? 'var(--jade)' : 'var(--gold)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {skill.tier}
        </span>
      </div>

      <div className="balls-row">
        {Array.from({ length: skill.total }).map((_, i) => (
          <div
            key={i}
            className={`ball${i >= skill.filled ? ' empty' : ''}${landed ? ' landed' : ''}`}
            style={{
              transitionDelay: landed ? `${i * 65 + 150}ms` : undefined,
              background:
                skill.tier === 'Production'
                  ? 'linear-gradient(135deg, var(--jade), #00b377)'
                  : 'linear-gradient(135deg, var(--gold), #e8a020)',
            }}
          />
        ))}
      </div>

      <div className="skill-tools-wrap">
        {skill.tools.map((tool) => (
          <span key={tool} className="skill-tool-pill">
            {tool}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="sl">03 — Expertise</div>
      <div className="st">
        Technical <span>Skills</span>
      </div>

      {skillCapabilities.map((group) => (
        <div key={group.tier} className="skill-tier-block">
          <motion.div
            className="skill-tier-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className={`skill-tier-badge ${
                group.tier !== 'Production Experience' ? 'working' : ''
              }`}
            >
              <i
                className={
                  group.tier === 'Production Experience'
                    ? 'fas fa-shield-alt'
                    : 'fas fa-tools'
                }
              />{' '}
              {group.tier}
            </div>
            <p className="skill-tier-desc">{group.description}</p>
          </motion.div>

          <motion.div
            className="skills-grid"
            variants={staggerContainer(0.08, 0.04)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {group.skills.map((s) => (
              <SkillCard key={s.name} skill={s} />
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  )
}
