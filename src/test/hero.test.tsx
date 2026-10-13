/**
 * Tests for the Hero section: preserved introduction content and the
 * decorative floating developer code editor.
 */

import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/Hero'
import { personal } from '@/data/personal'

describe('Hero introduction', () => {
  it('renders the headline, tagline, and call-to-action links', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(personal.name)
    expect(screen.getByText(personal.tagline)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /view projects/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /explore verifacex/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /get in touch/i }),
    ).toBeInTheDocument()
  })

  it('renders the social links', () => {
    render(<Hero />)
    for (const social of personal.social) {
      expect(
        screen.getByRole('link', { name: social.name }),
      ).toHaveAttribute('href', social.href)
    }
  })
})

describe('Hero developer code editor', () => {
  it('renders the decorative editor with its summary label', () => {
    render(<Hero />)
    expect(
      screen.getByRole('img', { name: /developer code editor/i }),
    ).toBeInTheDocument()
  })

  it('renders the editor window chrome and decorative comment', () => {
    render(<Hero />)
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(
      screen.getByText('// Turning ideas into meaningful solutions.'),
    ).toBeInTheDocument()
  })

  it('renders the syntax-highlighted portfolio snippet', () => {
    render(<Hero />)
    expect(screen.getByText('const')).toBeInTheDocument()
    expect(screen.getByText('portfolio')).toBeInTheDocument()
    expect(screen.getByText('stack')).toBeInTheDocument()
    expect(screen.getByText('focus')).toBeInTheDocument()
    expect(screen.getByText('alwaysLearning')).toBeInTheDocument()
    expect(screen.getByText(/React/)).toBeInTheDocument()
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument()
    expect(screen.getByText(/Vite/)).toBeInTheDocument()
    expect(screen.getByText(/Web/)).toBeInTheDocument()
    expect(screen.getByText(/Mobile/)).toBeInTheDocument()
    expect(screen.getByText(/AI/)).toBeInTheDocument()
  })
})
