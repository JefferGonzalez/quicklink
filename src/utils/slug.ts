export const RandomSlug = (): string => {
  return Date.now().toString(36).slice(4)
}
