import { useRef, useEffect, useCallback } from 'react'

/**
 * Interactive particle canvas — dots float, connect when near each other,
 * and repel away from the mouse cursor for a living, reactive feel.
 */
export default function ParticleCanvas({ className = '', particleCount = 80, color = '245,158,11' }) {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const animId = useRef(null)
  const particles = useRef([])

  const initParticles = useCallback((w, h) => {
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.5 + 0.3,
    }))
  }, [particleCount])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
      initParticles(rect.width, rect.height)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const connectDist = 120
    const repelDist = 140
    const repelForce = 0.08

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const pts = particles.current
      const mx = mouse.current.x
      const my = mouse.current.y

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]

        // Repel from mouse
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < repelDist && dist > 0) {
          const force = (repelDist - dist) / repelDist * repelForce
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.baseAlpha})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const cdx = p.x - q.x
          const cdy = p.y - q.y
          const cd = Math.sqrt(cdx * cdx + cdy * cdy)
          if (cd < connectDist) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${color},${0.15 * (1 - cd / connectDist)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [color, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
    />
  )
}
