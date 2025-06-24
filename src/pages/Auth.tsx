import { API_URL } from '@/Config'
import MainAppHeader from '@/components/MainAppHeader'
import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth'
import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'
import { LoaderIcon } from 'lucide-react'
import { Fragment, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Auth() {
  const { isAuthenticated, isSessionLoading, setIsSessionLoading } = useAuth()

  const [loadingButton, setLoadingButton] = useState<
    'github' | 'google' | null
  >(null)

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  const handleClick = (type: 'github' | 'google') => {
    setLoadingButton(type)
    setIsSessionLoading(true)

    window.location.href = `${API_URL}/auth/${type}`
  }

  return (
    <Fragment>
      <section className='flex flex-col items-center justify-center py-32'>
        <MainAppHeader />

        <Button
          className='flex gap-2 my-1'
          title='Sign in with GitHub'
          onClick={() => handleClick('github')}
          disabled={isSessionLoading}
        >
          {isSessionLoading &&
          (loadingButton === 'github' || loadingButton === null) ? (
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
          disabled={isSessionLoading}
        >
          {isSessionLoading &&
          (loadingButton === 'google' || loadingButton === null) ? (
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
