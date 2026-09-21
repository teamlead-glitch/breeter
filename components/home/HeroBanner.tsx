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
      className="relative block aspect-video w-full cursor-pointer overflow-hidden lg:aspect-[4/1]"
    >
      <Image
        src="/images/hero-banner-mobile-v2.svg"
        alt="Book outstation cabs in minutes — transparent pricing, verified drivers, zero surprises"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center lg:hidden"
      />
      <Image
        src="/images/hero-banner-desktop-v3.svg"
        alt="Book outstation cabs in minutes — transparent pricing, verified drivers, zero surprises"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="hidden object-cover object-center lg:block"
      />
    </button>
  )
}
