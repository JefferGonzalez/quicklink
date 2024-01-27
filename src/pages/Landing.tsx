import Layout from '@/components/Layout'
import MainAppHeader from '@/components/MainAppHeader'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext'
import { RocketIcon, StarIcon } from 'lucide-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export default function Landing(): JSX.Element {
  const { isAuthenticated } = useContext(AuthContext)

  const to = isAuthenticated ? '/dashboard' : '/getting-started'

  return (
    <Layout>
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
          <Button title='Star on GitHub' className='flex gap-1'>
            <StarIcon />
            <span className='sr-only'>Star on GitHub</span>
            Star on GitHub
          </Button>
        </div>
      </section>
    </Layout>
  )
}
