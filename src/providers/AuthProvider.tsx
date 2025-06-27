import { AuthContext } from '@/context/AuthContext'
import { User } from '@/modules/user/entities/User'
import { getUser, signOut } from '@/modules/user/services/User'
import { showToastError } from '@/shared/utils/showToastError'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const [user, setUser] = useState<User | undefined>()

  const destroySession = () => {
    setIsAuthenticated(false)
    setUser(undefined)
  }

  const setSession = (user: User) => {
    setIsAuthenticated(true)
    setUser(user)
  }

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await getUser()

        if (!response.ok) {
          const statusCode = response.status

          if (statusCode === 401) logout()

          if (statusCode === 404) await signOut()

          setIsSessionLoading(false)
          return
        }

        const { data }: { data: User } = await response.json()

        setSession(data)
        setIsSessionLoading(false)
      } catch {
        setIsSessionLoading(false)
      }
    }

    loadSession()
  }, [])

  const logout = async () => {
    try {
      if (isAuthenticated) {
        await signOut()
      }

      destroySession()

      if (isAuthenticated) {
        navigate('/')
      }
    } catch {
      showToastError()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isSessionLoading,
        setIsSessionLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
