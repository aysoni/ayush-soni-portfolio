'use client'

import { experience, certifications } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

export function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="sl">02 — Career</div>
      <div className="st">
        Work <span>Experience</span>
      </div>
      <Reveal>
        <div className="timeline">
          {experience.map((exp) => (
            <div key={exp.role + exp.period} className="exp-item">
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
            </div>
          ))}
        </div>
      </Reveal>

      <div className="sl" style={{ marginTop: 64 }}>
        Certifications
      </div>
      <Reveal>
        <div className="cert-grid">
          {certifications.map((c) => (
            <div key={c.name} className="cert-card">
              <div className="cert-icon">
                <i className={c.iconClass} />
              </div>
              <div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-org">{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
