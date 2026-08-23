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