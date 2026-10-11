/**
 * Awards — academic honors and recognitions.
 */

import { awards } from '@/data/awards'
import { Trophy } from 'lucide-react'

export function Awards() {
  return (
    <section
      id="awards"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="awards-heading"
    >
      <div className="mb-10">
        <h2
          id="awards-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Awards &amp; Recognition
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Academic honors and professional recognitions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {awards.map((award) => (
          <div
            key={award.id}
            className="flex items-start gap-4 rounded-xl border border-navy-700 bg-navy-900/50 p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
              <Trophy className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white">
                {award.name}
              </h3>
              <p className="mt-0.5 text-sm text-gray-400">
                {award.institution}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {award.period}
              </p>
              {award.description && (
                <p className="mt-2 text-sm text-gray-400">
                  {award.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}