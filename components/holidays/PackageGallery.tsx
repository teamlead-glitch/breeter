'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Palmtree, X } from 'lucide-react'
import { PackageImage } from '@/types/packages'

export default function PackageGallery({ images, title }: { images: PackageImage[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [slide, setSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const touchingRef = useRef(false)

  useEffect(() => {
    if (images.length < 2 || lightboxIndex !== null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => {
      const el = sliderRef.current
      if (!el || el.clientWidth === 0 || touchingRef.current) return
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % images.length
      el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
    }, 3500)

    return () => clearInterval(timer)
  }, [images.length, lightboxIndex])

  useEffect(() => {
    if (lightboxIndex === null) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i === null ? i : (i + 1) % images.length))
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i === null ? i : (i - 1 + images.length) % images.length))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, images.length])

  if (images.length === 0) {
    return (
      <div className="grid h-64 place-items-center rounded-2xl bg-white mb-8 md:h-80">
        <Palmtree size={40} className="text-ink-faint" />
      </div>
    )
  }

  const [main, second, third] = images
  const extraImageCount = images.length > 3 ? images.length - 3 : 0

  return (
    <>
      {/* Mobile: swipeable slider so it's obvious there are more photos */}
      <div className="relative mb-8 md:hidden">
        <div
          ref={sliderRef}
          onTouchStart={() => { touchingRef.current = true }}
          onTouchEnd={() => { touchingRef.current = false }}
          onTouchCancel={() => { touchingRef.current = false }}
          onScroll={e => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto rounded-2xl">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="relative h-64 w-full flex-none cursor-pointer snap-center">
              <Image
                src={img.url}
                alt={img.alt_text || `${title} ${i + 1}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-xs font-semibold text-white">
              {slide + 1} / {images.length}
            </span>
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {images.map((img, i) => (
                <span
                  key={img.id}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mb-8 hidden h-80 grid-cols-3 gap-3 overflow-hidden rounded-2xl md:grid">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="relative col-span-2 row-span-2 cursor-pointer text-left">
          <Image src={main.url} alt={main.alt_text || title} fill sizes="(max-width:768px) 100vw, 66vw" className="object-cover" />
        </button>

        {second && (
          <button type="button" onClick={() => setLightboxIndex(1)} className="relative cursor-pointer text-left">
            <Image src={second.url} alt={second.alt_text || `${title} 2`} fill sizes="33vw" className="object-cover" />
          </button>
        )}

        {third && (
          <button
            type="button"
            onClick={() => setLightboxIndex(extraImageCount > 0 ? 3 : 2)}
            className="relative cursor-pointer text-left">
            <Image src={third.url} alt={third.alt_text || `${title} 3`} fill sizes="33vw" className={`object-cover ${extraImageCount > 0 ? 'opacity-50' : ''}`} />
            {extraImageCount > 0 && (
              <span className="absolute inset-0 flex items-center justify-center bg-forest/60">
                <span className="text-white font-bold text-sm">+{extraImageCount} more</span>
              </span>
            )}
          </button>
        )}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-70 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label={`${title} photos`}>
          <div className="absolute inset-0 bg-ink/90" onClick={() => setLightboxIndex(null)} />

          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
            className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
            <X size={20} />
          </button>

          {images.length > 1 && (
            <button
              onClick={() => setLightboxIndex(i => (i === null ? i : (i - 1 + images.length) % images.length))}
              aria-label="Previous image"
              className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6">
              <ChevronLeft size={22} />
            </button>
          )}

          <div className="relative z-0 h-[70vh] w-full max-w-4xl">
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt_text || `${title} ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <button
              onClick={() => setLightboxIndex(i => (i === null ? i : (i + 1) % images.length))}
              aria-label="Next image"
              className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6">
              <ChevronRight size={22} />
            </button>
          )}

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-white/70">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  )
}
