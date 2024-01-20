export const RandomSlug = (): string => {
  return (+new Date()).toString(32).slice(-6)
}
