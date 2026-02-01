import useAuth from '@/hooks/useAuth'
import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'
import MainAppHeader from '@/shared/components/MainAppHeader'
import { SocialProviders } from '@/shared/types/auth'
import { Button } from '@/shared/ui'
import { showToastError } from '@/shared/utils/showToastError'
import { LoaderIcon } from 'lucide-react'
import { Fragment, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Auth() {
  const { isAuthenticated, socialSignIn } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState<SocialProviders | null>(
    null
  )

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  const handleClick = async (type: SocialProviders) => {
    setLoadingButton(type)
    setIsLoading(true)

    try {
      await socialSignIn(type)
    } catch {
      setIsLoading(false)
      setLoadingButton(null)

      showToastError()
    }
  }

  return (
    <Fragment>
      <section className='flex flex-col items-center justify-center py-32'>
        <MainAppHeader />

        <Button
          className='flex gap-2 my-1'
          title='Sign in with GitHub'
          onClick={() => handleClick('github')}
          disabled={isLoading}
        >
          {isLoading && loadingButton === 'github' ? (
            <LoaderIcon className='transition-all duration-300 animate-spin' />
          ) : (
            <GitHubIcon className='size-6' />
          )}
          <span className='sr-only'>Sign in with GitHub</span>
          Sign in with GitHub
        </Button>

        <Button
          className='flex gap-2 my-1'
          title='Sign in with Google'
          onClick={() => handleClick('google')}
          disabled={isLoading}
        >
          {isLoading && loadingButton === 'google' ? (
            <LoaderIcon className='transition-all duration-300 animate-spin' />
          ) : (
            <GoogleIcon className='size-6' />
          )}
          <span className='sr-only'>Sign in with Google</span>
          Sign in with Google
        </Button>
      </section>
    </Fragment>
  )
}
