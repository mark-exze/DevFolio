/**
 * Modal — lightweight accessible dialog used by the Projects and
 * Research sections.
 *
 * Implemented without external dependencies on top of a portal and
 * native focus semantics:
 * - role="dialog" + aria-modal + aria-labelledby pointing at the title
 * - Escape closes and returns focus to the element that opened it
 * - Tab / Shift+Tab cycle focus inside the panel
 * - a pointer press on the backdrop closes the dialog
 * - background scrolling is locked while open
 * - reveal animation runs only under motion-safe preferences
 */

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, title, subtitle, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const [mounted, setMounted] = useState(open)

  // Keep the panel mounted for the close transition.
  useEffect(() => {
    if (open) {
      setMounted(true)
      return
    }
    const timer = window.setTimeout(() => setMounted(false), 200)
    return () => window.clearTimeout(timer)
  }, [open])

  // Remember the trigger so focus can be restored on close.
  const triggerRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
      first?.focus()
    } else if (triggerRef.current) {
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [open])

  // Lock background scrolling while the dialog is open.
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  // Escape closes; Tab is trapped inside the panel.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
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
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <div
      className={cnDialog(open)}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        // During the close transition the panel stays mounted only to
        // animate out; visibility removes it from the accessibility
        // tree and the tab order in the meantime.
        style={{
          visibility: open ? 'visible' : 'hidden',
          pointerEvents: open ? 'auto' : 'none',
        }}
        className={cnPanel(open)}
      >
        <header className="flex items-start justify-between gap-4 border-b border-navy-700 px-5 py-4 sm:px-7 sm:py-5">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-lg font-semibold text-white sm:text-xl"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-navy-700/60 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function cnDialog(open: boolean) {
  return [
    'fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-950/80 p-4 backdrop-blur-sm sm:items-center',
    'transition-opacity duration-200 motion-reduce:transition-none',
    open ? 'opacity-100' : 'opacity-0',
  ].join(' ')
}

function cnPanel(open: boolean) {
  return [
    'my-auto w-full max-w-3xl rounded-2xl border border-navy-700 bg-navy-900 shadow-2xl shadow-black/50',
    'transition-all duration-200 motion-reduce:transition-none',
    open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
  ].join(' ')
}
