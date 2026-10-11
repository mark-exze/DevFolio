/**
 * Projects data file.
 *
 * All entries are sourced from the verified CV (08_MRPD-CV.docx) and the
 * VeriFaceX manuscript. No fictional projects or placeholder repositories
 * are included.
 */

export interface ProjectLink {
  label: string
  href: string
  kind: 'repo' | 'demo' | 'article' | 'paper'
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription?: string
  stack: string[]
  links: ProjectLink[]
  featured: boolean
  status: 'completed' | 'in-progress' | 'archived'
  year: number
}

export const projects: Project[] = [
  {
    id: 'project-1',
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