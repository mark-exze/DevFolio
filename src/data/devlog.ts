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

export const devlogEntries: DevlogEntry[] = [
  {
    id: "devfolio-v1.0.0",
    date: "2026-10-11",
    title: "DevFolio v1.0.0 — Initial Production Release",
    body:
      "Successfully launched the first production version of DevFolio, " +
      "a personal developer portfolio built with React, TypeScript, " +
      "Vite, and Tailwind CSS. Implemented a responsive dark-themed " +
      "interface featuring developer information, technical skills, " +
      "projects, research, education, and development milestones. " +
      "Integrated GitHub for version control and GitHub Actions for " +
      "automated validation. Successfully deployed the application " +
      "to Vercel and published the official GitHub v1.0.0 release.",
    tags: [
      "Release",
      "React",
      "TypeScript",
      "Vite",
      "GitHub",
      "Vercel",
    ],
    url: "https://github.com/mark-exze/DevFolio/releases/tag/v1.0.0",
  },
]