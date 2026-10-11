/**
 * Projects — grid of project cards with real external links.
 *
 * Featured projects appear first. All links are configured from the
 * typed data file so they can be swapped by editing src/data/projects.ts.
 */

import { projects } from '@/data/projects'
import { personal } from '@/data/personal'
import { cn } from '@/utils'
import {
  ExternalLink,
  Github,
  BookOpen,
  LayoutTemplate,
  Star,
  FileText,
} from 'lucide-react'

type IconType = React.ComponentType<{ className?: string }>

const kindIcon: Record<string, IconType> = {
  repo: Github,
  demo: LayoutTemplate,
  article: BookOpen,
  paper: FileText,
}

export function Projects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => b.year - a.year)
  const others = projects
    .filter((p) => !p.featured)
    .sort((a, b) => b.year - a.year)

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Projects
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Things I have built and shipped.
          </p>
        </div>
        <a
          href={personal.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg border border-navy-600 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-sky-500/50 hover:text-sky-400 sm:inline-flex"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub profile
        </a>
      </div>

      <div className="space-y-8">
        {featured.length > 0 && (
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-400">
              <Star className="h-4 w-4" aria-hidden />
              Featured
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Other
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const statusLabel: Record<string, string> = {
    completed: 'Completed',
    'in-progress': 'In progress',
    archived: 'Archived',
  }

  return (
    <article className="group flex flex-col rounded-2xl border border-navy-700 bg-navy-900/50 p-6 transition-colors hover:border-sky-500/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-sky-400">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-gray-400">{project.year}</p>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
            project.status === 'completed' &&
              'bg-emerald-500/15 text-emerald-300',
            project.status === 'in-progress' &&
              'bg-amber-500/15 text-amber-300',
            project.status === 'archived' &&
              'bg-gray-500/15 text-gray-300',
          )}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-gray-300">
        {project.description}
      </p>

      {project.longDescription && (
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          {project.longDescription}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-navy-600 bg-navy-800/60 px-2 py-0.5 text-xs text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {project.links.map((link) => {
          const Icon = kindIcon[link.kind] ?? ExternalLink
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-sky-400 transition-colors hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              <Icon className="h-4 w-4" aria-hidden />
              {link.label}
            </a>
          )
        })}
      </div>
    </article>
  )
}