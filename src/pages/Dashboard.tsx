import Layout from '@/components/Layout'
import SlugCard from '@/components/SlugCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UrlSlug } from '@/schemas/UrlSlug'
import { PlusSquareIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const LINKS: UrlSlug[] = [
  {
    slug: 'test',
    url: 'https://google.com',
    description: 'test'
  },
  {
    slug: 'test2',
    url: 'https://google.com'
  },
  {
    slug: 'test3',
    url: 'https://google.com',
    description: 'test3'
  },
  {
    slug: 'test4',
    url: 'https://google.com'
  }
]

export default function Dashboard() {
  return (
    <Layout>
      <header className='flex justify-between items-center'>
        <h2 className='text-4xl font-extrabold mt-2'>Dashboard</h2>
        <Link to='/dashboard/create'>
          <Button className='flex gap-2' title='Create a new slug'>
            <span className='sr-only'>Create a new slug</span>
            <PlusSquareIcon />
            Create a new slug
          </Button>
        </Link>
      </header>
      <Separator className='my-4' />

      <section className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
        {LINKS.map((link) => (
          <SlugCard key={link.slug} info={link} />
        ))}
      </section>
    </Layout>
  )
}
