'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personal, typedPhrases, heroStats } from '@/lib/data'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  // Accessibility: immediately show the first phrase
  if (prefersReducedMotion) {
    setDisplayedText(typedPhrases[0])
    return
  }

  const currentPhrase = typedPhrases[phraseIndex]

  // Timing
  const typingSpeed = 110
  const deletingSpeed = 75
  const pauseAfterTyping = 2200
  const pauseAfterDeleting = 500

  // ── Phrase completely typed ──
  if (!isDeleting && displayedText === currentPhrase) {
    const timer = setTimeout(() => {
      setIsDeleting(true)
    }, pauseAfterTyping)

    return () => clearTimeout(timer)
  }

  // ── Phrase completely deleted ──
  if (isDeleting && displayedText === '') {
    const timer = setTimeout(() => {
      setIsDeleting(false)
      setPhraseIndex(
        (prev) => (prev + 1) % typedPhrases.length
      )
    }, pauseAfterDeleting)

    return () => clearTimeout(timer)
  }

  // ── Type / delete one character ──
  const timer = setTimeout(() => {
    if (isDeleting) {
      setDisplayedText(
        currentPhrase.slice(
          0,
          displayedText.length - 1
        )
      )
    } else {
      setDisplayedText(
        currentPhrase.slice(
          0,
          displayedText.length + 1
        )
      )
    }
  }, isDeleting ? deletingSpeed : typingSpeed)

  return () => clearTimeout(timer)
}, [displayedText, isDeleting, phraseIndex])

  const downloadCv = async () => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const filename = `${personal.resumeFileBase}_${y}-${m}-${day}.pdf`

    try {
      const res = await fetch(personal.resumePublicPath)

      if (!res.ok) {
        throw new Error('Resume not found')
      }

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
      window.open(
        `mailto:${personal.email}?subject=Resume%20Request`,
        '_blank'
      )
    }
  }

  const [firstName, ...restName] = personal.name.split(' ')

  return (
    <section className="hero" id="hero">
      <motion.div
        className="hero-content"
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Eyebrow */}
        <motion.div
          variants={fadeInUp}
          className="hero-eyebrow"
        >
          Open to new opportunities
        </motion.div>

        {/* 2. Name */}
        <motion.h1
          variants={fadeInUp}
          className="hero-name"
        >
          {firstName}
          <br />
          {restName.join(' ')}
        </motion.h1>

        {/* 3. Role / Typewriter */}
        <motion.div
          variants={fadeInUp}
          className="hero-role-wrap"
        >
          <span className="role-label">
            I AM A
          </span>

          <span
            className="role-text"
            id="typed-text"
          >
            {displayedText}
            <span
              className="typed-cursor"
              aria-hidden="true"
            >
              |
            </span>
          </span>
        </motion.div>

        {/* 4. Location & Contact Details */}
        <motion.div
          variants={fadeInUp}
          className="hero-location"
        >
          <span>
            <i className="fas fa-map-marker-alt" />
            {personal.location}
          </span>

          <span className="hero-loc-sep">
            |
          </span>

          <span>
            <i className="fas fa-phone" />
            {personal.phone}
          </span>

          <span className="hero-loc-sep">
            |
          </span>

          <span>
            <i className="fas fa-envelope" />
            {personal.email}
          </span>
        </motion.div>

        {/* 5. Description & Actions */}
        <motion.p
          variants={fadeInUp}
          className="hero-desc"
          dangerouslySetInnerHTML={{
            __html: `<strong>${personal.role}</strong> — ${personal.tagline}`,
          }}
        />

        <motion.div
          variants={fadeInUp}
          className="hero-actions"
        >
          <button
            type="button"
            className="btn-g"
            id="dl-cv"
            onClick={downloadCv}
          >
            <i className="fas fa-download" />
            Download CV
          </button>

          <Link
            href="#projects"
            className="btn-o"
          >
            <i className="fas fa-code-branch" />
            View Projects
          </Link>
        </motion.div>

        {/* 6. Stats Grid */}
        <motion.div
          variants={fadeInUp}
          className="hero-stats"
        >
          {heroStats.map((s) => (
            <div
              key={s.label}
              className="stat"
            >
              <div className="stat-num">
                {s.value}
              </div>

              <div className="stat-label">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}