"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface FloatingSignupButtonProps {
  onClick: () => void
  show?: boolean
}

export default function FloatingSignupButton({ onClick, show = true }: FloatingSignupButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show button after scrolling past the hero section (about 1 screen height)
      setIsVisible(scrollPosition > windowHeight * 0.3)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Combine scroll visibility with the show prop
  const shouldShow = isVisible && show

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="fixed bottom-8 right-8 z-40 bg-primary text-primary-foreground px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 font-semibold"
        >
          <span className="hidden sm:inline">Join Free Intro Class</span>
          <span className="sm:hidden">Free Intro</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
