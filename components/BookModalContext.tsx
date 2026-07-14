'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type BookModalContextValue = {
  bookOpen: boolean
  openBookModal: () => void
  closeBookModal: () => void
}

const BookModalContext = createContext<BookModalContextValue | null>(null)

export function BookModalProvider({ children }: { children: ReactNode }) {
  const [bookOpen, setBookOpen] = useState(false)

  return (
    <BookModalContext.Provider
      value={{
        bookOpen,
        openBookModal: () => setBookOpen(true),
        closeBookModal: () => setBookOpen(false),
      }}>
      {children}
    </BookModalContext.Provider>
  )
}

export function useBookModal() {
  const ctx = useContext(BookModalContext)
  if (!ctx) throw new Error('useBookModal must be used within a BookModalProvider')
  return ctx
}
