import { getUser, signOut } from '@/services/User'
import { User } from '@/types'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
  isAuthenticated: boolean
  isSessionLoading: boolean
  user?: User
  setIsSessionLoading: (value: boolean) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isSessionLoading: false,
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
  const [isSessionLoading, setIsSessionLoading] = useState(false)
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const loadSession = async () => {
      const response = await getUser()

      if (!response.ok) {
        if (response.status === 401) logout()
        setIsSessionLoading(false)
        return
      }

      const { data }: { data: User } = await response.json()

      window.localStorage.setItem('session', JSON.stringify(data))

      setUser(data)
      setIsAuthenticated(true)
      setIsSessionLoading(false)
    }

    setIsSessionLoading(true)

    const session = window.localStorage.getItem('session')

    if (session) {
      const user = JSON.parse(session)

      setUser(user)
      setIsAuthenticated(true)
      setIsSessionLoading(false)
    } else {
      loadSession()
    }
  }, [])

  const logout = async () => {
    isAuthenticated && (await signOut())

    window.localStorage.removeItem('session')

    setIsAuthenticated(false)
    setUser(undefined)

    isAuthenticated && navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
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
