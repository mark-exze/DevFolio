/**
 * Navbar tests — mobile menu behaviour and the scroll regression.
 *
 * Regression: the menu used to close the instant it opened whenever the
 * page was scrolled, because focusing the first link scrolled it into
 * view and the resulting scroll event dismissed the panel via a
 * close-on-scroll listener. These tests assert the menu survives scroll
 * events and supports the full keyboard/ARIA contract.
 */

import { describe, it, expect, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, within, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '@/components/Navbar'
import { personal } from '@/data/personal'

afterEach(cleanup)

function getMenu() {
  return document.getElementById('mobile-menu') as HTMLElement
}

describe('Navbar mobile menu', () => {
  it('toggles open and closed with correct ARIA wiring', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-menu')
    expect(getMenu()).toBeInTheDocument()

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('stays open while the page scrolls (regression: scroll no longer closes it)', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    // Scroll events (including the browser's focus-induced scroll that
    // previously dismissed the menu) must not close an open menu.
    fireEvent.scroll(window, { target: { scrollY: 1200 } })
    fireEvent.scroll(window, { target: { scrollY: 2400 } })
    fireEvent.scroll(window, { target: { scrollY: 0 } })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    // Active window resize events must not close it either — mobile
    // browsers fire viewport changes while scrolling.
    fireEvent.resize(window)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('opens correctly after the page has already been scrolled', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })

    // Simulate arriving deep in the page before opening the menu.
    fireEvent.scroll(window, { target: { scrollY: 1800 } })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes on Escape and restores focus to the toggle', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })

    await user.click(toggle)
    const firstLink = within(getMenu()).getAllByRole('link')[0]
    expect(firstLink).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('closes after choosing a navigation link', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })

    await user.click(toggle)
    const menu = getMenu()
    const target = personal.nav[0]
    await user.click(within(menu).getByRole('link', { name: target.label }))

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes on a pointer press outside the menu', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })

    await user.click(toggle)
    fireEvent.pointerDown(document.body)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps Tab focus inside the open menu', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })

    await user.click(toggle)
    const links = within(getMenu()).getAllByRole('link')
    const last = links[links.length - 1]
    last.focus()

    fireEvent.keyDown(document, { key: 'Tab' })
    expect(links[0]).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(last).toHaveFocus()
  })

  it('locks background scrolling while open and restores it after', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i })

    expect(document.body.style.overflow).toBe('')
    await user.click(toggle)
    expect(document.body.style.overflow).toBe('hidden')
    await user.click(toggle)
    expect(document.body.style.overflow).toBe('')
  })

  it('renders every navigation link with its configured href', () => {
    render(<Navbar />)
    for (const item of personal.nav) {
      const matches = screen.getAllByRole('link', { name: item.label })
      expect(matches.length).toBeGreaterThan(0)
      for (const match of matches) {
        expect(match).toHaveAttribute('href', item.href)
      }
    }
  })

  it('hides menu links from the tab order while collapsed', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    expect(getMenu().className).toContain('invisible')
    await user.click(
      screen.getByRole('button', { name: /toggle navigation menu/i }),
    )
    expect(getMenu().className).toContain('visible')
  })
})
