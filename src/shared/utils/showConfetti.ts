export const showConfetti = async () => {
  const { default: confetti } = await import('canvas-confetti')

  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  })
}
