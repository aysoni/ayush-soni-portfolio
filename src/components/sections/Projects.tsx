'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { projects } from '@/lib/data'
import { ProjectDiagram } from '@/components/ui/ProjectDiagram'
import { cardVariant, staggerContainer } from '@/lib/motion'

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Subtle 3D tilt for fine-pointer devices
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="proj-card"
    >
      <div className="proj-card-glow" aria-hidden />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="proj-icon">
          <i className={project.iconClass} />
        </div>
        <div className="proj-meta">
          {project.client} · Case Study
        </div>
      </div>

      <div className="proj-title">{project.name}</div>

      <div className="proj-desc">{project.desc}</div>

      {/* Mini Architecture / Flow Diagram */}
      <ProjectDiagram type={project.diagramType} />

      {/* Tech Stack Pills */}
      <div className="proj-tech">
        {project.tech.map((t) => (
          <span key={t} className="tc">
            {t}
          </span>
        ))}
      </div>

      {/* Metrics / Evidence */}
      <div className="proj-metrics">
        {project.metrics.map((m, j) => (
          <div key={j} className="proj-metric">
            {m}
          </div>
        ))}
      </div>

      {/* Proof-of-Work Action Buttons */}
      <div className="proj-actions">
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-btn proj-btn-primary"
        >
          <i className="fab fa-github" /> GitHub Repo
        </a>
        <a href={project.links.caseStudy} className="proj-btn proj-btn-outline">
          <i className="fas fa-layer-group" /> Architecture Spec
        </a>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="sl">04 — Work</div>
      <div className="st">
        Featured <span>Projects</span>
      </div>

      <motion.div
        className="projects-grid"
        variants={staggerContainer(0.15, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.num} project={p} />
        ))}
      </motion.div>
    </section>
  )
}
