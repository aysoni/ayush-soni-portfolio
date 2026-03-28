'use client'

import { projects } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

export function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="sl">04 — Work</div>
      <div className="st">
        Featured <span>Projects</span>
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          <Reveal key={p.num}>
            <div className="proj-card">
              <div className="proj-card-glow" />
              <div className="proj-icon">
                <i className="fas fa-layer-group" />
              </div>
              <div className="proj-title">{p.name}</div>
              <div className="proj-meta">
                {p.client} · Case study
              </div>
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-tech">
                {p.tech.map((t) => (
                  <span key={t} className="tc">
                    {t}
                  </span>
                ))}
              </div>
              <div className="proj-metrics">
                {p.metrics.map((m, j) => (
                  <div key={j} className="proj-metric">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
