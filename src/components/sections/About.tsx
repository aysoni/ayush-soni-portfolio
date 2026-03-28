'use client'

import { personal, aboutParagraphs, aboutTags, education } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

export function About() {
  const [first, ...rest] = personal.name.split(' ')
  return (
    <section className="about" id="about">
      <div className="sl">01 — About</div>
      <div className="st">
        Who I <span>Am</span>
      </div>
      <Reveal className="about-grid">
        <div>
          <div className="about-card">
            <div className="about-avatar">
              <span aria-hidden>&#129489;&#8205;&#128187;</span>
              <p>
                {first.toUpperCase()} {rest.join(' ').toUpperCase()}
              </p>
            </div>
            <div className="about-info">
              <div className="info-row">
                <i className="fas fa-map-marker-alt" />
                <span>{personal.location}</span>
              </div>
              <div className="info-row">
                <i className="fas fa-building" />
                <span>Virtusa</span>
              </div>
              <div className="info-row">
                <i className="fas fa-graduation-cap" />
                <span>
                  {education.degree} — CGPA {education.cgpa}
                </span>
              </div>
              <div className="info-row">
                <i className="fas fa-university" />
                <span>{education.university}</span>
              </div>
              <div className="info-row">
                <i className="fas fa-envelope" />
                <span>{personal.email}</span>
              </div>
              <div className="info-row">
                <i className="fas fa-phone" />
                <span>{personal.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="about-text">
          {aboutParagraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          <div className="about-tags">
            {aboutTags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
