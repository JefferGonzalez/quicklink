import { AuthUser, SocialProviders } from '@/shared/types/auth'
import { createContext } from 'react'

interface AuthContextProps {
  user: AuthUser | undefined
  isSessionLoading: boolean
  isAuthenticated: boolean
  socialSignIn: (type: SocialProviders) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  isSessionLoading: false,
  isAuthenticated: false,
  socialSignIn: async () => {},
  signOut: async () => {}
})
