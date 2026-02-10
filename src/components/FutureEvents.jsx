import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Trophy, Target } from 'lucide-react'

const upcoming = [
  {
    icon: Trophy,
    name: 'Soccer Tournament',
    status: 'Coming Soon',
    color: 'from-emerald-500 to-emerald-600',
    float: { y: [0, -8, 0], rotate: [0, 3, -3, 0] },
  },
  {
    icon: Target,
    name: 'Netball Tournament',
    status: 'Coming Soon',
    color: 'from-pink-500 to-pink-600',
    float: { y: [0, -6, 0], rotate: [0, -3, 3, 0] },
  },
]

export default function FutureEvents() {
  const headingRef = useRef(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section id="events" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-navy-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'backOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4 tracking-wide uppercase"
          >
            <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}>
              <Sparkles className="w-4 h-4" />
            </motion.div>
            What's Next
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            More Events{' '}
            <span className="gradient-text">Coming Soon</span>
          </h2>
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-accent to-accent-light origin-center"
          />
          <p className="text-gray-400 max-w-xl mx-auto text-lg sm:text-xl">
            Athletics is just the beginning. Stay tuned for more exciting
            tournaments on the SCA Sports calendar.
          </p>
        </motion.div>

        {/* Event cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
          {upcoming.map((event, index) => {
            const Icon = event.icon
            return (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                className="group flex-1 w-full sm:w-auto rounded-2xl bg-navy-700/40 border border-white/5 hover:border-accent/20 p-8 sm:p-10 text-center transition-colors duration-300 relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Corner spotlight */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Floating icon */}
                  <motion.div
                    animate={event.float}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{event.name}</h3>
                  <span className="inline-block px-5 py-2 rounded-full bg-white/5 text-gray-400 text-sm sm:text-base font-medium shimmer-badge">
                    {event.status}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
