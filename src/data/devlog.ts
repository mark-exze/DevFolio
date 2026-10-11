/**
 * Devlog data file.
 *
 * The Devlog is intentionally empty: no entry can be verified against the
 * project's commit history, so unverified milestones are omitted rather
 * than presented as fact. The component renders an empty state instead.
 */

export interface DevlogEntry {
  id: string
  date: string
  title: string
  body: string
  tags: string[]
  url?: string
}

export const devlogEntries: DevlogEntry[] = []