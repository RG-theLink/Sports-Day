import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-0 bg-navy-900" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Logo size={36} />
            <span className="text-lg sm:text-xl font-bold">
              SCA <span className="text-accent">Sports</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
              © 2026 SCA Sports. Made with{' '}
              <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />{' '}
              for student athletes.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Designed by <span className="text-gray-400 font-medium">Dynamic Odyssey</span>
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-gray-400 hover:text-accent transition-colors">
              About
            </a>
            <a href="#training" className="text-sm text-gray-400 hover:text-accent transition-colors">
              Training
            </a>
            <a href="#register" className="text-sm text-gray-400 hover:text-accent transition-colors">
              Register
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
