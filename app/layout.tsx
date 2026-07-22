import type { Metadata } from 'next'
import { Playfair_Display, Inter, DM_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/common/navbar/Navbar'
import Footer from '@/components/common/Footer'
import WhatsAppFab from '@/components/common/WhatsAppFab'
import { BookModalProvider } from '@/components/common/BookModalContext'
import { SearchProvider } from '@/components/common/SearchContext'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Breeter — Outstation Cabs & Holiday Packages',
  description:
    'Book outstation cabs, hourly rentals and curated holiday packages across South India. Transparent pricing, verified operators.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <SearchProvider>
          <BookModalProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFab />
          </BookModalProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
