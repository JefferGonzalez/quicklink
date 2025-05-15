import { getUser, signOut } from '@/services/User'
import { User } from '@/types'
import { showToastError } from '@/utils/errors'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

interface AuthProviderProps extends PropsWithChildren {}

export default function AuthProvider({
  children
}: AuthProviderProps): JSX.Element {
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
      } catch (error) {
        setIsSessionLoading(false)
      }
    }

    loadSession()
  }, [])

  const logout = async () => {
    try {
      isAuthenticated && (await signOut())

      destroySession()

      isAuthenticated && navigate('/')
    } catch (error) {
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
