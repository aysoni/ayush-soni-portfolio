'use client'

import { motion } from 'framer-motion'

interface Props { children: string }

export function SectionLabel({ children }: Props) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: 'var(--mono)', fontSize: '0.72rem',
        color: 'var(--accent)', letterSpacing: '0.14em',
        textTransform: 'uppercase', marginBottom: '0.75rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}
    >
      {children}
      <span style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: 60, display: 'block' }} />
    </motion.p>
  )
}
