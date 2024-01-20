import Layout from '@/components/Layout'
import SlugCard from '@/components/SlugCard'
import { Separator } from '@/components/ui/separator'
import { UrlSlug } from '@/schemas/UrlSlug'

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
      <h2 className='text-4xl font-extrabold mt-2'>Dashboard</h2>
      <Separator className='my-4' />

      <section className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
        {LINKS.map((link) => (
          <SlugCard key={link.slug} info={link} />
        ))}
      </section>
    </Layout>
  )
}
