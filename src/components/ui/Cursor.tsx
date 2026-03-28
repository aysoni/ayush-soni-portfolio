'use client'

import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rx = useRef(0)
  const ry = useRef(0)
  const mx = useRef(0)
  const my = useRef(0)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', move)

    let raf = 0
    const ar = () => {
      rx.current += (mx.current - rx.current) * 0.1
      ry.current += (my.current - ry.current) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = `${rx.current}px`
        ringRef.current.style.top = `${ry.current}px`
      }
      raf = requestAnimationFrame(ar)
    }
    ar()

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cur" id="cur" />
      <div ref={ringRef} className="cur-ring" id="curRing" />
    </>
  )
}
