/**
 * Projects & Research — one unified, filterable section combining the
 * software projects and academic research entries.
 *
 * The same work can appear in both data files (for example VeriFaceX is
 * both a project and ongoing research, sometimes under different display
 * names). Records are grouped by their stable `workId` from
 * src/data/works.ts — never by title — so each unique work renders as a
 * single card carrying one badge per category it belongs to.
 *
 * The details modal shows the project's technical details and, when the
 * work is also research, its research details in a separate subsection.
 * Only fields that actually exist in the data are rendered.
 */

import { useMemo, useState } from 'react'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { researchProjects } from '@/data/research'
import type { ResearchProject } from '@/data/research'
import { personal } from '@/data/personal'
import { cn } from '@/utils'
import {
  ArrowUpRight,
  BookOpen,
  Code,
  ExternalLink,
  FileText,
  FlaskConical,
  Github,
  LayoutTemplate,
  Paperclip,
  Presentation,
  ShieldCheck,
  Gauge,
  Target,
} from 'lucide-react'
import { Modal } from './Modal'
import { ImageGallery } from './ImageGallery'

type IconType = React.ComponentType<{ className?: string }>

type Category = 'all' | 'project' | 'research'
type EntryCategory = Exclude<Category, 'all'>

/** One card in the unified grid — a unique work, in one or both files. */
interface UnifiedEntry {
  workId: string
  title: string
  description: string
  /** Union of both stacks, de-duplicated, order preserved. */
  tags: string[]
  meta: string
  categories: EntryCategory[]
  sortYear: number
  project?: Project
  research?: ResearchProject
}

const projectStatusLabel: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  archived: 'Archived',
}

const researchStatusLabel: Record<ResearchProject['status'], string> = {
  ongoing: 'Ongoing',
  unpublished: 'Unpublished',
}

const linkKindIcon: Record<string, IconType> = {
  repo: Github,
  demo: LayoutTemplate,
  article: BookOpen,
  paper: FileText,
}

const categoryBadge = {
  project: {
    label: 'Project',
    cls: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
    Icon: Code,
  },
  research: {
    label: 'Research',
    cls: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    Icon: FlaskConical,
  },
} as const

/** Tags shown on a collapsed card before collapsing into a "+N" chip. */
const MAX_CARD_TAGS = 4

/** Leading four-digit year of a research period such as "2024". */
function periodYear(period: string) {
  const match = period.match(/\d{4}/)
  return match ? Number(match[0]) : 0
}

function researchMeta(research: ResearchProject) {
  return `${research.role} · Team of ${research.teamSize} · ${research.period}`
}

export function ProjectsResearch() {
  const [filter, setFilter] = useState<Category>('all')
  const [active, setActive] = useState<UnifiedEntry | null>(null)

  /**
   * Group both data sources by workId into unique works. Project
   * records are inserted first so their display name, description, and
   * metadata take precedence on the card; the research record keeps its
   * own fields for the modal's research subsection.
   */
  const entries = useMemo<UnifiedEntry[]>(() => {
    const byWork = new Map<string, UnifiedEntry>()

    for (const project of projects) {
      byWork.set(project.workId, {
        workId: project.workId,
        title: project.name,
        description: project.description,
        tags: [...project.stack],
        meta: `${project.year} · ${projectStatusLabel[project.status]}`,
        categories: ['project'],
        sortYear: project.year,
        project,
      })
    }

    for (const research of researchProjects) {
      const existing = byWork.get(research.workId)
      if (existing) {
        existing.categories.push('research')
        existing.research = research
        // Merge stacks without dropping or duplicating technologies.
        for (const tech of research.stack) {
          if (!existing.tags.includes(tech)) existing.tags.push(tech)
        }
        continue
      }
      byWork.set(research.workId, {
        workId: research.workId,
        title: research.name,
        description: research.summary,
        tags: [...research.stack],
        meta: researchMeta(research),
        categories: ['research'],
        sortYear: periodYear(research.period),
        research,
      })
    }

    return [...byWork.values()].sort((a, b) => b.sortYear - a.sortYear)
  }, [])

  const filters: { value: Category; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: entries.length },
    {
      value: 'project',
      label: 'Projects',
      count: entries.filter((e) => e.categories.includes('project')).length,
    },
    {
      value: 'research',
      label: 'Research',
      count: entries.filter((e) => e.categories.includes('research')).length,
    },
  ]

  const visible =
    filter === 'all'
      ? entries
      : entries.filter((entry) => entry.categories.includes(filter))

  return (
    <section
      id="projects-research"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="projects-research-heading"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="projects-research-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Projects &amp; Research
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Software I have built and academic research I have contributed
            to.
          </p>
        </div>
        <a
          href={personal.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg border border-navy-600 px-3 py-2 text-sm text-gray-300 transition-colors hover:border-sky-500/50 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 sm:inline-flex"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub profile
        </a>
      </div>

      {/* Category filters — counts reflect unique works */}
      <div
        role="group"
        aria-label="Filter projects and research by category"
        className="mb-6 flex flex-wrap gap-2"
      >
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
              filter === item.value
                ? 'border-sky-500/60 bg-sky-500/15 text-sky-300'
                : 'border-navy-600 bg-navy-800/60 text-gray-300 hover:border-sky-500/40 hover:text-sky-300',
            )}
          >
            {item.label}
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px]',
                filter === item.value
                  ? 'bg-sky-500/20 text-sky-200'
                  : 'bg-navy-700/60 text-gray-400',
              )}
            >
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div
          role="status"
          className="rounded-2xl border border-dashed border-navy-700 bg-navy-900/40 px-6 py-14 text-center"
        >
          <p className="text-sm font-medium text-gray-300">
            No {filter === 'project' ? 'project' : 'research'} entries yet
          </p>
          <p className="mt-1 text-sm text-gray-500">
            This category will populate as new work is published.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((entry) => (
            <UnifiedCard
              key={entry.workId}
              entry={entry}
              onOpen={() => setActive(entry)}
            />
          ))}
        </div>
      )}

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.title ?? ''}
        subtitle={active?.meta}
      >
        {active?.project && <ProjectDetails project={active.project} />}

        {active?.research &&
          (active.project ? (
            // Dual-category work: research keeps its own subsection so
            // project and research metadata retain separate meanings.
            <section className="mt-8 space-y-4 border-t border-navy-700 pt-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-400">
                  Research details
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {researchMeta(active.research)}
                </p>
              </div>
              <ResearchDetails research={active.research} />
            </section>
          ) : (
            <ResearchDetails research={active.research} />
          ))}
      </Modal>
    </section>
  )
}

function UnifiedCard({
  entry,
  onOpen,
}: {
  entry: UnifiedEntry
  onOpen: () => void
}) {
  const visibleTags = entry.tags.slice(0, MAX_CARD_TAGS)
  const hiddenCount = entry.tags.length - visibleTags.length
  const thumbnail =
    entry.project?.thumbnail ?? entry.research?.thumbnail
  const firstLink = entry.project?.links[0]

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-navy-700 bg-navy-900/50 p-5 transition-colors hover:border-sky-500/40">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-base font-semibold leading-snug text-white transition-colors group-hover:text-sky-400">
          {entry.title}
        </h3>
        <span className="flex flex-wrap gap-1.5">
          {entry.categories.map((category) => {
            const badge = categoryBadge[category]
            const BadgeIcon = badge.Icon
            return (
              <span
                key={category}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
                  badge.cls,
                )}
              >
                <BadgeIcon className="h-3 w-3" aria-hidden />
                {badge.label}
              </span>
            )
          })}
        </span>
      </div>

      {thumbnail && (
        <img
          src={thumbnail}
          alt={`${entry.title} thumbnail`}
          loading="lazy"
          className="mt-3 h-36 w-full rounded-lg border border-navy-700 object-cover"
        />
      )}

      <p className="mt-1 text-xs text-gray-500">{entry.meta}</p>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-300">
        {entry.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-navy-600 bg-navy-800/60 px-2 py-0.5 text-[11px] text-gray-300"
          >
            {tag}
          </span>
        ))}
        {hiddenCount > 0 && (
          <span className="rounded-full border border-navy-600 bg-navy-800/60 px-2 py-0.5 text-[11px] text-gray-400">
            +{hiddenCount}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        {firstLink ? (
          <a
            href={firstLink.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${firstLink.label} for ${entry.title}`}
            className="text-gray-400 transition-colors hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy-600 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-sky-500/50 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
        >
          View Details
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </article>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      {project.images && project.images.length > 0 && (
        <ImageGallery images={project.images} label={project.name} />
      )}

      <p className="text-sm leading-relaxed text-gray-300">
        {project.description}
      </p>

      {project.longDescription && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
            About this project
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {project.longDescription}
          </p>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
          Technologies
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-navy-600 bg-navy-800/60 px-2.5 py-0.5 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.documents && project.documents.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
            Documentation
          </h3>
          <ul className="mt-2 space-y-1.5" role="list">
            {project.documents.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-sky-400 transition-colors hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
                >
                  <Paperclip className="h-3.5 w-3.5" aria-hidden />
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.links.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
            Links
          </h3>
          <div className="mt-2 flex flex-wrap gap-3">
            {project.links.map((link) => {
              const Icon = linkKindIcon[link.kind] ?? ExternalLink
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-navy-600 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-sky-500/50 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function ResearchDetails({ research }: { research: ResearchProject }) {
  return (
    <div className="space-y-6">
      <span
        className={cn(
          'inline-block rounded-full px-2.5 py-1 text-xs font-medium',
          research.status === 'ongoing'
            ? 'bg-amber-500/15 text-amber-300'
            : 'bg-gray-500/15 text-gray-300',
        )}
      >
        {researchStatusLabel[research.status]}
      </span>

      {research.images && research.images.length > 0 && (
        <ImageGallery images={research.images} label={research.name} />
      )}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
          Overview
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">
          {research.summary}
        </p>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
          Key highlights
        </h3>
        <ul className="mt-2 space-y-2" role="list">
          {research.highlights.map((highlight, index) => (
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

      {research.presentations && research.presentations.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-400">
            <Presentation className="h-3.5 w-3.5" aria-hidden />
            Research presentations
          </h3>
          <ul className="mt-2 space-y-1.5" role="list">
            {research.presentations.map((pres, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-300"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                  aria-hidden
                />
                {pres}
              </li>
            ))}
          </ul>
        </div>
      )}

      {research.recognition && (
        <div>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-400">
            <Target className="h-3.5 w-3.5" aria-hidden />
            Recognition
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {research.recognition}
          </p>
        </div>
      )}

      {research.ethics && (
        <div className="rounded-lg border border-navy-700 bg-navy-950/40 p-4">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-400">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Ethics &amp; Privacy
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {research.ethics}
          </p>
        </div>
      )}

      {research.evaluation && (
        <div>
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-400">
            <Gauge className="h-3.5 w-3.5" aria-hidden />
            Evaluation
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            {research.evaluation}
          </p>
        </div>
      )}

      {research.documents && research.documents.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
            Documentation
          </h3>
          <ul className="mt-2 space-y-1.5" role="list">
            {research.documents.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-sky-400 transition-colors hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
                >
                  <Paperclip className="h-3.5 w-3.5" aria-hidden />
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-sky-400">
          Technologies
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {research.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-navy-600 bg-navy-800/60 px-2.5 py-0.5 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
