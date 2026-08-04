import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/common/navbar/Navbar'
import Footer from '@/components/common/Footer'
import WhatsAppFab from '@/components/common/WhatsAppFab'
import { BookModalProvider } from '@/components/common/BookModalContext'
import { SearchProvider } from '@/context/SearchContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      className={inter.variable}
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
