import { getUser, signOut } from '@/services/User'
import { User } from '@/types'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
  isAuthenticated: boolean
  isSessionLoading: boolean
  token?: string
  user?: User
  setIsSessionLoading: (value: boolean) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isSessionLoading: false,
  token: undefined,
  user: undefined,
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

  const [token, setToken] = useState<string | undefined>()
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const loadSession = async () => {
      setIsSessionLoading(true)
      const response = await getUser()

      if (!response.ok) {
        if (response.status === 401) logout()
        setIsSessionLoading(false)
        return
      }

      const { data }: { data: User } = await response.json()

      setUser(data)
      setToken(token)
      setIsAuthenticated(true)
      setIsSessionLoading(false)
    }
    loadSession()
  }, [])

  const logout = async () => {
    await signOut()

    setIsAuthenticated(false)
    setToken(undefined)
    setUser(undefined)

    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isSessionLoading,
        isAuthenticated,
        setIsSessionLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
