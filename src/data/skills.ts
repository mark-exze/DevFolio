/**
 * Technical skills — categorized technology cards.
 *
 * Sourced from the verified CV (08_MRPD-CV.docx).
 *
 * Rules followed:
 *  - Technologies supported by the CV are marked `source: 'cv'`.
 *  - Technologies the developer is actively learning (React, Next.js,
 *    Flutter, Dart) are marked `source: 'learning'` to avoid implying
 *    professional mastery.
 *  - No arbitrary 5/5 proficiency ratings are used.
 *  - Categories are grouped by professional domain.
 */

export type SkillSource = 'cv' | 'learning'

export interface Skill {
  name: string
  source: SkillSource
  level?: number
}

export interface SkillCategory {
  id: string
  name: string
  description: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Technologies used to build user interfaces.',
    skills: [
      { name: 'HTML5', source: 'cv' },
      { name: 'CSS3', source: 'cv' },
      { name: 'JavaScript', source: 'cv' },
      { name: 'TypeScript', source: 'cv' },
      { name: 'React.js', source: 'learning' },
      { name: 'Next.js', source: 'learning' },
      { name: 'Tailwind CSS', source: 'cv' },
      { name: 'Vite', source: 'cv' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Server-side and database technologies.',
    skills: [
      { name: 'PHP', source: 'cv' },
      { name: 'Python', source: 'cv' },
      { name: 'Laravel', source: 'cv' },
      { name: 'Django', source: 'cv' },
      { name: 'MySQL', source: 'cv' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    description: 'Cross-platform mobile application technologies.',
    skills: [
      { name: 'Flutter', source: 'learning' },
      { name: 'Dart', source: 'learning' },
    ],
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    description: 'Languages the developer works with.',
    skills: [
      { name: 'Python', source: 'cv' },
      { name: 'PHP', source: 'cv' },
      { name: 'JavaScript', source: 'cv' },
      { name: 'TypeScript', source: 'cv' },
      { name: 'Dart', source: 'learning' },
      { name: 'C++', source: 'cv' },
      { name: 'GDScript', source: 'cv' },
    ],
  },
  {
    id: 'tools',
    name: 'Development Tools',
    description: 'Tooling for development, version control, and authoring.',
    skills: [
      { name: 'Git', source: 'cv' },
      { name: 'GitHub', source: 'cv' },
      { name: 'Visual Studio Code', source: 'cv' },
      { name: 'Antigravity IDE', source: 'cv' },
      { name: 'Godot', source: 'cv' },
    ],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence & Emerging Technologies',
    description: 'AI literacy, machine learning, and computer vision concepts.',
    skills: [
      { name: 'AI Literacy', source: 'cv' },
      { name: 'Prompt Engineering', source: 'cv' },
      { name: 'Machine Learning', source: 'cv' },
      { name: 'Computer Vision', source: 'cv' },
      { name: 'Facial Recognition Concepts', source: 'cv' },
    ],
  },
  {
    id: 'hardware',
    name: 'Hardware & IT Support',
    description: 'Practical IT support and troubleshooting skills.',
    skills: [
      { name: 'Computer Troubleshooting', source: 'cv' },
      { name: 'Computer and Laptop Repair', source: 'cv' },
    ],
  },
]