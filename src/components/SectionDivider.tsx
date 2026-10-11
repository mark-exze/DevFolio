/**
 * SectionDivider — a subtle horizontal rule between major sections.
 *
 * Thin, low-contrast, contained within the content width. No glow or
 * decorative effects.
 */

export function SectionDivider() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <hr className="border-navy-700/60" />
    </div>
  )
}