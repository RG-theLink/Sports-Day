import { useRef, useEffect } from 'react'

/**
 * Animated running-track lanes that scroll horizontally with
 * dashed lane markers and speed-blur streaks. Fully interactive —
 * mouse X position controls the lane speed.
 */
export default function TrackCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const animId = useRef(null)
  const mouseX = useRef(0.5) // normalised 0..1

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let offset = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX.current = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)

    const laneCount = 6
    const laneColors = [
      'rgba(245,158,11,0.08)',
      'rgba(245,158,11,0.04)',
      'rgba(59,130,246,0.06)',
      'rgba(245,158,11,0.04)',
      'rgba(59,130,246,0.08)',
      'rgba(245,158,11,0.04)',
    ]

    // Speed streaks
    const streaks = Array.from({ length: 18 }, () => ({
      x: Math.random() * 2000,
      y: 0,
      lane: Math.floor(Math.random() * laneCount),
      len: Math.random() * 80 + 40,
      speed: Math.random() * 2 + 1.5,
      alpha: Math.random() * 0.12 + 0.03,
    }))

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const speed = 0.6 + mouseX.current * 2.0
      offset += speed
      const laneH = h / laneCount

      // Draw lanes
      for (let i = 0; i < laneCount; i++) {
        const y = i * laneH
        ctx.fillStyle = laneColors[i % laneColors.length]
        ctx.fillRect(0, y, w, laneH)

        // Lane divider — dashed line
        if (i > 0) {
          ctx.beginPath()
          ctx.setLineDash([20, 30])
          ctx.lineDashOffset = -offset * (0.8 + i * 0.1)
          ctx.moveTo(0, y)
          ctx.lineTo(w, y)
          ctx.strokeStyle = 'rgba(255,255,255,0.06)'
          ctx.lineWidth = 1.5
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // Draw speed streaks
      for (const s of streaks) {
        s.x += s.speed * speed
        if (s.x > w + s.len) {
          s.x = -s.len - Math.random() * 200
        }
        const sy = s.lane * laneH + laneH / 2

        const grad = ctx.createLinearGradient(s.x, sy, s.x + s.len, sy)
        grad.addColorStop(0, `rgba(245,158,11,0)`)
        grad.addColorStop(0.5, `rgba(245,158,11,${s.alpha})`)
        grad.addColorStop(1, `rgba(245,158,11,0)`)

        ctx.beginPath()
        ctx.moveTo(s.x, sy)
        ctx.lineTo(s.x + s.len, sy)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.stroke()
      }

      animId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
    />
  )
}
