/**
 * Modal tests — dialog semantics, Escape, focus trap, focus
 * restoration, backdrop dismiss, and background scroll locking.
 */

import { useState } from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Modal } from '@/components/Modal'

afterEach(cleanup)

function renderModal(onClose = vi.fn()) {
  render(
    <Modal open onClose={onClose} title="Test dialog" subtitle="Subtitle">
      <a href="/one">First link</a>
      <a href="/two">Second link</a>
    </Modal>,
  )
  return onClose
}

describe('Modal', () => {
  it('renders dialog semantics with an accessible title', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(
      screen.getByRole('heading', { level: 2, name: 'Test dialog' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = renderModal()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the backdrop is pressed', () => {
    const onClose = renderModal()
    const dialog = screen.getByRole('dialog')
    fireEvent.mouseDown(dialog.parentElement as HTMLElement)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when the panel itself is pressed', () => {
    const onClose = renderModal()
    fireEvent.mouseDown(screen.getByRole('dialog'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('moves focus into the dialog when opened', () => {
    renderModal()
    expect(screen.getByRole('button', { name: /close dialog/i })).toHaveFocus()
  })

  it('traps Tab focus inside the dialog', () => {
    renderModal()
    const links = screen.getAllByRole('link')
    const closeButton = screen.getByRole('button', { name: /close dialog/i })

    links[links.length - 1].focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(closeButton).toHaveFocus()

    closeButton.focus()
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(links[links.length - 1]).toHaveFocus()
  })

  it('restores focus to the trigger when closed', () => {
    function Harness() {
      const [open, setOpen] = useState(true)
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Trigger
          </button>
          <Modal open={open} onClose={() => setOpen(false)} title="Dialog">
            <a href="/x">Inside</a>
          </Modal>
        </>
      )
    }
    // Imported lazily to keep the harness local to this test.
    render(<Harness />)
    const trigger = screen.getByRole('button', { name: 'Trigger' })
    trigger.focus()

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger).toHaveFocus()
  })

  it('locks background scroll while open', () => {
    renderModal()
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('renders nothing when closed', () => {
    render(
      <Modal open={false} onClose={vi.fn()} title="Hidden">
        content
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
