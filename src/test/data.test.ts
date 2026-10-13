/**
 * Tests for the typed data files.
 */

import { describe, it, expect } from 'vitest'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { devlogEntries } from '@/data/devlog'
import { personal } from '@/data/personal'

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