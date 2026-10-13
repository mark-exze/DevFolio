/**
 * Tests for the About section with the real personal data: expanded
 * biography disclosure, interactive portrait photo, developer code
 * card, and preservation of the existing content.
 */

import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { About } from '@/components/About'
import { personal } from '@/data/personal'

const DEFAULT_ALT =
  'Portrait of Mark Roland Delicano, BSIT student at Visayas State University Alangalang'
const ALT_ALT = 'Alternate portrait of Mark Roland Delicano'

describe('About biography disclosure', () => {
  it('shows only the introductory paragraphs until expanded', () => {
    render(<About />)
    expect(screen.getByText(personal.bio[0])).toBeInTheDocument()
    expect(screen.getByText(personal.bio[1])).toBeInTheDocument()
    expect(
      screen.queryByText(personal.bioExtended[0]),
    ).not.toBeInTheDocument()
  })

  it('expands to include the extended biography and back', async () => {
    const user = userEvent.setup()
    render(<About />)

    const readMore = screen.getByRole('button', { name: /read more/i })
    expect(readMore).toHaveAttribute('aria-expanded', 'false')
    expect(readMore).toHaveAttribute('aria-controls', 'about-bio')

    await user.click(readMore)
    for (const paragraph of personal.bioExtended) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
    // Introductory paragraphs remain visible (no duplication of the
    // extended text and no removal of the intro).
    expect(screen.getByText(personal.bio[0])).toBeInTheDocument()
    expect(screen.getByText(personal.bio[1])).toBeInTheDocument()

    const showLess = screen.getByRole('button', { name: /show less/i })
    expect(showLess).toHaveAttribute('aria-expanded', 'true')

    await user.click(showLess)
    expect(
      screen.queryByText(personal.bioExtended[0]),
    ).not.toBeInTheDocument()
  })

  it('toggles with keyboard activation', async () => {
    const user = userEvent.setup()
    render(<About />)

    const button = screen.getByRole('button', { name: /read more/i })
    button.focus()
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByText(personal.bioExtended[0])).toBeInTheDocument()

    await user.keyboard(' ')
    expect(
      screen.queryByText(personal.bioExtended[0]),
    ).not.toBeInTheDocument()
  })
})

describe('About interactive portrait', () => {
  it('renders the default portrait first', () => {
    render(<About />)
    const defaultImg = screen.getByAltText(DEFAULT_ALT)
    expect(defaultImg).toHaveAttribute('src', personal.profilePhoto)
    expect(defaultImg.className).toContain('opacity-100')
  })

  it('crossfades to the alternate portrait on hover', async () => {
    const user = userEvent.setup()
    render(<About />)
    const altImg = screen.getByAltText(ALT_ALT)
    expect(altImg).toHaveAttribute('src', personal.profilePhotoHover)
    expect(altImg.className).toContain('opacity-0')

    await user.hover(
      screen.getByRole('button', { name: /alternate portrait/i }),
    )
    expect(altImg.className).toContain('opacity-100')
    expect(screen.getByAltText(DEFAULT_ALT).className).toContain('opacity-0')
  })

  it('reveals the alternate portrait through keyboard focus', () => {
    render(<About />)
    const altImg = screen.getByAltText(ALT_ALT)
    const button = screen.getByRole('button', { name: /alternate portrait/i })

    fireEvent.focus(button)
    expect(altImg.className).toContain('opacity-100')

    fireEvent.blur(button)
    expect(altImg.className).toContain('opacity-0')
  })

  it('toggles a pinned alternate portrait on click or tap', () => {
    render(<About />)
    const button = screen.getByRole('button', { name: /alternate portrait/i })
    const altImg = screen.getByAltText(ALT_ALT)

    expect(button).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(altImg.className).toContain('opacity-100')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(altImg.className).toContain('opacity-0')
  })

  it('falls back to the default portrait when the alternate fails to load', () => {
    render(<About />)
    fireEvent.error(screen.getByAltText(ALT_ALT))
    expect(screen.queryByAltText(ALT_ALT)).not.toBeInTheDocument()
    expect(screen.getByAltText(DEFAULT_ALT).className).toContain(
      'opacity-100',
    )
  })
})

describe('About existing content', () => {
  it('preserves the quote, name, role, location, and badges', () => {
    render(<About />)
    expect(
      screen.getByText('\u201Ci\'mma leave my future to future me\u201D'),
    ).toBeInTheDocument()
    expect(screen.getByText(personal.name)).toBeInTheDocument()
    expect(screen.getByText(personal.role)).toBeInTheDocument()
    expect(screen.getByText(personal.location)).toBeInTheDocument()
    expect(screen.getByText('Open to internship')).toBeInTheDocument()
    expect(screen.getByText(/BSIT Student/)).toBeInTheDocument()
  })
})
