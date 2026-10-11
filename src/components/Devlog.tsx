/**
 * Devlog — chronological feed of short, dated notes.
 *
 * When no verified entries exist, an empty state is shown instead of
 * inventing milestones that cannot be confirmed against commit history.
 */

import { devlogEntries } from '@/data/devlog'
import { Calendar, Link as LinkIcon, Tag } from 'lucide-react'

export function Devlog() {
  const entries = [...devlogEntries].sort((a, b) =>
    b.date.localeCompare(a.date),
  )

  return (
    <section
      id="devlog"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="devlog-heading"
    >
      <div className="mb-10">
        <h2
          id="devlog-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Devlog
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Notes, learnings, and release announcements.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-navy-700 bg-navy-900/30 p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
            <Calendar className="h-6 w-6" aria-hidden />
          </div>
          <p className="text-sm text-gray-400">
            Development updates will appear here as verified milestones are
            documented.
          </p>
        </div>
      ) : (
        <ol className="relative ml-3 space-y-6 border-l border-navy-700">
          {entries.map((entry) => (
            <DevlogEntryItem key={entry.id} entry={entry} />
          ))}
        </ol>
      )}
    </section>
  )
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function DevlogEntryItem({ entry }: { entry: (typeof devlogEntries)[number] }) {
  return (
    <li className="ml-6">
      <span className="absolute -left-2.5 mt-1.5 h-3 w-3 rounded-full bg-sky-500 ring-4 ring-navy-950" />

      <div className="rounded-xl border border-navy-700 bg-navy-900/50 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5 text-gray-400">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatDate(entry.date)}
          </span>
          {entry.url && (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              <LinkIcon className="h-3.5 w-3.5" aria-hidden />
              Read more
            </a>
          )}
        </div>

        <h3 className="mt-2 text-lg font-semibold text-white">
          {entry.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-300">
          {entry.body}
        </p>

        {entry.tags.length > 0 && (
          <ul
            className="mt-3 flex flex-wrap gap-1.5"
            aria-label="Tags"
            role="list"
          >
            {entry.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex items-center gap-1 rounded-full border border-navy-600 bg-navy-800/60 px-2 py-0.5 text-xs text-gray-300">
                  <Tag className="h-3 w-3 text-sky-400" aria-hidden />
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}