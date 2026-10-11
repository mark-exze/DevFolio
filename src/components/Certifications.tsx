/**
 * Certifications — professional trainings and course completions.
 */

import { certifications } from '@/data/certifications'
import { Award } from 'lucide-react'

export function Certifications() {
  return (
    <section
      id="certifications"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="certifications-heading"
    >
      <div className="mb-10">
        <h2
          id="certifications-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Certifications &amp; Trainings
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Professional development courses and workshops.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex items-start gap-4 rounded-xl border border-navy-700 bg-navy-900/50 p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
              <Award className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white">
                {cert.name}
              </h3>
              <p className="mt-0.5 text-sm text-gray-400">
                {cert.provider}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                <span>{cert.date}</span>
                <span className="inline-flex items-center rounded-full border border-navy-600 bg-navy-800/60 px-2 py-0.5 text-gray-300">
                  {cert.role}
                </span>
                {cert.hours && (
                  <span>{cert.hours}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}