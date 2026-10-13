/**
 * Navbar — sticky top navigation with accessible mobile menu.
 *
 * Branding uses the DevFolio D logo followed by a horizontal wordmark:
 * "Dev" in white and "Folio" in cyan.
 *
 * The mobile menu is a disclosure: the toggle button carries
 * aria-expanded/aria-controls, and the panel closes on Escape, outside
 * pointerdown, link activation, or when the viewport widens to the
 * desktop layout. It deliberately does NOT close on scroll — a previous
 * bug closed the menu the instant it opened whenever the page was
 * scrolled, because the initial focus() scrolled the first link into
 * view and the resulting scroll event dismissed the panel.
 */

import { useEffect, useRef, useState } from 'react'
import { personal } from '@/data/personal'
import { cn } from '@/utils'
import { Menu, X, ChevronDown } from 'lucide-react'

/** Tailwind `md` breakpoint — the width at which the toggle is hidden. */
const DESKTOP_QUERY = '(min-width: 768px)'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Translucent backdrop once the user scrolls away from the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Move focus to the first menu item when opening. preventScroll keeps
  // the browser from scrolling the link into view, which previously
  // dismissed the menu via the (now removed) scroll-to-close handler.
  useEffect(() => {
    if (!open) return
    const first = menuRef.current?.querySelector<HTMLElement>('a[href]')
    first?.focus({ preventScroll: true })
  }, [open])

  // Lock background scrolling while the menu is open.
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  // Close on Escape (returning focus to the toggle) and keep Tab focus
  // inside the open menu.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = menuRef.current?.querySelectorAll<HTMLElement>('a[href]')
      if (!items || items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Close when the viewport widens to the desktop layout, where the
  // toggle is hidden. A media query listener is used instead of a
  // generic resize listener because mobile browsers fire viewport
  // resizes while scrolling (URL bar collapse), which must not dismiss
  // the menu.
  useEffect(() => {
    if (!open) return
    const media = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [open])

  // Close on a pointer press outside the header.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (!target) return
      if (menuRef.current?.contains(target)) return
      if (buttonRef.current?.contains(target)) return
      if (target instanceof Element && target.closest('header')) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
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
        <a href="#hero" className="flex items-center gap-2.5">
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
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-navy-700/60 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-navy-700/60 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 md:hidden"
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </nav>

      {/* Mobile menu panel. When collapsed it is also invisible, which
          removes its links from the tab order while preserving the
          max-height transition. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          'overflow-hidden transition-all duration-200 md:hidden',
          open
            ? 'visible max-h-[80vh] border-b border-navy-700/80 bg-navy-900/95'
            : 'invisible max-h-0',
        )}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {personal.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 transition-colors hover:bg-navy-700/60 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
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
              className="text-sm text-sky-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              {personal.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
