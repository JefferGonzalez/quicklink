import { AuthContext } from '@/context/AuthContext'
import { authClient } from '@/shared/lib/authClient'
import { SocialProviders } from '@/shared/types/auth'
import { showToastError } from '@/shared/utils/showToastError'
import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  const { data, isPending, isRefetching } = authClient.useSession()

  const user = data?.user
  const isAuthenticated = !!user
  const isSessionLoading = isPending || isRefetching

  const socialSignIn = async (type: SocialProviders) => {
    await authClient.signIn.social({
      provider: type,
      callbackURL: '/dashboard'
    })
  }

  const signOut = async () => {
    try {
      await authClient.signOut()

      navigate('/')
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
        socialSignIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
