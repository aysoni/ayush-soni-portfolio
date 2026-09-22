'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { personal } from '@/lib/data'
import { cardVariant, staggerContainer } from '@/lib/motion'

const HELP_TOPICS = [
  'Backend & Microservices',
  'System Architecture',
  'Full-Time Role / Hiring',
  'API Design & Integration',
  'Consulting & Advisory',
  'Say Hello 👋',
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [selectedTopic, setSelectedTopic] = useState(HELP_TOPICS[0])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const finalSubject = formData.subject.trim()
      ? `[Portfolio] ${formData.subject.trim()} - from ${formData.name}`
      : `[Portfolio Inquiry] ${selectedTopic} - from ${formData.name}`

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          need_help_with: selectedTopic,
          subject: formData.subject.trim() || selectedTopic,
          message: formData.message,
          _subject: finalSubject,
          _captcha: 'false',
          _template: 'table',
        }),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data && (data.success === 'true' || data.success === true)) {
        setStatus('success')
      } else {
        throw new Error(data?.message || 'Could not deliver message automatically.')
      }
    } catch (err: unknown) {
      console.error('Contact form error:', err)
      setStatus('error')
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : 'Unable to deliver message right now. Please try again or reach out directly.'
      )
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrorMessage('')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  return (
    <section className="contact-section" id="contact">
      <div className="sl">05 — Contact</div>
      <div className="st">
        Let&apos;s <span>Connect</span>
      </div>

      <motion.div
        className="contact-grid"
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Left Column: Direct Info & Availability Card */}
        <motion.div className="contact-info-card" variants={cardVariant}>
          <div>
            <p className="contact-desc">
              I&apos;m open to backend engineering roles, microservices architecture, and technical
              collaborations. Whether you have an open position, an engineering project in mind, or just want to
              say hello — my inbox is always open.
            </p>

            {/* Status badge */}
            <div className="contact-status-card" style={{ marginTop: '14px' }}>
              <span className="status-indicator">
                <span className="status-dot" />
                <span className="status-pulse" />
              </span>
              <div>
                <div className="status-title">Available for opportunities</div>
                <div className="status-sub">Backend Engineering • Distributed Systems</div>
              </div>
            </div>
          </div>

          {/* Direct channels */}
          <div className="contact-direct-items">
            <a
              href={`mailto:${personal.email}`}
              className="contact-direct-card"
              title="Click to email directly"
            >
              <div className="cdc-icon">
                <i className="fas fa-envelope" />
              </div>
              <div className="cdc-text">
                <span className="cdc-label">Direct Email</span>
                <span className="cdc-val">{personal.email}</span>
              </div>
            </a>

            <a
              href={`tel:${personal.phone.replace(/\s/g, '')}`}
              className="contact-direct-card"
              title="Click to call"
            >
              <div className="cdc-icon">
                <i className="fas fa-phone" />
              </div>
              <div className="cdc-text">
                <span className="cdc-label">Phone</span>
                <span className="cdc-val">{personal.phone}</span>
              </div>
            </a>

            <div className="contact-direct-card">
              <div className="cdc-icon">
                <i className="fas fa-map-marker-alt" />
              </div>
              <div className="cdc-text">
                <span className="cdc-label">Location</span>
                <span className="cdc-val">{personal.location}</span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="contact-social-row">
            <Link
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="cl"
            >
              <i className="fab fa-linkedin" /> LinkedIn
            </Link>
            <Link
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cl"
            >
              <i className="fab fa-github" /> GitHub
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Contact Form Card */}
        <motion.div className="contact-form-card" variants={cardVariant}>
          <div className="form-header">
            <div className="form-title">Send a Message</div>
            <div className="form-subtitle">
              Have a project or opportunity? Leave your details and what you need help with.
            </div>
          </div>

          {status === 'success' ? (
            <div className="form-success-alert">
              <div className="success-header">
                <i className="fas fa-check-circle" />
                <span>Message Sent Successfully!</span>
              </div>
              <p className="success-body">
                Thank you, <strong>{formData.name}</strong>! Your message regarding{' '}
                <strong>{formData.subject.trim() || selectedTopic}</strong> has been sent directly to{' '}
                <strong>{personal.email}</strong>. I will get back to you shortly.
              </p>
              <div className="success-actions">
                <button
                  type="button"
                  className="btn-copy-msg"
                  onClick={handleReset}
                >
                  <i className="fas fa-paper-plane" /> Send another message
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="form-error-alert">
                  <i className="fas fa-exclamation-circle" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="form-input"
                    autoComplete="name"
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Your Email <span>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className="form-input"
                    autoComplete="email"
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              {/* What they want help with */}
              <div className="form-group">
                <label className="form-label">
                  What do you need help with? <span>*</span>
                </label>
                <div className="help-topics-grid">
                  {HELP_TOPICS.map((topic) => (
                    <button
                      type="button"
                      key={topic}
                      disabled={status === 'loading'}
                      className={`help-topic-pill ${
                        selectedTopic === topic ? 'active' : ''
                      }`}
                      onClick={() => handleTopicSelect(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">
                  Subject (Optional)
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={`e.g. ${selectedTopic} inquiry`}
                  className="form-input"
                  disabled={status === 'loading'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message <span>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, team, timeline, or requirements..."
                  className="form-textarea"
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                className="btn-g contact-submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" /> Send Message
                  </>
                )}
              </button>

              <div className="form-note">
                <i className="fas fa-lock" /> Sends directly to {personal.email}
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
