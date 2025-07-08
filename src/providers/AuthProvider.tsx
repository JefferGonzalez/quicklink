import { AuthContext } from '@/context/AuthContext'
import { UserEntity } from '@/modules/user/entities/User'
import { loadUserProfile, signOut } from '@/modules/user/use-cases'
import { HttpStatus } from '@/shared/constants/httpStatus'
import { showToastError } from '@/shared/utils/showToastError'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const [user, setUser] = useState<UserEntity | undefined>()

  const destroySession = () => {
    setIsAuthenticated(false)
    setUser(undefined)
  }

  const setSession = (user: UserEntity) => {
    setIsAuthenticated(true)
    setUser(user)
  }

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await loadUserProfile()

        if (!response.ok) {
          const { status } = response

          if (status === HttpStatus.Unauthorized) return logout()
          if (status === HttpStatus.NotFound) {
            await signOut()
          }

          return
        }

        setSession(response.data)
      } catch {
        showToastError()
      } finally {
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
