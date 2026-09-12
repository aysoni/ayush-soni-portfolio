'use client'

import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rx = useRef(0)
  const ry = useRef(0)
  const mx = useRef(0)
  const my = useRef(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const checkEligibility = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isCoarse = window.matchMedia('(pointer: coarse)').matches
      const isFine = window.matchMedia('(pointer: fine)').matches
      const isDesktop = window.innerWidth > 900
      return !prefersReduced && isFine && !isCoarse && isDesktop
    }

    const updateEligibility = () => {
      setEnabled(checkEligibility())
    }

    updateEligibility()

    window.addEventListener('resize', updateEligibility)
    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqlPointer = window.matchMedia('(pointer: coarse)')

    mqlReduced.addEventListener?.('change', updateEligibility)
    mqlPointer.addEventListener?.('change', updateEligibility)

    return () => {
      window.removeEventListener('resize', updateEligibility)
      mqlReduced.removeEventListener?.('change', updateEligibility)
      mqlPointer.removeEventListener?.('change', updateEligibility)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor')
      return
    }

    document.body.classList.add('has-custom-cursor')

    const move = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', move, { passive: true })

    let raf = 0
    const ar = () => {
      rx.current += (mx.current - rx.current) * 0.15
      ry.current += (my.current - ry.current) * 0.15
      if (ringRef.current) {
        ringRef.current.style.left = `${rx.current}px`
        ringRef.current.style.top = `${ry.current}px`
      }
      raf = requestAnimationFrame(ar)
    }
    raf = requestAnimationFrame(ar)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cur" id="cur" aria-hidden />
      <div ref={ringRef} className="cur-ring" id="curRing" aria-hidden />
    </>
  )
}
