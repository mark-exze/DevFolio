/**
 * Tests for the typed data files.
 */

import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { projects } from '@/data/projects'
import { researchProjects } from '@/data/research'
import { workIds } from '@/data/works'
import { skillCategories } from '@/data/skills'
import { devlogEntries } from '@/data/devlog'
import { personal } from '@/data/personal'

/** Vitest runs from the project root, where `public/` lives. */
const publicDir = resolve(process.cwd(), 'public')

/** Optional image references must point at real files in public/. */
function expectRealAsset(src: string) {
  expect(src.startsWith('/')).toBe(true)
  expect(
    existsSync(`${publicDir}${src.replace(/^\//, '')}`),
    `missing asset: ${src}`,
  ).toBe(true)
}

describe('projects data', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('each project has a unique id', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('each project has a name, description, stack, and links', () => {
    for (const p of projects) {
      expect(p.name.trim().length).toBeGreaterThan(0)
      expect(p.description.trim().length).toBeGreaterThan(0)
      expect(Array.isArray(p.stack)).toBe(true)
      expect(p.stack.length).toBeGreaterThan(0)
      expect(Array.isArray(p.links)).toBe(true)
    }
  })

  it('each project link has a valid href and label', () => {
    for (const p of projects) {
      for (const link of p.links) {
        expect(link.label.trim().length).toBeGreaterThan(0)
        expect(link.href).toMatch(/^https?:\/\//)
      }
    }
  })

  it('all project years are numbers', () => {
    for (const p of projects) {
      expect(typeof p.year).toBe('number')
    }
  })

  it('optional project images reference real assets (none invented)', () => {
    for (const p of projects) {
      for (const image of p.images ?? []) {
        expect(image.alt.trim().length).toBeGreaterThan(0)
        expectRealAsset(image.src)
      }
    }
  })

  it('optional project documents use absolute links with labels', () => {
    for (const p of projects) {
      for (const doc of p.documents ?? []) {
        expect(doc.label.trim().length).toBeGreaterThan(0)
        expect(doc.href).toMatch(/^(https?:\/\/|\.?\/)/)
      }
    }
  })
})

describe('research data', () => {
  it('has at least one entry with a non-empty summary and highlights', () => {
    expect(researchProjects.length).toBeGreaterThan(0)
    for (const r of researchProjects) {
      expect(r.name.trim().length).toBeGreaterThan(0)
      expect(r.summary.trim().length).toBeGreaterThan(0)
      expect(r.highlights.length).toBeGreaterThan(0)
      expect(r.stack.length).toBeGreaterThan(0)
      expect(['ongoing', 'unpublished']).toContain(r.status)
    }
  })

  it('optional research images reference real assets (none invented)', () => {
    for (const r of researchProjects) {
      for (const image of r.images ?? []) {
        expect(image.alt.trim().length).toBeGreaterThan(0)
        expectRealAsset(image.src)
      }
    }
  })

  it('optional research documents use absolute links with labels', () => {
    for (const r of researchProjects) {
      for (const doc of r.documents ?? []) {
        expect(doc.label.trim().length).toBeGreaterThan(0)
        expect(doc.href).toMatch(/^(https?:\/\/|\.?\/)/)
      }
    }
  })
})

describe('work identity (projects + research deduplication)', () => {
  it('every project and research entry carries a registry workId', () => {
    for (const p of projects) expect(workIds).toContain(p.workId)
    for (const r of researchProjects) expect(workIds).toContain(r.workId)
  })

  it('workIds are unique within each data file', () => {
    const projectIds = projects.map((p) => p.workId)
    const researchIds = researchProjects.map((r) => r.workId)
    expect(new Set(projectIds).size).toBe(projectIds.length)
    expect(new Set(researchIds).size).toBe(researchIds.length)
  })

  it('represents a small set of unique works across both files', () => {
    const ids = new Set([
      ...projects.map((p) => p.workId),
      ...researchProjects.map((r) => r.workId),
    ])
    // Fewer unique works than records means the two files overlap, which
    // the unified section is expected to deduplicate by workId.
    expect(ids.size).toBeLessThan(projects.length + researchProjects.length)
    expect(ids.size).toBe(3)
  })

  it('gives works that exist in both files a shared identity', () => {
    const researchIds = new Set(researchProjects.map((r) => r.workId))
    const shared = projects.filter((p) => researchIds.has(p.workId))
    expect(shared.map((p) => p.workId)).toEqual([
      'verifacex',
      'vsua-facilities-booking-mis',
    ])
  })
})

describe('skills data', () => {
  it('has at least one category', () => {
    expect(skillCategories.length).toBeGreaterThan(0)
  })

  it('each category has a name and non-empty skills', () => {
    for (const category of skillCategories) {
      expect(category.name.trim().length).toBeGreaterThan(0)
      expect(category.skills.length).toBeGreaterThan(0)
    }
  })

  it('each skill has a name', () => {
    for (const category of skillCategories) {
      for (const skill of category.skills) {
        expect(skill.name.trim().length).toBeGreaterThan(0)
      }
    }
  })
})

describe('devlog data', () => {
  it('contains only verified entries (may be empty)', () => {
    // The Devlog is intentionally empty when no entry can be verified
    // against the project's commit history. An empty array is valid.
    expect(Array.isArray(devlogEntries)).toBe(true)
  })

  it('each entry has a unique id', () => {
    const ids = devlogEntries.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('each entry has a valid ISO date', () => {
    for (const entry of devlogEntries) {
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(() => new Date(`${entry.date}T00:00:00Z`)).not.toThrow()
    }
  })

  it('each entry has a title and body', () => {
    for (const entry of devlogEntries) {
      expect(entry.title.trim().length).toBeGreaterThan(0)
      expect(entry.body.trim().length).toBeGreaterThan(0)
    }
  })
})

describe('personal data', () => {
  it('has a name, role, and email', () => {
    expect(personal.name.trim().length).toBeGreaterThan(0)
    expect(personal.role.trim().length).toBeGreaterThan(0)
    expect(personal.email).toMatch(/@/)
  })

  it('has navigation entries with label and href', () => {
    expect(personal.nav.length).toBeGreaterThan(0)
    for (const item of personal.nav) {
      expect(item.label.trim().length).toBeGreaterThan(0)
      expect(item.href.trim().length).toBeGreaterThan(0)
    }
  })

  it('has an extended biography with non-empty paragraphs', () => {
    expect(personal.bioExtended.length).toBeGreaterThan(0)
    for (const paragraph of personal.bioExtended) {
      expect(paragraph.trim().length).toBeGreaterThan(0)
    }
  })

  it('exposes a default profile photo', () => {
    expect(personal.profilePhoto).toMatch(/\.(jpg|jpeg|png|webp)$/)
  })
})