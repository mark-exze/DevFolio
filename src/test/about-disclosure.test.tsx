/**
 * Tests for the About biography disclosure behaviour, using mocked
 * personal data with an intro bio plus extended paragraphs so the
 * "Read More" / "Show Less" button is present.
 */

import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/data/personal', () => ({
  personal: {
    name: 'Test Person',
    fullName: 'Test Person',
    role: 'Tester',
    tagline: 'Test tagline',
    bio: ['Bio one', 'Bio two', 'Bio three', 'Bio four'],
    bioExtended: ['Extended five', 'Extended six'],
    email: 'test@example.com',
    location: 'Nowhere',
    education: '',
    institution: '',
    enrollment: '',
    avatarInitials: 'TP',
    profilePhoto: '/images/profile.jpg',
    profilePhotoHover: '/images/profile-2.png',
    githubUrl: '',
    orcid: '',
    social: [],
    nav: [],
  },
}))

import { About } from '@/components/About'

describe('About disclosure with intro + extended bio', () => {
  it('shows only the first two intro paragraphs initially', () => {
    render(<About />)
    expect(screen.getByText('Bio one')).toBeInTheDocument()
    expect(screen.getByText('Bio two')).toBeInTheDocument()
    expect(screen.queryByText('Bio three')).not.toBeInTheDocument()
    expect(screen.queryByText('Bio four')).not.toBeInTheDocument()
    expect(screen.queryByText('Extended five')).not.toBeInTheDocument()
    expect(screen.queryByText('Extended six')).not.toBeInTheDocument()
  })

  it('exposes accessible button semantics', () => {
    render(<About />)
    const button = screen.getByRole('button', { name: /read more/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-controls', 'about-bio')
    expect(document.getElementById('about-bio')).toBeInTheDocument()
  })

  it('expands to intro + extended paragraphs and collapses on click', async () => {
    const user = userEvent.setup()
    render(<About />)

    await user.click(screen.getByRole('button', { name: /read more/i }))
    for (const text of [
      'Bio one',
      'Bio two',
      'Bio three',
      'Bio four',
      'Extended five',
      'Extended six',
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
    const expanded = screen.getByRole('button', { name: /show less/i })
    expect(expanded).toHaveAttribute('aria-expanded', 'true')

    await user.click(expanded)
    expect(screen.queryByText('Bio three')).not.toBeInTheDocument()
    expect(screen.queryByText('Extended five')).not.toBeInTheDocument()
    expect(screen.getByText('Bio one')).toBeInTheDocument()
  })

  it('toggles with keyboard activation', async () => {
    const user = userEvent.setup()
    render(<About />)

    const button = screen.getByRole('button', { name: /read more/i })
    button.focus()
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('Extended five')).toBeInTheDocument()

    await user.keyboard(' ')
    expect(screen.queryByText('Extended five')).not.toBeInTheDocument()
  })
})
