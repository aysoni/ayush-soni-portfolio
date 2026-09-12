'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { personal } from '@/lib/data'
import { fadeInUp } from '@/lib/motion'

export function Contact() {
  return (
    <section className="contact-section" id="contact">
      <motion.div
        className="contact-inner"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="sl" style={{ textAlign: 'center' }}>
          05 — Contact
        </div>
        <div className="st" style={{ textAlign: 'center' }}>
          Let&apos;s <span>Connect</span>
        </div>
        <p>
          I&apos;m open to backend engineering and microservices roles. Whether you have a project, a role to
          discuss, or just want to say hello — my inbox is always open.
        </p>
        <button
          type="button"
          className="btn-g contact-email-btn"
          onClick={() => {
            window.location.href = `mailto:${personal.email}`
          }}
        >
          <i className="fas fa-envelope" /> {personal.email}
        </button>
        <div className="contact-links">
          <Link href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="cl">
            <i className="fab fa-linkedin" /> LinkedIn
          </Link>
          <Link href={personal.github} target="_blank" rel="noopener noreferrer" className="cl">
            <i className="fab fa-github" /> GitHub
          </Link>
          <a href={`tel:${personal.phone.replace(/\s/g, '')}`} className="cl">
            <i className="fas fa-phone" />
            {personal.phone}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
