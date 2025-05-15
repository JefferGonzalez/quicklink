import MainAppHeader from '@/components/MainAppHeader'
import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth'
import { RocketIcon, StarIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Landing(): JSX.Element {
  const { isAuthenticated } = useAuth()

  const to = isAuthenticated ? '/dashboard' : '/getting-started'

  return (
    <Fragment>
      <section className='flex flex-col items-center justify-center py-32'>
        <MainAppHeader />

        <div className='flex gap-2'>
          <Link to={to} title='Getting Started'>
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
