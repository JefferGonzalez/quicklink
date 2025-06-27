import { User } from '@/modules/user/entities/User'
import { createContext } from 'react'

interface AuthContextProps {
  user: User | undefined
  isSessionLoading: boolean
  isAuthenticated: boolean
  setIsSessionLoading: (value: boolean) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  isSessionLoading: false,
  isAuthenticated: false,
  setIsSessionLoading: () => {},
  logout: () => {}
})
