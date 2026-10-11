/**
 * Skills — categorized technology badges sourced from the verified CV.
 *
 * No numeric proficiency ratings are displayed. Technologies supported
 * by the CV are shown as standard badges; technologies the developer is
 * actively learning are visually distinguished.
 */

import { skillCategories } from '@/data/skills'
import { cn } from '@/utils'

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="skills-heading"
    >
      <div className="mb-10">
        <h2
          id="skills-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Skills <span className="text-sky-400">&amp;</span> Tools
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          A snapshot of the tools and technologies I work with regularly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <article
            key={category.id}
            className="rounded-2xl border border-navy-700 bg-navy-900/50 p-6"
          >
            <h3 className="text-lg font-semibold text-white">
              {category.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {category.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" role="list">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
                      skill.source === 'cv'
                        ? 'border-navy-600 bg-navy-800/60 text-gray-300'
                        : 'border-sky-500/40 bg-sky-500/10 text-sky-300',
                    )}
                    title={
                      skill.source === 'learning'
                        ? 'Actively learning'
                        : 'Supported by CV'
                    }
                  >
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}