/**
 * Contact — simple, accessible contact section.
 *
 * Uses a native mailto form so no backend dependency is required. All
 * fields are labelled and required. The form is informational only:
 * clicking submit opens the user's email client with a pre-filled draft.
 */

import { personal } from '@/data/personal'
import { cn } from '@/utils'
import { Mail, MapPin, Send } from 'lucide-react'

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Get in <span className="text-sky-400">touch</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Have a question or want to work together? Send me a message.
          </p>

          <ul className="mt-6 space-y-3" role="list">
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="transition-colors hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                {personal.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <span>{personal.location}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-6 sm:p-8">
          <p className="mb-4 text-sm text-gray-400">
            Fill out the form below and your email client will open with the
            message pre-filled. You will need to review and send it from your
            own email client.
          </p>
          <form
            action={`mailto:${personal.email}`}
            method="POST"
            encType="text/plain"
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                minLength={2}
                className={cn(
                  'w-full rounded-lg border border-navy-700 bg-navy-950/60 px-3 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40',
                )}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className={cn(
                  'w-full rounded-lg border border-navy-700 bg-navy-950/60 px-3 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40',
                )}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                className={cn(
                  'w-full resize-y rounded-lg border border-navy-700 bg-navy-950/60 px-3 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40',
                )}
                placeholder="How can I help?"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 sm:w-auto"
            >
              <Send className="h-4 w-4" aria-hidden />
              Open in email client
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}