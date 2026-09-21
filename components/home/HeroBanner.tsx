'use client'
import Image from 'next/image'
import { useBookModal } from '@/components/common/BookModalContext'

export default function HeroBanner() {
  const { openBookModal } = useBookModal()

  return (
    <button
      type="button"
      onClick={openBookModal}
      aria-label="Book a cab"
      className="relative block aspect-video w-full cursor-pointer overflow-hidden md:aspect-auto md:h-[75vh]"
    >
      <Image
        src="/images/hero-banner-mobile.svg"
        alt="Book outstation cabs in minutes — transparent pricing, verified drivers, zero surprises"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center md:hidden"
      />
      <Image
        src="/images/hero-banner-desktop.svg"
        alt="Book outstation cabs in minutes — transparent pricing, verified drivers, zero surprises"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="hidden object-cover object-center md:block"
      />
    </button>
  )
}
