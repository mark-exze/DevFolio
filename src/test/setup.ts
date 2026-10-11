/**
 * Vitest test setup.
 */

import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'

expect.extend(matchers)

// jsdom does not implement layout methods used by some components.
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})

// Re-export user-event for convenience.
export { userEvent }