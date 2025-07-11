import { createContext } from 'react'

export type Theme = 'dark' | 'light' | 'system'

interface ThemeContextProps {
  theme: Theme
  toggleTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'system',
  toggleTheme: () => null
})
