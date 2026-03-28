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

  const closeMob = () => setOpen(false)

  return (
    <>
      <div className={`mob-menu${open ? ' open' : ''}`} id="mobMenu" aria-hidden={!open}>
        <button type="button" className="mob-close" id="mobClose" onClick={closeMob} aria-label="Close menu">
          <i className="fas fa-times" />
        </button>
        {mainLinks.map((l) => (
          <Link key={l.href} href={l.href} onClick={closeMob}>
            {l.label}
          </Link>
        ))}
        <Link href="/#contact" onClick={closeMob}>
          Contact
        </Link>
      </div>

      <nav id="navbar">
        <Link href="/" className="nav-logo">
          <span className="king-crown" aria-hidden>
            &lt;/&gt;
          </span>
          &nbsp;{personal.navLogo}
          <span style={{ color: 'var(--muted)' }}>.dev</span>
        </Link>
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
        <div className="nav-end">
          <ThemeToggle />
          <button
            type="button"
            className="hamburger"
            id="hamburger"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
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
