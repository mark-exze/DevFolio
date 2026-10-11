/**
 * Education — academic background timeline.
 */

import { education } from '@/data/education'
import { GraduationCap } from 'lucide-react'

export function Education() {
  return (
    <section
      id="education"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="education-heading"
    >
      <div className="mb-10">
        <h2
          id="education-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Education
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Academic background and formal education.
        </p>
      </div>

      <ol className="space-y-6">
        {education.map((entry) => (
          <li key={entry.id} className="relative flex gap-6 pl-8">
            <span className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/15 text-sky-400">
              <GraduationCap className="h-4 w-4" aria-hidden />
            </span>
            <div className="flex-1 rounded-xl border border-navy-700 bg-navy-900/50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {entry.degree}
                </h3>
                <span className="text-xs font-medium text-sky-400">
                  {entry.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">
                {entry.institution}
              </p>
              {entry.description && (
                <p className="mt-2 text-sm text-gray-500">
                  {entry.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}