import { useRef, useEffect, useCallback } from 'react'

/**
 * Sports-themed floating icons canvas.
 * Draws athletics equipment (shoes, medals, stopwatches, hurdles, etc.)
 * that gently drift, rotate, and bob around the hero section.
 */

// SVG path drawers for each icon — drawn relative to (0,0) at ~24×24 size
const drawRunningShoe = (ctx, s) => {
  ctx.scale(s, s)
  ctx.beginPath()
  ctx.moveTo(2, 16)
  ctx.quadraticCurveTo(2, 10, 8, 8)
  ctx.lineTo(14, 6)
  ctx.quadraticCurveTo(20, 5, 22, 8)
  ctx.lineTo(23, 12)
  ctx.lineTo(22, 16)
  ctx.quadraticCurveTo(20, 18, 16, 18)
  ctx.lineTo(4, 18)
  ctx.quadraticCurveTo(2, 18, 2, 16)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Sole detail
  ctx.beginPath()
  ctx.moveTo(4, 16)
  ctx.lineTo(20, 16)
  ctx.stroke()
  // Lace
  ctx.beginPath()
  ctx.moveTo(10, 8)
  ctx.lineTo(12, 11)
  ctx.lineTo(14, 8)
  ctx.stroke()
}

const drawMedal = (ctx, s) => {
  ctx.scale(s, s)
  // Ribbon
  ctx.beginPath()
  ctx.moveTo(9, 0)
  ctx.lineTo(7, 9)
  ctx.lineTo(12, 7)
  ctx.lineTo(17, 9)
  ctx.lineTo(15, 0)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Circle
  ctx.beginPath()
  ctx.arc(12, 15, 7, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  // Star
  ctx.beginPath()
  ctx.moveTo(12, 10)
  ctx.lineTo(13.5, 13)
  ctx.lineTo(17, 13.5)
  ctx.lineTo(14.5, 15.5)
  ctx.lineTo(15.5, 19)
  ctx.lineTo(12, 17)
  ctx.lineTo(8.5, 19)
  ctx.lineTo(9.5, 15.5)
  ctx.lineTo(7, 13.5)
  ctx.lineTo(10.5, 13)
  ctx.closePath()
  ctx.fill()
}

const drawStopwatch = (ctx, s) => {
  ctx.scale(s, s)
  // Button top
  ctx.beginPath()
  ctx.roundRect(10, 0, 4, 4, 1)
  ctx.fill()
  ctx.stroke()
  // Body
  ctx.beginPath()
  ctx.arc(12, 14, 9, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  // Inner face
  ctx.beginPath()
  ctx.arc(12, 14, 6.5, 0, Math.PI * 2)
  ctx.stroke()
  // Hands
  ctx.beginPath()
  ctx.moveTo(12, 14)
  ctx.lineTo(12, 9)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(12, 14)
  ctx.lineTo(16, 14)
  ctx.stroke()
}

const drawHurdle = (ctx, s) => {
  ctx.scale(s, s)
  // Top bar
  ctx.beginPath()
  ctx.roundRect(2, 8, 20, 3, 1)
  ctx.fill()
  ctx.stroke()
  // Left leg
  ctx.beginPath()
  ctx.moveTo(5, 11)
  ctx.lineTo(4, 22)
  ctx.lineTo(7, 22)
  ctx.lineTo(7, 11)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Right leg
  ctx.beginPath()
  ctx.moveTo(17, 11)
  ctx.lineTo(16, 22)
  ctx.lineTo(19, 22)
  ctx.lineTo(20, 11)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

const drawDiscus = (ctx, s) => {
  ctx.scale(s, s)
  ctx.beginPath()
  ctx.ellipse(12, 12, 10, 7, -0.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  // Inner ring
  ctx.beginPath()
  ctx.ellipse(12, 12, 6, 4, -0.3, 0, Math.PI * 2)
  ctx.stroke()
}

const drawTrophy = (ctx, s) => {
  ctx.scale(s, s)
  // Cup
  ctx.beginPath()
  ctx.moveTo(6, 2)
  ctx.lineTo(18, 2)
  ctx.quadraticCurveTo(18, 12, 12, 14)
  ctx.quadraticCurveTo(6, 12, 6, 2)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Handles
  ctx.beginPath()
  ctx.moveTo(6, 4)
  ctx.quadraticCurveTo(2, 4, 2, 8)
  ctx.quadraticCurveTo(2, 11, 6, 10)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(18, 4)
  ctx.quadraticCurveTo(22, 4, 22, 8)
  ctx.quadraticCurveTo(22, 11, 18, 10)
  ctx.stroke()
  // Stem
  ctx.beginPath()
  ctx.roundRect(10, 14, 4, 4, 0.5)
  ctx.fill()
  ctx.stroke()
  // Base
  ctx.beginPath()
  ctx.roundRect(7, 18, 10, 3, 1)
  ctx.fill()
  ctx.stroke()
}

const drawWhistle = (ctx, s) => {
  ctx.scale(s, s)
  // Body
  ctx.beginPath()
  ctx.moveTo(4, 10)
  ctx.quadraticCurveTo(4, 6, 10, 6)
  ctx.lineTo(20, 8)
  ctx.quadraticCurveTo(23, 10, 22, 14)
  ctx.quadraticCurveTo(20, 18, 14, 16)
  ctx.lineTo(6, 14)
  ctx.quadraticCurveTo(4, 14, 4, 10)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Mouthpiece
  ctx.beginPath()
  ctx.roundRect(1, 8, 5, 4, 1)
  ctx.fill()
  ctx.stroke()
  // Sound lines
  ctx.beginPath()
  ctx.moveTo(20, 6)
  ctx.lineTo(22, 3)
  ctx.moveTo(22, 7)
  ctx.lineTo(24, 5)
  ctx.stroke()
}

const iconDrawers = [
  drawRunningShoe,
  drawMedal,
  drawStopwatch,
  drawHurdle,
  drawDiscus,
  drawTrophy,
  drawWhistle,
]

export default function SportsParticles({ className = '', count = 28 }) {
  const canvasRef = useRef(null)
  const animId = useRef(null)
  const items = useRef([])

  const initItems = useCallback((w, h) => {
    items.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      scale: Math.random() * 0.6 + 0.7,       // 0.7 – 1.3
      alpha: Math.random() * 0.12 + 0.06,      // 0.06 – 0.18 (subtle)
      iconIdx: Math.floor(Math.random() * iconDrawers.length),
      bobPhase: Math.random() * Math.PI * 2,
      bobAmp: Math.random() * 0.3 + 0.15,
    }))
  }, [count])

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initItems(rect.width, rect.height)
    }

    resize()
    window.addEventListener('resize', resize)

    let time = 0
    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)
      time += 0.016

      for (const item of items.current) {
        // Bob motion
        const bob = Math.sin(time * 1.2 + item.bobPhase) * item.bobAmp

        // Move
        item.x += item.vx
        item.y += item.vy + bob * 0.15
        item.rotation += item.rotSpeed

        // Wrap edges
        if (item.x < -30) item.x = w + 30
        if (item.x > w + 30) item.x = -30
        if (item.y < -30) item.y = h + 30
        if (item.y > h + 30) item.y = -30

        // Draw
        ctx.save()
        ctx.translate(item.x, item.y)
        ctx.rotate(item.rotation)
        ctx.translate(-12 * item.scale, -12 * item.scale)
        ctx.globalAlpha = item.alpha
        ctx.fillStyle = 'rgba(245, 158, 11, 0.7)'
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)'
        ctx.lineWidth = 0.8 / item.scale
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'

        iconDrawers[item.iconIdx](ctx, item.scale)

        ctx.restore()
      }

      animId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId.current)
      window.removeEventListener('resize', resize)
    }
  }, [initItems])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  )
}
