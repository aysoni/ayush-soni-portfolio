'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience, certifications } from '@/lib/data'
import { cardVariant, fadeInUp, staggerContainer } from '@/lib/motion'

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 45%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <section className="experience" id="experience">
      <div className="sl">02 — Career</div>
      <div className="st">
        Work <span>Experience</span>
      </div>

      <div ref={timelineRef} className="timeline">
        {/* Static track */}
        <div className="timeline-track" aria-hidden />

        {/* Scroll-linked dynamic beam */}
        <motion.div
          className="timeline-beam"
          aria-hidden
          style={{
            scaleY,
            height: '100%',
          }}
        />

        <motion.div
          variants={staggerContainer(0.18, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {experience.map((exp) => (
            <motion.div
              key={exp.role + exp.period}
              className="exp-item"
              variants={cardVariant}
            >
              <div className="exp-dot" />
              <div className="exp-meta">
                <span className="exp-company">{exp.company}</span>
                <span className="exp-period">{exp.period}</span>
              </div>
              <div className="exp-role">{exp.role}</div>
              <ul className="exp-bullets">
                {exp.bullets.map((b, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: b }} />
                ))}
              </ul>

              {exp.projects && exp.projects.length > 0 && (
                <div className="exp-projects">
                  {exp.projects.map((proj) => (
                    <div key={proj.name} className="exp-project">
                      <div className="exp-project-header">
                        <span className="exp-project-client">{proj.client}</span>
                        <span className="exp-project-name">{proj.name}</span>
                      </div>
                      <p className="exp-project-desc">{proj.desc}</p>
                      <div className="exp-project-tech">
                        {proj.tech.map((t) => (
                          <span key={t} className="exp-project-tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <ul className="exp-project-metrics">
                        {proj.metrics.map((m, k) => (
                          <li key={k}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="sl" style={{ marginTop: 64 }}>
        Certifications
      </div>
      <motion.div
        className="cert-grid"
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {certifications.map((c) => (
          <motion.div key={c.name} className="cert-card" variants={fadeInUp}>
            <div className="cert-icon">
              <i className={c.iconClass} />
            </div>
            <div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-org">{c.issuer}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}