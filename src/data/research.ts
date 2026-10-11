/**
 * Research data — sourced from the VeriFaceX manuscript and verified CV.
 *
 * Publication status is stated explicitly: VeriFaceX is ongoing research;
 * the Campus Facilities Booking MIS is an unpublished research presentation.
 */

export type ResearchStatus = 'ongoing' | 'unpublished'

export interface ResearchProject {
  id: string
  name: string
  role: string
  teamSize: number
  period: string
  status: ResearchStatus
  stack: string[]
  summary: string
  highlights: string[]
  presentations?: string[]
  recognition?: string
  ethics?: string
  evaluation?: string
}

export const researchProjects: ResearchProject[] = [
  {
    id: 'research-1',
    name: 'VeriFaceX',
    role: 'Researcher',
    teamSize: 4,
    period: 'April 2026 – Present',
    status: 'ongoing',
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
    summary:
      'An intelligent multi-layered attendance and entry tracking system for Visayas State University Alangalang that combines barcode verification, facial recognition, and occupancy monitoring to reduce proxy attendance and strengthen institutional oversight.',
    highlights: [
      'Incremental Software Development Lifecycle with five phases: Planning, Design/Model, Development, Testing, Deployment',
      'Multi-layered verification: barcode → facial detection → identity matching → mismatch detection',
      'In-browser facial inference via TensorFlow.js and face-api.js; no cloud dependency',
      'Real-time occupancy monitoring and people counting using USB webcams',
      'Admin, instructor, and student dashboards with role-based access',
      'Automated attendance logs, alerts, and report generation',
    ],
    ethics:
      'Approved by the University Ethics Review Committee. Conducted in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173). Facial images are used only to generate facial templates; raw images are not stored. Personally identifiable information will not appear in research outputs.',
    evaluation:
      'Evaluated against selected quality characteristics of the ISO/IEC 25010:2023 Software Product Quality Model, including Functional Suitability, Performance Efficiency, Usability, and Security.',
  },
  {
    id: 'research-2',
    name: 'VSUA Campus Facilities Booking Management Information System',
    role: 'Researcher',
    teamSize: 1,
    period: '2024',
    status: 'unpublished',
    stack: ['Laravel', 'MySQL', 'PHP', 'JavaScript'],
    summary:
      'An academic research project focused on developing a booking management information system for university campus facilities using a heuristic scheduling algorithm.',
    highlights: [
      'Heuristic scheduling algorithm for campus facility booking',
      'Laravel-based management information system',
    ],
    presentations: [
      '3rd National DABEST Student Research and Development Congress, Eastern Visayas State University, Tacloban City, October 17–18, 2024',
      'Inaugural Faculty of Computing Research Colloquium, RDE Hall, Visayas State University, Baybay City, April 2, 2025',
    ],
    recognition: 'Certificate of Appreciation as a paper presenter.',
  },
]