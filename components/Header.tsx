import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 dark:bg-zinc-900/80">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-display font-bold">
            SR
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="#about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#experience" className="hover:text-primary transition-colors">
              Experience
            </Link>
            <Link href="#projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
} 