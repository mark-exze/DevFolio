/**
 * Projects & Research unified section — deduplication by workId,
 * category membership, filtering, and the details modal for both
 * content types.
 *
 * The data modules are mocked so the fixtures are fully controlled.
 * `alpha` exists in BOTH files under different display names, which
 * proves grouping uses the stable workId and not title matching.
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/data/projects', () => ({
  projects: [
    {
      id: 'p1',
      workId: 'alpha',
      name: 'Alpha Project',
      description: 'Alpha short description.',
      longDescription: 'Alpha long description.',
      stack: ['React', 'Vite'],
      links: [
        { label: 'GitHub', href: 'https://github.com/alpha', kind: 'repo' },
      ],
      featured: true,
      status: 'completed',
      year: 2025,
    },
    {
      id: 'p2',
      workId: 'beta',
      name: 'Beta Project',
      description: 'Beta short description.',
      stack: ['Laravel', 'MySQL', 'PHP', 'JavaScript', 'Redis'],
      links: [],
      featured: false,
      status: 'in-progress',
      year: 2024,
    },
  ],
}))

vi.mock('@/data/research', () => ({
  researchProjects: [
    {
      id: 'r1',
      workId: 'alpha',
      name: 'Alpha Research Title',
      role: 'Researcher',
      teamSize: 3,
      period: '2025 – Present',
      status: 'ongoing',
      stack: ['React', 'Python'],
      summary: 'Alpha research summary.',
      highlights: ['Alpha highlight one', 'Alpha highlight two'],
      presentations: ['Alpha presentation one'],
      recognition: 'Alpha recognition.',
      ethics: 'Alpha ethics note.',
      evaluation: 'Alpha evaluation note.',
    },
  ],
}))

import { ProjectsResearch } from '@/components/ProjectsResearch'

afterEach(cleanup)

function getCard(title: string) {
  return screen
    .getByRole('heading', { name: title, level: 3 })
    .closest('article') as HTMLElement
}

function filterButton(name: string) {
  return screen.getByRole('button', { name: new RegExp(`^${name}`, 'i') })
}

describe('deduplication by workId', () => {
  it('renders one card per unique work, not per data record', () => {
    render(<ProjectsResearch />)
    // Two project records + one research record = three records, but the
    // research record shares workId 'alpha' with the first project.
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(getCard('Alpha Project')).toBeInTheDocument()
    expect(getCard('Beta Project')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Alpha Research Title', level: 3 }),
    ).not.toBeInTheDocument()
  })

  it('gives a dual-category work both badges', () => {
    render(<ProjectsResearch />)
    const alpha = getCard('Alpha Project')
    expect(within(alpha).getByText('Project')).toBeInTheDocument()
    expect(within(alpha).getByText('Research')).toBeInTheDocument()

    const beta = getCard('Beta Project')
    expect(within(beta).getByText('Project')).toBeInTheDocument()
    expect(within(beta).queryByText('Research')).not.toBeInTheDocument()
  })

  it('merges technology stacks without duplication', () => {
    render(<ProjectsResearch />)
    const alpha = getCard('Alpha Project')
    expect(within(alpha).getByText('React')).toBeInTheDocument()
    expect(within(alpha).getByText('Vite')).toBeInTheDocument()
    expect(within(alpha).getByText('Python')).toBeInTheDocument()
  })
})

describe('filters', () => {
  it('shows all unique works by default with accurate counts', () => {
    render(<ProjectsResearch />)
    expect(filterButton('All')).toHaveAttribute('aria-pressed', 'true')
    expect(filterButton('All')).toHaveTextContent('2')
    expect(filterButton('Projects')).toHaveTextContent('2')
    expect(filterButton('Research')).toHaveTextContent('1')
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('Projects filter shows every work classified as a project', async () => {
    const user = userEvent.setup()
    render(<ProjectsResearch />)
    await user.click(filterButton('Projects'))
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(filterButton('Projects')).toHaveAttribute('aria-pressed', 'true')
    expect(filterButton('All')).toHaveAttribute('aria-pressed', 'false')
  })

  it('Research filter shows the dual-category work exactly once', async () => {
    const user = userEvent.setup()
    render(<ProjectsResearch />)
    await user.click(filterButton('Research'))
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(getCard('Alpha Project')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Beta Project' }),
    ).not.toBeInTheDocument()
    expect(filterButton('Research')).toHaveAttribute('aria-pressed', 'true')
  })

  it('returns to all entries when All is selected again', async () => {
    const user = userEvent.setup()
    render(<ProjectsResearch />)
    await user.click(filterButton('Research'))
    await user.click(filterButton('All'))
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })
})

describe('details modal', () => {
  it('shows project details and a separate research subsection', async () => {
    const user = userEvent.setup()
    render(<ProjectsResearch />)
    await user.click(
      within(getCard('Alpha Project')).getByRole('button', { name: /view details/i }),
    )

    const dialog = screen.getByRole('dialog')
    // Project details
    expect(
      within(dialog).getByRole('heading', { name: 'Alpha Project' }),
    ).toBeInTheDocument()
    expect(within(dialog).getByText('Alpha long description.')).toBeInTheDocument()
    // Research subsection keeps its own metadata and meaning
    expect(
      within(dialog).getByRole('heading', { name: /research details/i }),
    ).toBeInTheDocument()
    expect(
      within(dialog).getByText('Researcher · Team of 3 · 2025 – Present'),
    ).toBeInTheDocument()
    expect(within(dialog).getByText('Alpha research summary.')).toBeInTheDocument()
    expect(within(dialog).getByText('Alpha highlight one')).toBeInTheDocument()
    expect(within(dialog).getByText('Alpha presentation one')).toBeInTheDocument()
    expect(within(dialog).getByText('Alpha recognition.')).toBeInTheDocument()
    expect(within(dialog).getByText('Alpha ethics note.')).toBeInTheDocument()
    expect(within(dialog).getByText('Alpha evaluation note.')).toBeInTheDocument()
    // No screenshots or documentation exist for this entry.
    expect(within(dialog).queryByRole('img')).not.toBeInTheDocument()
    expect(within(dialog).queryByText(/documentation/i)).not.toBeInTheDocument()
  })

  it('shows only project details for a project-only work', async () => {
    const user = userEvent.setup()
    render(<ProjectsResearch />)
    await user.click(
      within(getCard('Beta Project')).getByRole('button', { name: /view details/i }),
    )
    const dialog = screen.getByRole('dialog')
    expect(
      within(dialog).getByRole('heading', { name: 'Beta Project' }),
    ).toBeInTheDocument()
    expect(
      within(dialog).queryByRole('heading', { name: /research details/i }),
    ).not.toBeInTheDocument()
  })

  it('closes on Escape and restores focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<ProjectsResearch />)
    const trigger = within(getCard('Beta Project')).getByRole('button', {
      name: /view details/i,
    })
    await user.click(trigger)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
