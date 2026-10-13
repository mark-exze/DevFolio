/**
 * Shared work identities for the portfolio.
 *
 * A single piece of work (for example VeriFaceX) can be represented in
 * both `projects.ts` and `research.ts` — sometimes with different
 * display names. `workId` is the stable identifier the unified Projects
 * & Research section uses to group those records into one card, so
 * deduplication never relies on matching display titles.
 *
 * Add a new id here when a new work appears in either data file.
 */

export const workIds = [
  'verifacex',
  'vsua-facilities-booking-mis',
  'devfolio',
] as const

export type WorkId = (typeof workIds)[number]
