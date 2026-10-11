/**
 * Shared utility helpers.
 */

export function cn(...inputs: Array<string | undefined | null | false>): string {
  return inputs
    .filter((input): input is string => typeof input === 'string' && input.length > 0)
    .join(' ')
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}