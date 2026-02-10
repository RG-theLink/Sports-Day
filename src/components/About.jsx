import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'

const details = [
  {
    icon: CalendarDays,
    title: 'Date',
    value: '7th March 2026',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Clock,
    title: 'Time',
    value: '08:00 – 17:00',
    color: 'from-accent to-accent-dark',
  },
  {
    icon: MapPin,
    title: 'Venue',
    value: 'Vineta South Athletics Stadium',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Users,
    title: 'Open To',
    value: 'All schools, age groups & parents',
    color: 'from-purple-500 to-purple-600',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ---- 3D tilt card ---- */
function TiltCard({ children, className }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('perspective(600px) rotateX(0deg) rotateY(0deg)')

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8
    setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`)
  }

  const handleLeave = () => {
    setTransform('perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transition: 'transform 0.2s ease-out' }}
      className={className}
    >
      {children}
    </div>
  )
}

export default function About() {
  const headingRef = useRef(null)
  const isInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Section bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'backOut' }}
            className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4 tracking-wide uppercase"
          >
            About the Event
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Know</span>
          </h2>
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-accent to-accent-light origin-left"
          />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            The SCA School Athletics 2026 invites students from all schools and age groups
            to compete — plus an <strong className="text-white font-semibold">"Open Age"</strong> category
            for parents who want to join the action.
          </p>
        </motion.div>

        {/* Info cards with 3D tilt */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {details.map((item) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title} variants={cardVariants}>
                <TiltCard className="group relative rounded-2xl bg-navy-700/40 border border-white/5 p-6 hover:border-accent/30 transition-colors duration-300 overflow-hidden h-full">
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Spotlight effect */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">{item.title}</p>
                    <p className="text-lg font-bold text-white">{item.value}</p>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
