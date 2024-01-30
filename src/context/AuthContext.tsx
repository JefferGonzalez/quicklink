import useAuth from '@/hooks/useAuth'
import { getUser, signOut } from '@/services/User'
import { User } from '@/types'
import { showToastError } from '@/utils/errors'
import { PropsWithChildren, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
  auth: ReturnType<typeof useAuth>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  auth: {
    user: undefined,
    isSessionLoading: false,
    isAuthenticated: false,
    setSession: () => {},
    destroySession: () => {},
    setIsSessionLoading: () => {}
  },
  logout: () => {}
})

interface AuthProviderProps extends PropsWithChildren {}

export default function AuthProvider({
  children
}: AuthProviderProps): JSX.Element {
  const navigate = useNavigate()

  const auth = useAuth()

  const {
    setSession,
    destroySession,
    isAuthenticated,
    setIsSessionLoading,
    user
  } = auth

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await getUser()

        if (!response.ok) {
          if (response.status === 401) logout()
          setIsSessionLoading(false)
          return
        }

        const { data }: { data: User } = await response.json()

        window.localStorage.setItem('session', JSON.stringify(data))

        setSession(data)
        setIsSessionLoading(false)
      } catch (error) {
        setIsSessionLoading(false)
      }
    }

    setIsSessionLoading(true)

    const session = window.localStorage.getItem('session')

    if (session) {
      const user = JSON.parse(session)

      setSession(user)
      setIsSessionLoading(false)
    } else {
      loadSession()
    }
  }, [])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'session') {
        const { newValue } = e

        if (newValue === null && isAuthenticated) {
          window.localStorage.setItem('session', JSON.stringify(user))
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [isAuthenticated, user])

  const logout = async () => {
    try {
      isAuthenticated && (await signOut())

      window.localStorage.removeItem('session')

      destroySession()

      isAuthenticated && navigate('/')
    } catch (error) {
      showToastError()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
