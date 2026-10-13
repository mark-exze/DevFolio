/**
 * Hero — landing section with headline, intro, and primary actions.
 *
 * Two-column layout: the left column carries the introduction and actions;
 * the right column holds the floating developer code illustration — a
 * tilted, perspective-shifted editor window over four decorative layers
 * (dotted texture, blue gradient circle, right and lower-left backing
 * panels) with a floating `</>` icon overlapping the lower right. All
 * decoration is noninteractive and reduced-motion aware.
 */

import { personal } from '@/data/personal'
import { cn } from '@/utils'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { DeveloperCard } from './DeveloperCard'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full max-w-6xl overflow-x-clip px-4 py-16 sm:px-6 sm:py-28"
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

        <div className="flex min-w-0 items-center justify-center md:py-10">
          <div className="relative mx-auto w-full max-w-md py-10 md:py-10">
            {/* Layer D — faint dotted texture behind the composition */}
            <div
              aria-hidden
              className="bg-dot-grid pointer-events-none absolute -inset-x-2 -inset-y-2 opacity-40 md:-inset-x-10 md:-inset-y-6"
            />

            {/* Light panel behind the circle, peeking above the editor */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-10 h-32 w-48 rotate-[-8deg] rounded-[2rem] bg-white/[0.07] md:-left-12 md:-top-14 md:h-40 md:w-60 lg:-left-24 lg:-top-28 lg:h-64 lg:w-96"
            />

            {/* Layer A — distinct blue circle behind the editor's upper-left,
                partially obscured by the editor in the foreground */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-sky-400/65 via-sky-500/35 to-blue-700/15 blur-[1px] md:-left-10 md:-top-12 md:h-40 md:w-40 lg:-left-20 lg:-top-20 lg:h-56 lg:w-56"
            />

            {/* Layer B — dark panel extending beyond the editor's right edge */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-2 rotate-[3deg] rounded-2xl border border-sky-500/20 bg-navy-900/50 backdrop-blur-sm md:translate-x-5 md:rotate-[4deg] lg:translate-x-11 lg:rotate-[5deg]"
            />

            {/* Layer C — dark panel behind the editor's lower-left */}
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-3 translate-y-5 -rotate-[3deg] rounded-2xl border border-sky-500/15 bg-navy-800/40 md:-translate-x-5 md:translate-y-9 md:-rotate-[4deg] lg:-translate-x-9 lg:translate-y-14 lg:-rotate-[5deg]"
            />

            {/* Main editor — one transform on the composition only; the code
                text inside is never transformed. Counterclockwise tilt with
                subtle perspective and gentle float. */}
            <div className="relative [perspective:1200px]">
              <div className="md:[transform:rotateY(-9deg)_rotateX(2deg)_rotate(-4deg)]">
                <div className="motion-safe:animate-float">
                  <DeveloperCard />
                </div>
              </div>
            </div>

            {/* Floating code icon — overlapping the editor's lower-right
                corner on desktop; on the narrow mobile/tablet layouts it
                drops just below the corner so it never covers code text. */}
            <span
              aria-hidden
              className="absolute -bottom-2 -right-1 grid h-12 w-12 rotate-[10deg] place-items-center rounded-2xl border border-cyan-300/60 bg-gradient-to-br from-sky-500 via-blue-700 to-navy-900 shadow-[0_12px_28px_-6px_rgba(14,165,233,0.7)] ring-1 ring-inset ring-cyan-200/25 motion-safe:animate-float-icon md:-bottom-8 md:-right-4 md:h-16 md:w-16 lg:-right-6 lg:h-24 lg:w-24"
            >
              <span className="font-mono text-base font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] md:text-xl lg:text-3xl">
                &lt;/&gt;
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}