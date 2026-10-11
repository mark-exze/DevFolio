/**
 * Certifications and trainings — sourced from the verified CV (08_MRPD-CV.docx).
 */

export interface Certification {
  id: string
  name: string
  provider: string
  date: string
  role: string
  hours?: string
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'JavaScript Elective Course',
    provider: 'Zuitt Learning Institute, Inc.',
    date: 'January 28 – May 29, 2026',
    role: 'Course Completer',
    hours: '54 hours',
  },
  {
    id: 'cert-2',
    name: 'Zuitt Free Coding Bootcamp: Data Visualization Workshop',
    provider: 'Zuitt Learning Institute, Inc.',
    date: 'June 5, 2026',
    role: 'Participant',
  },
  {
    id: 'cert-3',
    name: 'Zuitt Free Coding Bootcamp: Basic Web Development',
    provider: 'Zuitt Learning Institute, Inc.',
    date: 'September 19, 2026',
    role: 'Participant',
  },
  {
    id: 'cert-4',
    name: 'Dev8 BOOT 2026',
    provider: '—',
    date: 'April 4, 2026',
    role: 'Participant',
  },
  {
    id: 'cert-5',
    name: 'Introduction to AI Literacy and Responsible Use',
    provider: '—',
    date: 'September 16, 2026 (issued)',
    role: 'Course Completer',
  },
  {
    id: 'cert-6',
    name: 'Smart LEARN: Low-Code Automation and Analytics',
    provider: '—',
    date: 'March 1, 2026',
    role: 'Participant',
  },
  {
    id: 'cert-7',
    name: 'Smart LEARN: Prompt Engineering Fundamentals: Working Effectively with Large Language Models',
    provider: '—',
    date: 'March 1, 2026',
    role: 'Participant',
  },
  {
    id: 'cert-8',
    name: 'Philippine Army Cyber Defense Exercise Qualifiers',
    provider: '—',
    date: 'October 25–26, 2025',
    role: 'Participant',
  },
  {
    id: 'cert-9',
    name: 'Student Leadership Congress 2025',
    provider: '—',
    date: 'July 28–29, 2025',
    role: 'Participant',
  },
]