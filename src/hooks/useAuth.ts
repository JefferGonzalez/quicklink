import { User } from '@/types'
import { useState } from 'react'

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSessionLoading, setIsSessionLoading] = useState(false)
  const [user, setUser] = useState<User | undefined>()

  const destroySession = () => {
    setIsAuthenticated(false)
    setUser(undefined)
  }

  const setSession = (user: User) => {
    setIsAuthenticated(true)
    setUser(user)
  }

  return {
    user,
    isAuthenticated,
    isSessionLoading,
    setSession,
    destroySession,
    setIsSessionLoading
  }
}
