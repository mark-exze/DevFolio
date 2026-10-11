/**
 * Footer — site-wide footer with links and metadata.
 */

import { personal } from '@/data/personal'
import { Github, Linkedin, Mail } from 'lucide-react'

const iconFor = (name: string) => {
  switch (name) {
    case 'github':
      return Github
    case 'linkedin':
      return Linkedin
    case 'orcid':
      return Mail
    default:
      return Mail
  }
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-navy-800 bg-navy-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:px-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <a
            href="/"
            className="flex items-center gap-2"
          >
            <img
              src="/images/logo.png"
              alt="DevFolio logo"
              className="h-7 w-7 shrink-0"
            />
            <span className="text-lg font-semibold leading-none tracking-tight">
              <span className="text-white">Dev</span>
              <span className="text-sky-400">Folio</span>
            </span>
          </a>
          <p className="text-xs text-gray-500">
            Built with React, TypeScript, Vite, and Tailwind CSS.
          </p>
        </div>

        <nav aria-label="Footer social links">
          <ul className="flex items-center gap-3" role="list">
            {personal.social.map((social) => {
              const Icon = iconFor(social.icon)
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-700 text-gray-400 transition-colors hover:border-sky-500/50 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <p className="text-xs text-gray-500">
          &copy; {currentYear} {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}