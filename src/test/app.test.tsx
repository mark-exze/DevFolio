/**
 * App-level tests for the unified Projects & Research section: it must
 * render exactly once, the old separate sections must be gone, and
 * every in-page anchor (navbar, Hero CTAs, brand) must resolve to a
 * real section id.
 */

import { describe, it, expect, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '@/App'
import { personal } from '@/data/personal'

afterEach(cleanup)

describe('App section structure', () => {
  it('renders exactly one Projects & Research section', () => {
    render(<App />)
    const headings = screen.getAllByRole('heading', {
      level: 2,
      name: /projects & research/i,
    })
    expect(headings).toHaveLength(1)
    expect(document.querySelectorAll('#projects-research')).toHaveLength(1)
  })

  it('no longer renders separate Projects or Research sections', () => {
    render(<App />)
    expect(document.querySelectorAll('#projects')).toHaveLength(0)
    expect(document.querySelectorAll('#research')).toHaveLength(0)
    expect(
      document.querySelectorAll('section[aria-labelledby="projects-heading"]'),
    ).toHaveLength(0)
    expect(
      document.querySelectorAll('section[aria-labelledby="research-heading"]'),
    ).toHaveLength(0)
  })

  it('exposes the unified anchor in the navigation data', () => {
    const hrefs = personal.nav.map((item) => item.href)
    expect(hrefs).toContain('#projects-research')
    expect(hrefs).not.toContain('#projects')
    expect(hrefs).not.toContain('#research')
    expect(
      personal.nav.find((item) => item.href === '#projects-research')?.label,
    ).toBe('Projects & Research')
  })

  it('renders a navbar link to the unified section', () => {
    render(<App />)
    const links = screen.getAllByRole('link', { name: 'Projects & Research' })
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link).toHaveAttribute('href', '#projects-research')
    }
  })

  it('renders exactly three unique works from the real data', () => {
    render(<App />)
    expect(document.querySelectorAll('#projects-research article')).toHaveLength(
      3,
    )
    // VeriFaceX exists in both data files but must render once.
    expect(
      screen.getAllByRole('heading', { level: 3, name: 'VeriFaceX' }),
    ).toHaveLength(1)
  })

  it('gives dual-category works both badges in the real data', () => {
    render(<App />)
    const verifacex = screen
      .getByRole('heading', { level: 3, name: 'VeriFaceX' })
      .closest('article') as HTMLElement
    expect(within(verifacex).getByText('Project')).toBeInTheDocument()
    expect(within(verifacex).getByText('Research')).toBeInTheDocument()

    const devfolio = screen
      .getByRole('heading', { level: 3, name: 'DevFolio' })
      .closest('article') as HTMLElement
    expect(within(devfolio).getByText('Project')).toBeInTheDocument()
    expect(within(devfolio).queryByText('Research')).not.toBeInTheDocument()
  })

  it('shows dynamic filter counts for unique works', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /^all/i })).toHaveTextContent('3')
    expect(
      screen.getByRole('button', { name: /^projects/i }),
    ).toHaveTextContent('3')
    expect(
      screen.getByRole('button', { name: /^research/i }),
    ).toHaveTextContent('2')
  })

  it('shows the dual-category work under the Research filter', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /^research/i }))
    expect(
      document.querySelectorAll('#projects-research article'),
    ).toHaveLength(2)
    expect(
      screen.getByRole('heading', { level: 3, name: 'VeriFaceX' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { level: 3, name: 'DevFolio' }),
    ).not.toBeInTheDocument()
  })

  it('resolves every in-page anchor to an existing element', () => {
    render(<App />)
    const anchors = Array.from(
      document.querySelectorAll('a[href^="#"]'),
    ) as HTMLAnchorElement[]
    expect(anchors.length).toBeGreaterThan(0)
    for (const anchor of anchors) {
      const id = anchor.getAttribute('href')!.slice(1)
      expect(
        document.getElementById(id),
        `broken anchor: #${id}`,
      ).not.toBeNull()
    }
  })

  it('points the Hero CTAs at the unified section', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute(
      'href',
      '#projects-research',
    )
    expect(screen.getByRole('link', { name: /explore verifacex/i })).toHaveAttribute(
      'href',
      '#projects-research',
    )
  })
})
