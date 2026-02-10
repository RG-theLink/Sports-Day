import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Flame } from 'lucide-react'
import SportsParticles from './SportsParticles'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return timeLeft
}

/* ---- Flip-style countdown unit ---- */
function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ perspective: '500px' }}>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-navy-700/80 border border-white/10 flex items-center justify-center backdrop-blur-sm overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="text-2xl sm:text-3xl font-bold tabular-nums text-white block"
            >
              {String(value).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          {/* Sheen line across middle */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/5" />
        </div>
        {/* Subtle glow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-accent/10 rounded-full blur-lg" />
      </div>
      <span className="mt-3 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  )
}

/* ---- Letter-by-letter staggered headline ---- */
function AnimatedHeadline({ text, highlight, suffix }) {
  const letters = text.split('')
  const hlLetters = highlight.split('')
  const sfxLetters = suffix.split('')

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
    >
      {letters.map((ch, i) => (
        <motion.span
          key={`t-${i}`}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.35, delay: 0.15 + i * 0.025 }}
        >
          {ch}
        </motion.span>
      ))}
      {hlLetters.map((ch, i) => (
        <motion.span
          key={`h-${i}`}
          className="gradient-text"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.35, delay: 0.15 + (letters.length + i) * 0.025 }}
        >
          {ch}
        </motion.span>
      ))}
      {sfxLetters.map((ch, i) => (
        <motion.span
          key={`s-${i}`}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.35, delay: 0.15 + (letters.length + hlLetters.length + i) * 0.025 }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.h1>
  )
}

/* ---- Magnetic CTA button ---- */
function MagneticButton({ children, href }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({ x: (e.clientX - cx) * 0.15, y: (e.clientY - cy) * 0.15 })
  }
  const handleLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-navy-900 font-bold text-lg shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-shadow duration-300 relative overflow-hidden group"
    >
      {/* Shimmer sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  )
}

/* ==================== HERO ==================== */
export default function Hero() {
  const timeLeft = useCountdown('2026-03-07T08:00:00')
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      {/* Floating sports equipment icons */}
      <SportsParticles count={30} />

      {/* Content with scroll fade */}
      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
        >
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
            <Flame className="w-4 h-4 text-accent" />
          </motion.div>
          <span className="text-sm font-semibold text-accent">7 March 2026 • Vineta South Athletics Stadium</span>
        </motion.div>

        {/* Animated headline */}
        <AnimatedHeadline text="SCA School " highlight="Athletics" suffix=" 2026" />

        {/* Sub-headline with shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium shimmer-text"
        >
          Unleash Your Potential on the Track.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-12"
        >
          <CountdownUnit value={timeLeft.days} label="Days" />
          <span className="text-2xl text-gray-600 font-light mt-[-1.5rem]">:</span>
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <span className="text-2xl text-gray-600 font-light mt-[-1.5rem]">:</span>
          <CountdownUnit value={timeLeft.minutes} label="Min" />
          <span className="text-2xl text-gray-600 font-light mt-[-1.5rem]">:</span>
          <CountdownUnit value={timeLeft.seconds} label="Sec" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <MagneticButton href="#register">Sign Up Now</MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <a href="#about" className="text-gray-500 hover:text-accent transition-colors">
              <ChevronDown className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
