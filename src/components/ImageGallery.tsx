/**
 * ImageGallery — keyboard-accessible gallery for real project/research
 * images.
 *
 * Renders a single figure when only one image exists, and adds
 * previous/next controls plus a counter when multiple images exist.
 * Arrow keys navigate while the gallery region has focus. Nothing is
 * rendered for an empty list, and images must reference real assets —
 * this component deliberately contains no placeholder fallback.
 */

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  label: string
}

export function ImageGallery({ images, label }: ImageGalleryProps) {
  const [index, setIndex] = useState(0)

  const count = images.length
  const go = useCallback(
    (delta: number) => setIndex((prev) => (prev + delta + count) % count),
    [count],
  )

  useEffect(() => {
    setIndex(0)
  }, [images])

  if (count === 0) return null

  const current = images[index]

  return (
    <section
      aria-label={`${label} image gallery`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          go(1)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          go(-1)
        }
      }}
      className="group/gallery rounded-xl border border-navy-700 bg-navy-950/40 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
    >
      <figure className="m-0">
        <div className="flex items-center justify-center overflow-hidden rounded-lg bg-navy-900">
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            loading="lazy"
            className="max-h-80 w-auto max-w-full rounded-lg object-contain motion-safe:transition-opacity motion-safe:duration-200"
          />
        </div>
        {current.caption && (
          <figcaption className="mt-2 text-center text-xs text-gray-400">
            {current.caption}
          </figcaption>
        )}
      </figure>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-navy-600 text-gray-300 transition-colors hover:border-sky-500/50 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <span className="flex items-center gap-2 text-xs text-gray-400">
            <ImageIcon className="h-3.5 w-3.5" aria-hidden />
            <span aria-live="polite">
              Image {index + 1} of {count}
            </span>
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-navy-600 text-gray-300 transition-colors hover:border-sky-500/50 hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </section>
  )
}
