/**
 * Awards data — sourced from the verified CV (08_MRPD-CV.docx).
 */

export interface Award {
  id: string
  name: string
  institution: string
  period: string
  description?: string
}

export const awards: Award[] = [
  {
    id: 'award-1',
    name: 'College Honor Award',
    institution: 'Visayas State University Alangalang',
    period: 'First Year College · Second Semester · Academic Year 2023-2024',
  },
  {
    id: 'award-2',
    name: 'College Honor Award',
    institution: 'Visayas State University Alangalang',
    period: 'Second Year College · First Semester · Academic Year 2024-2025',
  },
  {
    id: 'award-3',
    name: 'Certificate of Appreciation (Paper Presenter)',
    institution: '3rd National DABEST Student Research and Development Congress / Inaugural Faculty of Computing Research Colloquium',
    period: 'October 17–18, 2024 & April 2, 2025',
    description:
      'Presented the VSUA Campus Facilities Booking Management Information System.',
  },
]