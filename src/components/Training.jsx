import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Dumbbell, Calendar, Clock as ClockIcon, ArrowRight, Zap } from 'lucide-react'
import TrackCanvas from './TrackCanvas'

/* ---- Animated progress bar for visual flair ---- */
function AnimatedBar({ delay = 0, width = '75%', color = 'from-accent to-accent-light' }) {
  return (
    <div className="h-1.5 rounded-full bg-navy-900/60 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  )
}

export default function Training() {
  const listRef = useRef(null)
  const listInView = useInView(listRef, { once: true, margin: '-40px' })

  return (
    <section id="training" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Interactive Track Canvas background */}
      <div className="absolute inset-0 bg-navy-900" />
      <TrackCanvas className="opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: visual card */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-blue-500/20 rounded-3xl blur-2xl animate-pulse-glow" />
            <div className="relative rounded-2xl bg-gradient-to-br from-navy-700/90 to-navy-800/90 border border-white/10 p-8 sm:p-10 overflow-hidden backdrop-blur-sm">
              {/* Decorative circles */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center mb-6 shadow-lg shadow-accent/20"
                >
                  <Dumbbell className="w-8 h-8 text-navy-900" />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                  Get Ready for the{' '}
                  <span className="gradient-text">Big Day!</span>
                </h3>

                <p className="text-gray-400 text-lg mb-8">
                  Join our weekly training sessions to prepare for the Athletics event.
                  All skill levels are welcome — from first-timers to seasoned athletes.
                </p>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-navy-900/50 border border-white/5 hover:border-blue-500/20 transition-colors duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Day</p>
                      <p className="text-white font-bold">Every Wednesday</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-navy-900/50 border border-white/5 hover:border-accent/20 transition-colors duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Time</p>
                      <p className="text-white font-bold">16:00 – 17:00</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: motivation content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide uppercase"
            >
              <Zap className="w-3.5 h-3.5" />
              Training Schedule
            </motion.span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Prepare for{' '}
              <span className="gradient-text">the Big Day</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Our weekly practice sessions are all about getting students warmed up,
              familiar with the events, and ready to perform their best on Athletics day.
              No pressure — just preparation.
            </p>

            <ul ref={listRef} className="space-y-3">
              {[
                'Get familiar with the track and field events',
                'Build confidence before the competition',
                'Open to students of all ages',
                'Parents welcome in Open Age category',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={listInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
                    <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />
                  </motion.div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
