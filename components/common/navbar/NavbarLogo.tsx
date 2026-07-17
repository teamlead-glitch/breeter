import Link from 'next/link'

export default function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
      <span className="w-8 h-8 bg-gold rounded-lg grid place-items-center font-display font-bold text-white text-lg leading-none">B</span>
      <span className="font-display font-bold text-white text-xl tracking-tight">Breeter</span>
    </Link>
  )
}
