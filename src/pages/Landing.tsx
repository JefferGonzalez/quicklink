import Layout from '@/components/Layout'
import MainAppHeader from '@/components/MainAppHeader'
import { Button } from '@/components/ui/button'
import { RocketIcon, StarIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing(): JSX.Element {
  return (
    <Layout>
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
