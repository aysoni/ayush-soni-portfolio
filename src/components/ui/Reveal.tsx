'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeInUp } from '@/lib/motion'

type Props = { children: ReactNode; className?: string }

export function Reveal({ children, className = '' }: Props) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
