/**
 * Hero — landing section with headline, intro, and primary actions.
 *
 * Two-column layout: the left column carries the introduction and actions;
 * the right column holds the developer-themed code card, vertically
 * centered against the introduction. No profile photograph or decorative
 * elements are rendered here.
 */

import { personal } from '@/data/personal'
import { cn } from '@/utils'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-28"
      aria-labelledby="hero-heading"
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Aspiring software developer
          </p>

          <h1
            id="hero-heading"
            className={cn(
              'text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl',
            )}
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
              {personal.name}
            </span>
            .
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-gray-300">
            {personal.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              View projects
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#research"
              className="inline-flex items-center gap-2 rounded-lg border border-navy-600 px-4 py-2.5 text-sm font-semibold text-gray-200 transition-colors hover:border-sky-500/50 hover:bg-navy-800/60 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              Explore VeriFaceX
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-navy-600 px-4 py-2.5 text-sm font-semibold text-gray-200 transition-colors hover:border-sky-500/50 hover:bg-navy-800/60 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Get in touch
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4">
            {personal.social.map((social) => {
              const Icon =
                social.icon === 'github'
                  ? Github
                  : social.icon === 'linkedin'
                    ? Linkedin
                    : social.icon === 'orcid'
                      ? Mail
                      : Mail
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-gray-400 transition-colors hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-navy-700 bg-navy-900/60 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/15 text-sky-400">
                {'<'}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {personal.name}
                </p>
                <p className="text-xs text-gray-400">{personal.role}</p>
              </div>
              <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
            </div>

            <div className="mt-5 space-y-2 font-mono text-sm">
              <p>
                <span className="text-sky-400">const</span>{' '}
                <span className="text-amber-300">portfolio</span> = {'{'}
              </p>
              <p className="pl-4">
                <span className="text-sky-400">name</span>:{' '}
                <span className="text-emerald-300">'{personal.name}'</span>,
              </p>
              <p className="pl-4">
                <span className="text-sky-400">role</span>:{' '}
                <span className="text-emerald-300">'{personal.role}'</span>,
              </p>
              <p className="pl-4">
                <span className="text-sky-400">stack</span>: [
                <span className="text-emerald-300">'React'</span>,{' '}
                <span className="text-emerald-300">'TypeScript'</span>,{' '}
                <span className="text-emerald-300">'Vite'</span>],
              </p>
              <p>{'}'}</p>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="h-2 w-2 rounded-full bg-sky-400/70" />
              <span className="h-2 w-2 rounded-full bg-sky-400/40" />
              <span className="ml-2 text-xs text-gray-400">
                {personal.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}