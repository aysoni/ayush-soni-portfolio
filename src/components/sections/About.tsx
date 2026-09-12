'use client'

import { motion } from 'framer-motion'
import {
  personal,
  aboutParagraphs,
  aboutTags,
  education,
} from '@/lib/data'
import {
  cardVariant,
  fadeInUp,
  staggerContainer,
} from '@/lib/motion'

/* ── Static developer illustration ── */
function DevAvatar() {
  return (
    <div className="about-avatar-art">
      <img
        src="/developer-coding.png"
        alt="Developer coding at his computer"
        className="dev-image dev-image-dark"
      />

      <img
        src="/developer-coding-light.png"
        alt="Developer coding at his computer"
        className="dev-image dev-image-light"
      />
    </div>
  )
}

export function About() {
  return (
    <section className="about" id="about">
      <div className="sl">01 — About</div>

      <div className="st">
        Who I <span>Am</span>
      </div>

      <motion.div
        className="about-grid"
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* ── Left profile card ── */}
        <motion.div variants={cardVariant}>
          <div className="about-card">

            {/* Developer image */}
            <div className="about-avatar">
              <DevAvatar />
            </div>

            {/* Personal information */}
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
        </motion.div>

        {/* ── Right about text ── */}
        <motion.div
          className="about-text"
          variants={fadeInUp}
        >
          {aboutParagraphs.map((p, i) => (
            <p
              key={i}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}

          <div className="about-tags">
            {aboutTags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}