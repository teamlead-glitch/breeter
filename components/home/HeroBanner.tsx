import Image from 'next/image'

export default function HeroBanner() {
  return (
    <section className="relative h-[55vh] overflow-hidden sm:h-[65vh] md:h-[75vh]">
      <Image
        src="/images/banner.png"
        alt="Black car on a night highway with a route pin trail and city skyline"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70" />
    </section>
  )
}
