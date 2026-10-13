/**
 * Developer code editor — a decorative, editor-styled presentation of
 * the portfolio owner as a developer, matched to the reference design.
 *
 * The syntax-highlighted snippet is static presentation text (not
 * executable application logic). The editor is labelled as a
 * decorative image for assistive technology so its contents are
 * announced once, as a summary, instead of token by token. The window
 * chrome (dots, badge) and the decorative comment are hidden from
 * screen readers.
 */

import type { ReactNode } from 'react'
import { personal } from '@/data/personal'

type TokenProps = { children: ReactNode }

/** Colored token helpers for lightweight syntax highlighting. */
function Keyword({ children }: TokenProps) {
  return <span className="text-violet-400">{children}</span>
}

function Variable({ children }: TokenProps) {
  return <span className="font-medium text-slate-100">{children}</span>
}

function Property({ children }: TokenProps) {
  return <span className="text-sky-400">{children}</span>
}

function String({ children }: TokenProps) {
  return <span className="text-emerald-300">{children}</span>
}

function Literal({ children }: TokenProps) {
  return <span className="text-orange-400">{children}</span>
}

function Punctuation({ children }: TokenProps) {
  return <span className="text-slate-400">{children}</span>
}

export function DeveloperCard() {
  return (
    <figure
      role="img"
      aria-label={`Decorative developer code editor: a TypeScript portfolio object for ${personal.name} listing name, role, stack, focus areas, and an alwaysLearning flag.`}
      className="w-full overflow-hidden rounded-2xl border border-sky-500/25 bg-navy-900/60 shadow-[0_18px_50px_-24px_rgba(14,165,233,0.45)] ring-1 ring-inset ring-white/5 backdrop-blur-sm"
    >
      {/* Window chrome: traffic-light dots stacked vertically (left) and
          the outlined Developer badge (right) */}
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5 sm:px-6">
        <span className="flex flex-col gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <span className="rounded-full border border-sky-400/30 px-3 py-0.5 text-[11px] font-medium tracking-wide text-slate-300">
          Developer
        </span>
      </div>

      {/* The editor narrows to a 2-column Hero cell at md, so font size and
          padding track the editor width (not the viewport): generous on
          mobile and desktop, tighter in the tablet band. Lines wrap instead
          of scrolling so the snippet never clips or scrolls. */}
      <pre className="whitespace-pre-wrap break-words px-5 pt-7 pb-7 font-mono text-[11px] leading-[1.9] text-left sm:px-6 sm:pt-8 sm:pb-8 sm:text-[13px] md:px-4 md:text-[11px] lg:px-8 lg:pt-9 lg:pb-9 lg:text-[14px]">
        <code>
          <Keyword>const</Keyword> <Variable>portfolio</Variable>{' '}
          <Punctuation>=</Punctuation> <Punctuation>{'{'}</Punctuation>
          {'\n  '}
          <Property>name</Property>
          <Punctuation>:</Punctuation> <String>&#39;{personal.name}&#39;</String>
          <Punctuation>,</Punctuation>
          {'\n  '}
          <Property>role</Property>
          <Punctuation>:</Punctuation>{' '}
          <String>&#39;Aspiring Software Developer&#39;</String>
          <Punctuation>,</Punctuation>
          {'\n  '}
          <Property>stack</Property>
          <Punctuation>: [</Punctuation>
          <String>&#39;React&#39;</String>
          <Punctuation>, </Punctuation>
          <String>&#39;TypeScript&#39;</String>
          <Punctuation>, </Punctuation>
          <String>&#39;Vite&#39;</String>
          <Punctuation>],</Punctuation>
          {'\n  '}
          <Property>focus</Property>
          <Punctuation>: [</Punctuation>
          <String>&#39;Web&#39;</String>
          <Punctuation>, </Punctuation>
          <String>&#39;Mobile&#39;</String>
          <Punctuation>, </Punctuation>
          <String>&#39;AI&#39;</String>
          <Punctuation>],</Punctuation>
          {'\n  '}
          <Property>alwaysLearning</Property>
          <Punctuation>:</Punctuation> <Literal>true</Literal>
          {'\n'}
          <Punctuation>{'}'}</Punctuation>
          {'\n\n'}
          <span aria-hidden className="text-slate-500">
            {'// Turning ideas into meaningful solutions.'}
          </span>
        </code>
      </pre>
    </figure>
  )
}
