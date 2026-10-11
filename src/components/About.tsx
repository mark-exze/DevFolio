/**
 * About Me — two-column layout.
 *
 * Left column: heading, subtitle, circular profile photograph, and a
 * personal quote. Right column: biography card. On mobile the columns
 * stack vertically and everything is centered.
 */

import { personal } from '@/data/personal'
import { Code, MapPin } from 'lucide-react'

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      aria-labelledby="about-heading"
    >
      <div className="grid items-start gap-10 md:grid-cols-[35%_65%]">
        <div className="flex flex-col items-center text-center">
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            About <span className="text-sky-400">Me</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">A bit about who I am</p>

          <div className="mt-6 relative">
            <div className="h-[224px] w-[224px] rounded-full border-2 border-sky-500/70 shadow-xl shadow-black/40 ring-1 ring-sky-500/20">
              <img
                src={personal.profilePhoto}
                alt="Portrait of Mark Roland Delicano, BSIT student at Visayas State University Alangalang"
                loading="lazy"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          <p className="mt-6 max-w-xs text-sm italic text-sky-300/80">
            &ldquo;i'mma leave my future to future me&rdquo;
          </p>
        </div>

        <div>
          <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-lg font-semibold text-white">
                  {personal.name}
                </p>
                <p className="text-sm text-gray-400">{personal.role}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {personal.location}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-300">
              {personal.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-navy-600 bg-navy-800/60 px-3 py-1 text-xs text-gray-300">
                <Code className="h-3.5 w-3.5 text-sky-400" aria-hidden />
                Open to internship
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-navy-600 bg-navy-800/60 px-3 py-1 text-xs text-gray-300">
                BSIT Student · 2023–Present
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}