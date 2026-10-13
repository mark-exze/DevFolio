/**
 * Empty-category state for the unified Projects & Research section.
 * Research has no entries in this fixture, so the Research filter must
 * show a helpful empty state instead of an empty grid.
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/data/projects', () => ({
  projects: [
    {
      id: 'p1',
      workId: 'solo',
      name: 'Alpha Project',
      description: 'Alpha short description.',
      stack: ['React'],
      links: [],
      featured: true,
      status: 'completed',
      year: 2025,
    },
  ],
}))

vi.mock('@/data/research', () => ({
  researchProjects: [],
}))

import { ProjectsResearch } from '@/components/ProjectsResearch'

afterEach(cleanup)

describe('Projects & Research empty category', () => {
  it('shows an empty state when Research has no entries', async () => {
    const user = userEvent.setup()
    render(<ProjectsResearch />)

    await user.click(screen.getByRole('button', { name: /^research/i }))
    expect(screen.queryAllByRole('article')).toHaveLength(0)

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent(/no research entries yet/i)
  })

  it('still shows projects and keeps counts accurate', async () => {
    const user = userEvent.setup()
    render(<ProjectsResearch />)

    expect(screen.getByRole('button', { name: /^all/i })).toHaveTextContent('1')
    expect(screen.getByRole('button', { name: /^projects/i })).toHaveTextContent('1')
    expect(screen.getByRole('button', { name: /^research/i })).toHaveTextContent('0')

    await user.click(screen.getByRole('button', { name: /^projects/i }))
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })
})
