import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import LinkIcon from '@/icons/Link'
import { RocketIcon, StarIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing(): JSX.Element {
  return (
    <Layout>
      <section className='flex flex-col items-center justify-center py-32'>
        <header className='flex items-center gap-x-2'>
          <LinkIcon className='size-16' />
          <h1 className='text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-3'>
            Open Source URL Shortener
          </h1>
        </header>
        <span className='text-lg text-neutral-400'>
          Unlimited urls, custom slugs & QR Codes
        </span>

        <div className='flex gap-2 mt-6'>
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
