'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { personal } from '@/lib/data'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const mainLinks = [
  { href: '/#hero', id: 'hero', label: 'Home' },
  { href: '/#about', id: 'about', label: 'About' },
  { href: '/#experience', id: 'experience', label: 'Experience' },
  { href: '/#skills', id: 'skills', label: 'Skills' },
  { href: '/#projects', id: 'projects', label: 'Projects' },
  { href: '/blog/', id: 'blog', label: 'Blog' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (pathname?.startsWith('/blog')) {
      setActiveSection('blog')
      return
    }

    const sectionIds = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']
    const observers: IntersectionObserver[] = []

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  const toggleMenu = () => setOpen(!open)
  const closeMenu = () => setOpen(false)

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mob-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        {mainLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={activeSection === l.id ? 'active' : ''}
            onClick={closeMenu}
          >
            {l.label}
          </Link>
        ))}

        <Link
          href="/#contact"
          className={activeSection === 'contact' ? 'active' : ''}
          onClick={closeMenu}
        >
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
              <Link
                href={l.href}
                className={activeSection === l.id ? 'active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className={`nav-cta ${activeSection === 'contact' ? 'active' : ''}`}
            >
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