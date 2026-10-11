/**
 * React hooks for the portfolio.
 */

import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrolled
}

export function useMobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [open])

  // Prevent body scroll when menu is open on small screens.
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  return { open, setOpen, toggle: () => setOpen((prev) => !prev) }
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Smooth-scrolls to an anchor target when the hash changes, offsetting
 * the sticky navbar so the target is not hidden behind it.
 */
export function useAnchorScroll() {
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return
      const element = document.getElementById(hash)
      if (!element) return
      const navHeight = 64
      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        navHeight
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
    }

    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
}