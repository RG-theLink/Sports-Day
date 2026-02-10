import { motion } from 'framer-motion'
import { Heart, Mail, Phone } from 'lucide-react'
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
          className="flex flex-col gap-10"
        >
          {/* Top row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
            {/* Logo & tagline */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex items-center gap-2.5">
                <Logo size={36} />
                <span className="text-lg sm:text-xl font-bold">
                  SCA <span className="text-accent">Sports</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm">Empowering student athletes.</p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Quick Links</p>
              <a href="#about" className="text-sm text-gray-400 hover:text-accent transition-colors">About</a>
              <a href="#training" className="text-sm text-gray-400 hover:text-accent transition-colors">Training</a>
              <a href="#register" className="text-sm text-gray-400 hover:text-accent transition-colors">Register</a>
              <a href="#events" className="text-sm text-gray-400 hover:text-accent transition-colors">Events</a>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Contact Us</p>
              <a
                href="mailto:school.office@swakopca.edu.na"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                school.office@swakopca.edu.na
              </a>
              <a
                href="tel:+26464404605"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +264 64 404 605
              </a>
              <p className="text-sm text-gray-500">
                137 Anton Lubowski Ave,<br />Kramersdorf, Swakopmund
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © 2026 SCA Sports. Made with{' '}
              <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />{' '}
              for student athletes.
            </p>
            <p className="text-gray-600 text-xs">
              Designed by <span className="text-gray-400 font-medium">Dynamic Odyssey</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
