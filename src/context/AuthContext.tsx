import useAuth from '@/hooks/useAuth'
import { getUser, signOut } from '@/services/User'
import { User } from '@/types'
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

  const { setSession, destroySession, isAuthenticated, setIsSessionLoading } =
    auth

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

      setSession(data)
      setIsSessionLoading(false)
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

  const logout = async () => {
    isAuthenticated && (await signOut())

    window.localStorage.removeItem('session')

    destroySession()

    isAuthenticated && navigate('/')
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
