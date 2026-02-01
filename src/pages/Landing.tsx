import useAuth from '@/hooks/useAuth'
import MainAppHeader from '@/shared/components/MainAppHeader'
import { Button } from '@/shared/ui'
import { RocketIcon, StarIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'

export default function Landing() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  return (
    <Fragment>
      <section className='flex flex-col items-center justify-center py-32'>
        <MainAppHeader />

        <div className='flex gap-2'>
          <Link to='/getting-started' title='Getting Started'>
            <Button className='flex gap-1'>
              <RocketIcon />
              <span className='sr-only'>Getting Started</span>
              Getting Started
            </Button>
          </Link>
          <Button
            title='Star on GitHub'
            className='flex gap-1'
            onClick={() =>
              window.open(
                'https://github.com/JefferGonzalez/quicklink',
                '_blank',
                'noopener noreferrer'
              )
            }
          >
            <StarIcon />
            <span className='sr-only'>Star on GitHub</span>
            Star on GitHub
          </Button>
        </div>
      </section>
    </Fragment>
  )
}
