/**
 * Navbar — sticky top navigation with accessible mobile menu.
 *
 * Branding uses the DevFolio D logo followed by a horizontal wordmark:
 * "Dev" in white and "Folio" in cyan.
 */

import { useEffect, useRef, useState } from 'react'
import { personal } from '@/data/personal'
import { cn } from '@/utils'
import { Menu, X, ChevronDown } from 'lucide-react'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on scroll or resize.
  useEffect(() => {
    if (!open) return
    const onClose = () => setOpen(false)
    window.addEventListener('scroll', onClose, { passive: true })
    window.addEventListener('resize', onClose)
    return () => {
      window.removeEventListener('scroll', onClose)
      window.removeEventListener('resize', onClose)
    }
  }, [open])

  // Focus trap: keep focus inside the open menu.
  useEffect(() => {
    if (!open) return
    const node = firstItemRef.current
    node?.focus()
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b backdrop-blur transition-colors duration-200',
        scrolled
          ? 'border-navy-700/80 bg-navy-900/80'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Primary"
      >
        {/* Brand — DevFolio logo + wordmark */}
        <a
          href="#hero"
          className="flex items-center gap-2.5"
        >
          <img
            src="/images/logo.png"
            alt="DevFolio logo"
            className="h-9 w-9 shrink-0"
          />
          <span className="text-lg font-semibold leading-none tracking-tight">
            <span className="text-white">Dev</span>
            <span className="text-sky-400">Folio</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {personal.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-navy-700/60 hover:text-sky-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          ref={buttonRef}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-navy-700/60 hover:text-sky-400 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'overflow-hidden transition-all duration-200 md:hidden',
          open ? 'max-h-[80vh] border-b border-navy-700/80 bg-navy-900/95' : 'max-h-0',
        )}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {personal.nav.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstItemRef : undefined}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 transition-colors hover:bg-navy-700/60 hover:text-sky-400"
            >
              {item.label}
            </a>
          ))}

          <div className="mt-3 flex items-center gap-3 border-t border-navy-700/60 pt-3">
            <ChevronDown
              className="h-4 w-4 -rotate-90 text-sky-400"
              aria-hidden
            />
            <span className="text-xs uppercase tracking-wide text-gray-400">
              Contact
            </span>
            <a
              href={`mailto:${personal.email}`}
              className="text-sm text-sky-400 hover:underline"
            >
              {personal.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}