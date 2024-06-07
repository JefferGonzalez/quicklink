import { useEffect, useRef, useState } from 'react'

export default function Waves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState<{
    width: number
    height: number
  }>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const colors = [
    { start: 'rgba(74, 222, 128, 0.1)', end: 'rgba(59, 130, 246, 0.1)' },
    { start: 'rgba(59, 130, 246, 0.1)', end: 'rgba(74, 222, 128, 0.1)' },
    { start: 'rgba(74, 222, 128, 0.3)', end: 'rgba(59, 130, 246, 0.3)' },
    { start: 'rgba(74, 222, 128, 1)', end: 'rgba(59, 130, 246, 1)' }
  ]

  const waveParams = [
    { amplitude: 100, frequency: 0.015, phase: 0 },
    { amplitude: 150, frequency: 0.02, phase: Math.PI / 4 },
    { amplitude: 200, frequency: 0.025, phase: Math.PI / 2 },
    { amplitude: 250, frequency: 0.03, phase: (3 * Math.PI) / 4 }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (ctx) {
      const drawWave = () => {
        if (!canvas) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const halfHeight = canvas.height / 2

        waveParams.forEach((wave, idx) => {
          const gradient = ctx.createLinearGradient(
            0,
            halfHeight - wave.amplitude,
            0,
            halfHeight + wave.amplitude
          )
          gradient.addColorStop(0, colors[idx].start)
          gradient.addColorStop(1, colors[idx].end)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 5 + idx * 2
          ctx.globalAlpha = 1 - idx * 0.3

          ctx.beginPath()
          for (let x = 0; x < canvas.width; x++) {
            const time = window.performance.now() * 0.002
            const wavePosition = wave.frequency * x + wave.phase
            const waveHeight = wave.amplitude * Math.sin(wavePosition + time)

            const y = halfHeight + waveHeight

            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()

          ctx.beginPath()
          for (let x = 0; x < canvas.width; x++) {
            const time = window.performance.now() * 0.002
            const wavePosition = wave.frequency * x + wave.phase
            const waveHeight = wave.amplitude * Math.cos(wavePosition + time)

            const y = halfHeight + waveHeight
            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()
        })

        window.requestAnimationFrame(drawWave)
      }

      drawWave()

      const resizeHandler = () => {
        setCanvasSize({ width: window.innerWidth, height: window.innerHeight })
      }

      window.addEventListener('resize', resizeHandler)

      return () => {
        window.removeEventListener('resize', resizeHandler)
      }
    }
  }, [colors, waveParams])

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      className='absolute top-0 left-0 z-[-1]'
    />
  )
}
