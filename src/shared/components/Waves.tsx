import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export default function Waves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef(0)

  const [canvasSize, setCanvasSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }))

  const colors = useMemo(
    () => [
      { start: 'rgba(74, 222, 128, 0.1)', end: 'rgba(59, 130, 246, 0.1)' },
      { start: 'rgba(59, 130, 246, 0.1)', end: 'rgba(74, 222, 128, 0.1)' },
      { start: 'rgba(74, 222, 128, 0.3)', end: 'rgba(59, 130, 246, 0.3)' },
      { start: 'rgba(74, 222, 128, 1)', end: 'rgba(59, 130, 246, 1)' }
    ],
    []
  )

  const waveParams = useMemo(
    () => [
      { amplitude: 100, frequency: 0.015, phase: 0 },
      { amplitude: 150, frequency: 0.02, phase: Math.PI / 4 },
      { amplitude: 200, frequency: 0.025, phase: Math.PI / 2 },
      { amplitude: 250, frequency: 0.03, phase: (3 * Math.PI) / 4 }
    ],
    []
  )

  const pixelRatio = useMemo(() => window.devicePixelRatio || 1, [])

  const [frameDelay, setFrameDelay] = useState(1)
  const frameCounter = useRef(0)

  const getCanvasVerticalCenter = useCallback(() => {
    if (!canvasRef.current) return 0

    return canvasRef.current.height / (2 * pixelRatio)
  }, [pixelRatio])

  const animate = useCallback(
    (time: number) => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!ctx) return

      frameCounter.current += 1
      if (frameCounter.current % frameDelay !== 0) {
        requestRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = time - previousTimeRef.current
      previousTimeRef.current = time

      if (deltaTime > 50) {
        setFrameDelay((prev) => Math.min(prev + 1, 3))
      } else if (deltaTime < 20 && frameDelay > 1) {
        setFrameDelay((prev) => Math.max(prev - 1, 1))
      }

      const halfHeight = getCanvasVerticalCenter()
      const timeOffset = time * 0.001

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const step = Math.max(1, Math.floor(canvas.width / 1000))
      const width = canvas.width

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
        for (let x = 0; x <= width; x += step) {
          const wavePosition = wave.frequency * x + wave.phase
          const waveHeight =
            wave.amplitude * Math.sin(wavePosition + timeOffset)

          const y = halfHeight + waveHeight

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()

        ctx.beginPath()
        for (let x = 0; x <= width; x += step) {
          const wavePosition = wave.frequency * x + wave.phase
          const waveHeight =
            wave.amplitude * Math.cos(wavePosition + timeOffset)

          const y = halfHeight + waveHeight
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      })

      requestRef.current = requestAnimationFrame(animate)
    },
    [colors, waveParams, frameDelay, getCanvasVerticalCenter]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvasSize.width * pixelRatio
    canvas.height = canvasSize.height * pixelRatio

    ctx.scale(pixelRatio, pixelRatio)

    canvas.style.width = `${canvasSize.width}px`
    canvas.style.height = `${canvasSize.height}px`

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate, canvasSize, pixelRatio])

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      setCanvasSize({
        width: newWidth,
        height: newHeight
      })
    }

    let resizeTimeout: NodeJS.Timeout | null = null
    const throttledResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null
          handleResize()
        }, 100)
      }
    }

    handleResize()

    window.addEventListener('resize', throttledResize)

    return () => {
      window.removeEventListener('resize', throttledResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='fixed top-0 left-0 w-full h-full z-[-1]'
    />
  )
}
