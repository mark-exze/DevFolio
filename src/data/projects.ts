/**
 * Projects data file.
 *
 * All entries are sourced from the verified CV (08_MRPD-CV.docx) and the
 * VeriFaceX manuscript. No fictional projects or placeholder repositories
 * are included.
 *
 * Optional fields (`thumbnail`, `images`, `documents`) exist so real
 * screenshots and supporting documents can be attached later without
 * changing the components. Sections backed by an empty or absent field
 * are hidden, so never invent values for them — leave them unset until
 * a real asset exists in `public/` (images) or a real URL exists
 * (documents).
 */

import type { WorkId } from './works'

export interface ProjectLink {
  label: string
  href: string
  kind: 'repo' | 'demo' | 'article' | 'paper'
}

export interface ProjectImage {
  /** Public path such as `/images/projects/verifacex-1.png`. */
  src: string
  alt: string
  caption?: string
}

export interface ProjectDocument {
  label: string
  href: string
}

export interface Project {
  id: string
  /**
   * Stable identity shared with the matching research entry (when the
   * work is also research). Used to merge both records into a single
   * card in the Projects & Research section.
   */
  workId: WorkId
  name: string
  description: string
  longDescription?: string
  stack: string[]
  links: ProjectLink[]
  featured: boolean
  status: 'completed' | 'in-progress' | 'archived'
  year: number
  /** Optional card thumbnail; omitted when no real asset exists. */
  thumbnail?: string
  /** Optional screenshots shown as a gallery in the details modal. */
  images?: ProjectImage[]
  /** Optional supporting documents with real URLs/files. */
  documents?: ProjectDocument[]
}

export const projects: Project[] = [
  {
    id: 'project-1',
    workId: 'verifacex',
    name: 'VeriFaceX',
    description:
      'An intelligent multi-layered attendance and entry tracking system for VSUA that combines barcode verification, facial recognition, and occupancy monitoring to reduce proxy attendance.',
    longDescription:
      'VeriFaceX is a capstone research project developed through the Incremental Software Development Lifecycle. It integrates face-api.js for facial detection, TensorFlow.js for in-browser inference, QuaggaJS for barcode decoding, and Chart.js for analytics visualization. The system is built with Laravel 11, PHP 8.2+, MySQL 8, and Tailwind CSS. Evaluated against ISO/IEC 25010:2023 quality characteristics (Functional Suitability, Performance Efficiency, Usability, Security) and approved under the Data Privacy Act of 2012 by the University Ethics Review Committee.',
    stack: [
      'Laravel 11',
      'PHP 8.2+',
      'MySQL 8',
      'JavaScript',
      'Tailwind CSS',
      'face-api.js',
      'TensorFlow.js',
      'QuaggaJS',
      'Chart.js',
    ],
    links: [
      {
        label: 'ORCiD',
        href: 'https://orcid.org/0009-0006-4709-6515',
        kind: 'paper',
      },
    ],
    featured: true,
    status: 'in-progress',
    year: 2026,
  },
  {
    id: 'project-2',
    workId: 'vsua-facilities-booking-mis',
    name: 'VSUA Campus Facilities Booking MIS',
    description:
      'A booking management information system for campus facilities using a heuristic scheduling algorithm.',
    longDescription:
      'Presented at the 3rd National DABEST Student Research and Development Congress (Eastern Visayas State University, Tacloban City, October 17–18, 2024) and the Inaugural Faculty of Computing Research Colloquium (RDE Hall, Visayas State University, Baybay City, April 2, 2025). Received a Certificate of Appreciation as a paper presenter.',
    stack: ['Laravel', 'MySQL', 'PHP', 'JavaScript'],
    links: [],
    featured: true,
    status: 'completed',
    year: 2024,
  },
  {
    id: 'project-3',
    workId: 'devfolio',
    name: 'DevFolio',
    description:
      'A production-ready personal developer portfolio built with React, TypeScript, Vite, Tailwind CSS v4, and Lucide React.',
    longDescription:
      'DevFolio is a fully typed, accessible, and responsive single-page portfolio template. It ships with reusable components, typed local data files, SEO metadata, and a GitHub Actions CI pipeline.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Lucide React'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/markrolanddelicano',
        kind: 'repo',
      },
    ],
    featured: false,
    status: 'completed',
    year: 2026,
  },
]