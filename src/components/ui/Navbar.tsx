'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { personal } from '@/lib/data'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const mainLinks = [
  { href: '/#hero', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const toggleMenu = () => setOpen(!open)
  const closeMenu = () => setOpen(false)

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mob-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        {mainLinks.map((l) => (
          <Link key={l.href} href={l.href} onClick={closeMenu}>
            {l.label}
          </Link>
        ))}

        <Link href="/#contact" onClick={closeMenu}>
          Contact
        </Link>
      </div>

      {/* Navbar */}
      <nav id="navbar">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <span className="king-crown" aria-hidden>
            &lt;/&gt;
          </span>
          &nbsp;{personal.navLogo}
          <span style={{ color: 'var(--muted)' }}>.dev</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {mainLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className="nav-cta">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="nav-end">
          <ThemeToggle />

          {/* Hamburger */}
          <button
            type="button"
            className={`hamburger ${open ? 'active' : ''}`}
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </>
  )
}