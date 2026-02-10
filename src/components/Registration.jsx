import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ClipboardList, ExternalLink, DollarSign, FileText, Wallet, MapPin, Mail, Phone } from 'lucide-react'
import ParticleCanvas from './ParticleCanvas'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/your-form-id/viewform'

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Registration() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="register" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900" />

      {/* Subtle particle canvas */}
      <ParticleCanvas particleCount={40} color="59,130,246" className="opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
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
            Registration
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Secure Your{' '}
            <span className="gradient-text">Spot</span>
          </h2>
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-accent to-accent-light origin-left"
          />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg sm:text-xl">
            Registration is quick and easy through our Google Form. Don't miss out — sign up today!
          </p>
        </motion.div>

        {/* Registration card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Animated gradient border */}
            <div className="absolute -inset-[2px] rounded-3xl animated-border-gradient opacity-70" />
            {/* Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 via-blue-500/10 to-accent/20 rounded-3xl blur-2xl opacity-40 animate-pulse-glow" />

            <div className="relative rounded-2xl bg-navy-700/70 backdrop-blur-md overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-accent via-accent-light to-accent animated-bar" />

              <div className="p-8 sm:p-10 lg:p-14">
                {/* Icon header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                    <ClipboardList className="w-8 h-8 text-navy-900" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold">How to Register</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Complete the form to secure your spot</p>
                  </div>
                </div>

                {/* Steps — staggered reveal */}
                <div className="space-y-4 mb-8">
                  {[
                    {
                      num: '1',
                      title: 'Fill Out the Google Form',
                      desc: 'Click the button below to open the registration form. Provide your name, school, age group, and events you\'d like to participate in.',
                    },
                    {
                      num: '2',
                      title: 'Pay the Entry Fee (if applicable)',
                      desc: null, // custom content below
                    },
                    {
                      num: '3',
                      title: 'Show Up & Compete',
                      desc: 'Arrive at Vineta South Athletics Stadium on March 7th, ready to give it your all!',
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={step.num}
                      custom={i}
                      variants={stepVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover={{ x: 6, transition: { duration: 0.15 } }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/50 border border-white/5 hover:border-accent/20 transition-colors duration-300 cursor-default"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-accent">{step.num}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">{step.title}</p>
                        {step.desc ? (
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        ) : (
                          <p className="text-gray-400 text-sm">
                            Outside parties and visitors pay an entry fee of{' '}
                            <span className="text-accent font-extrabold text-base">N$20 per person</span>.
                            SCA students register for free.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Fee highlight */}
                <div className="rounded-2xl bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border-2 border-accent/40 p-8 mb-10 text-center">
                  <p className="text-sm sm:text-base font-semibold text-accent uppercase tracking-widest mb-3">Entry Fee</p>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <DollarSign className="w-9 h-9 text-accent" />
                    <span className="text-6xl sm:text-7xl font-black gradient-text">N$20</span>
                  </div>
                  <p className="text-lg font-semibold text-white mb-1.5">per person</p>
                  <p className="text-sm sm:text-base text-gray-400">
                    For outside parties &amp; visitors. SCA students participate <span className="text-accent font-bold">free of charge</span>.
                  </p>
                </div>

                {/* Payment methods */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-4 mb-8"
                >
                  <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider text-center">Payment Options</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Digital wallets */}
                    <motion.div
                      whileHover={{ y: -3, transition: { duration: 0.15 } }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/50 border border-white/5 hover:border-accent/20 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Wallet className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Mobile Wallets</p>
                        <ul className="text-gray-400 text-sm space-y-0.5">
                          <li>• E-Wallet</li>
                          <li>• Blue-Wallet</li>
                          <li>• Mobi-Wallet</li>
                          <li>• Send Money</li>
                        </ul>
                      </div>
                    </motion.div>

                    {/* In-person */}
                    <motion.div
                      whileHover={{ y: -3, transition: { duration: 0.15 } }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-navy-900/50 border border-white/5 hover:border-blue-500/20 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Pay at the School Office</p>
                        <p className="text-gray-400 text-sm">
                          137 Anton Lubowski Ave,<br />
                          Kramersdorf, Swakopmund
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Contact / Questions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="rounded-xl bg-navy-900/50 border border-white/5 p-5 mb-8 text-center"
                >
                  <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Have Questions?</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="mailto:school.office@swakopca.edu.na"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">school.office@swakopca.edu.na</span>
                    </a>
                    <span className="hidden sm:inline text-gray-600">|</span>
                    <a
                      href="tel:+26464404605"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">+264 64 404 605</span>
                    </a>
                  </div>
                </motion.div>

                {/* CTA Button with pulse glow */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-dark rounded-xl blur-md opacity-40 animate-pulse-glow" />
                  <motion.a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center justify-center gap-3 w-full py-5 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-navy-900 font-bold text-lg sm:text-xl hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Shimmer sweep */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    <FileText className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Go to Registration Form</span>
                    <ExternalLink className="w-4 h-4 relative z-10" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
