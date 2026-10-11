/**
 * Education data — sourced from the verified CV (08_MRPD-CV.docx).
 */

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  period: string
  description?: string
}

export const education: EducationEntry[] = [
  {
    id: 'edu-1',
    institution: 'Visayas State University Alangalang',
    degree: 'Bachelor of Science in Information Technology',
    period: '2023 – Present',
    description:
      'Binongtoan, Alangalang, Leyte, Philippines.',
  },
  {
    id: 'edu-2',
    institution: 'Granja Kalinawan National High School',
    degree: 'High School',
    period: '2017 – 2023',
  },
  {
    id: 'edu-3',
    institution: 'Jaro I Central School',
    degree: 'Elementary',
    period: '2011 – 2017',
  },
]