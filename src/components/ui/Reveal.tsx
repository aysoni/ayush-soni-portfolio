'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string }

export function Reveal({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            ro.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
