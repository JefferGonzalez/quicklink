import { Theme, ThemeContext } from '@/context/ThemeContext'
import { PropsWithChildren, useEffect, useState } from 'react'

interface Props extends PropsWithChildren {
  defaultTheme?: Theme
  storageKey?: string
}

export default function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: Props) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = isDark ? 'dark' : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const toggleTheme = (theme: Theme) => {
    localStorage.setItem(storageKey, theme)
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider
      {...props}
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
