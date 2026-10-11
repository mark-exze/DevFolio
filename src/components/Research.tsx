/**
 * Research — academic research projects.
 *
 * VeriFaceX is ongoing; the Campus Facilities Booking MIS is an
 * unpublished research presentation (not a journal publication).
 */

import { researchProjects } from '@/data/research'
import { cn } from '@/utils'
import { ShieldCheck, Gauge, FileText, Presentation } from 'lucide-react'

const statusConfig: Record<
  string,
  { label: string; cls: string }
> = {
  ongoing: { label: 'Ongoing', cls: 'bg-amber-500/15 text-amber-300' },
  unpublished: {
    label: 'Unpublished',
    cls: 'bg-gray-500/15 text-gray-300',
  },
}

export function Research() {
  return (
    <section
      id="research"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="research-heading"
    >
      <div className="mb-10">
        <h2
          id="research-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Research
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Academic research and capstone projects.
        </p>
      </div>

      <div className="space-y-8">
        {researchProjects.map((project) => {
          const status = statusConfig[project.status]
          return (
            <article
              key={project.id}
              className="rounded-2xl border border-navy-700 bg-navy-900/50 p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {project.role} · Team of {project.teamSize} ·{' '}
                    {project.period}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
                    status.cls,
                  )}
                >
                  {status.label}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                {project.summary}
              </p>

              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
                  Key highlights
                </h4>
                <ul className="mt-2 space-y-2" role="list">
                  {project.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                        aria-hidden
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {project.presentations && project.presentations.length > 0 && (
                <div className="mt-5 flex items-start gap-3">
                  <Presentation
                    className="mt-0.5 h-5 w-5 shrink-0 text-sky-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Research presentations
                    </p>
                    <ul className="mt-2 space-y-1" role="list">
                      {project.presentations.map((pres, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-300"
                        >
                          {pres}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {project.recognition && (
                <div className="mt-4 flex items-start gap-3">
                  <FileText
                    className="mt-0.5 h-5 w-5 shrink-0 text-sky-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Recognition
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                      {project.recognition}
                    </p>
                  </div>
                </div>
              )}

              {project.ethics && (
                <div className="mt-5 flex items-start gap-3 rounded-lg border border-navy-700 bg-navy-950/40 p-4">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-sky-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Ethics &amp; Privacy
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                      {project.ethics}
                    </p>
                  </div>
                </div>
              )}

              {project.evaluation && (
                <div className="mt-4 flex items-start gap-3">
                  <Gauge
                    className="mt-0.5 h-5 w-5 shrink-0 text-sky-400"
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Evaluation
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                      {project.evaluation}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-navy-600 bg-navy-800/60 px-2 py-0.5 text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}