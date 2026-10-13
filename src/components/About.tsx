/**
 * About Me — two-column layout.
 *
 * Left column: heading, subtitle, interactive circular profile
 * photograph, and a personal quote. Right column: biography card. On
 * mobile the columns stack vertically and everything is centered.
 *
 * The biography shows the first VISIBLE_BIO_PARAGRAPHS introductory
 * paragraphs; a "Read More" / "Show Less" disclosure reveals the
 * additional `bioExtended` paragraphs with a subtle reveal animation.
 *
 * Hovering (or focusing, or tapping) the portrait crossfades to an
 * alternate photo. If the alternate asset fails to load, the default
 * portrait remains visible.
 */

import { useState } from 'react'
import { personal } from '@/data/personal'
import { ChevronDown, Code, MapPin } from 'lucide-react'

/** Number of introductory biography paragraphs shown before expanding. */
const VISIBLE_BIO_PARAGRAPHS = 2

export function About() {
  const [bioExpanded, setBioExpanded] = useState(false)
  const [photoHovered, setPhotoHovered] = useState(false)
  const [photoAltPinned, setPhotoAltPinned] = useState(false)
  const [altPhotoAvailable, setAltPhotoAvailable] = useState(true)

  const introBio = personal.bio.slice(0, VISIBLE_BIO_PARAGRAPHS)
  // Intro paragraphs beyond the preview, plus the extended biography.
  const expandedBio = [
    ...personal.bio.slice(VISIBLE_BIO_PARAGRAPHS),
    ...personal.bioExtended,
  ]
  const hasMoreBio = expandedBio.length > 0

  // The alternate portrait shows on hover/focus (transient) and via a
  // pinned click/tap toggle, and only while the asset loads correctly.
  const showAltPhoto = altPhotoAvailable && (photoHovered || photoAltPinned)

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      aria-labelledby="about-heading"
    >
      {/* fr units (not percentages) so the 40px gap is subtracted from the
          tracks instead of overflowing the container at tablet widths. */}
      <div className="grid items-start gap-10 md:grid-cols-[35fr_65fr]">
        <div className="flex flex-col items-center text-center">
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            About <span className="text-sky-400">Me</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">A bit about who I am</p>

          <div className="mt-6 relative">
            <button
              type="button"
              onClick={() => setPhotoAltPinned((prev) => !prev)}
              onMouseEnter={() => setPhotoHovered(true)}
              onMouseLeave={() => setPhotoHovered(false)}
              onFocus={() => setPhotoHovered(true)}
              onBlur={() => setPhotoHovered(false)}
              aria-pressed={showAltPhoto}
              aria-label="Show alternate portrait"
              className="relative h-[224px] w-[224px] cursor-pointer rounded-full border-2 border-sky-500/70 shadow-xl shadow-black/40 ring-1 ring-sky-500/20 transition duration-300 ease-out hover:-translate-y-1 hover:border-sky-400 hover:shadow-sky-500/40 hover:ring-sky-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <img
                src={personal.profilePhoto}
                alt="Portrait of Mark Roland Delicano, BSIT student at Visayas State University Alangalang"
                loading="lazy"
                className={`h-full w-full rounded-full object-cover transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                  showAltPhoto ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {personal.profilePhotoHover && altPhotoAvailable && (
                <img
                  src={personal.profilePhotoHover}
                  onError={() => setAltPhotoAvailable(false)}
                  alt="Alternate portrait of Mark Roland Delicano"
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full rounded-full object-cover transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                    showAltPhoto ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </button>
          </div>

          <p className="mt-6 max-w-xs text-sm italic text-sky-300/80">
            &ldquo;i&apos;mma leave my future to future me&rdquo;
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

            <div
              id="about-bio"
              className="mt-6 space-y-4 text-base leading-relaxed text-gray-300"
            >
              {introBio.map((paragraph, index) => (
                <p key={`intro-${index}`}>{paragraph}</p>
              ))}

              {bioExpanded && (
                <div className="space-y-4 motion-safe:animate-bio-reveal">
                  {expandedBio.map((paragraph, index) => (
                    <p key={`extended-${index}`}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>

            {hasMoreBio && (
              <button
                type="button"
                onClick={() => setBioExpanded((prev) => !prev)}
                aria-expanded={bioExpanded}
                aria-controls="about-bio"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-navy-600 bg-navy-800/60 px-3.5 py-1.5 text-xs font-medium text-sky-400 transition-colors duration-200 hover:border-sky-500/60 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 motion-reduce:transition-none"
              >
                {bioExpanded ? 'Show Less' : 'Read More'}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 motion-reduce:transition-none ${
                    bioExpanded ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
            )}

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
