'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      68,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 34

    const N = 2600
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 140
      pos[i * 3 + 1] = (Math.random() - 0.5) * 140
      pos[i * 3 + 2] = (Math.random() - 0.5) * 90
      const t = Math.random()
      if (t < 0.45) {
        col[i * 3] = 0.96
        col[i * 3 + 1] = 0.77
        col[i * 3 + 2] = 0.09
      } else if (t < 0.7) {
        col[i * 3] = 0
        col[i * 3 + 1] = 0.9
        col[i * 3 + 2] = 0.63
      } else {
        col[i * 3] = 0.7
        col[i * 3 + 1] = 0.43
        col[i * 3 + 2] = 1
      }
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const pts = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 0.16,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
      })
    )
    scene.add(pts)

    function wire(
      g: THREE.BufferGeometry,
      x: number,
      y: number,
      z: number,
      c: number,
      op?: number
    ) {
      const e = new THREE.EdgesGeometry(g)
      const l = new THREE.LineSegments(
        e,
        new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: op ?? 0.1 })
      )
      l.position.set(x, y, z)
      scene.add(l)
      return l
    }

    const shapes = [
      wire(new THREE.IcosahedronGeometry(7, 0), -24, 10, -12, 0xf5c518, 0.08),
      wire(new THREE.OctahedronGeometry(5, 0), 22, -9, -6, 0x00e5a0, 0.1),
      wire(new THREE.TetrahedronGeometry(6, 0), 10, -18, -10, 0xf5c518, 0.09),
      wire(new THREE.OctahedronGeometry(3.5, 0), -18, -12, -14, 0x00e5a0, 0.1),
      wire(new THREE.IcosahedronGeometry(4, 0), 26, 14, -9, 0xb66dff, 0.09),
    ]

    let mx = 0
    let my = 0
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    document.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    const clk = new THREE.Clock()
    let rafId = 0
    function anim() {
      rafId = requestAnimationFrame(anim)
      const t = clk.getElapsedTime()
      pts.rotation.y = t * 0.016
      pts.rotation.x = t * 0.004
      camera.position.x += (mx * 3 - camera.position.x) * 0.028
      camera.position.y += (-my * 3 - camera.position.y) * 0.028
      shapes.forEach((s, i) => {
        s.rotation.x = t * (0.11 + i * 0.06)
        s.rotation.y = t * (0.08 + i * 0.04)
      })
      renderer.render(scene, camera)
    }
    anim()

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      pts.geometry.dispose()
      ;(pts.material as THREE.Material).dispose()
      shapes.forEach((s) => {
        s.geometry.dispose()
        ;(s.material as THREE.Material).dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      id="bg-canvas"
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
