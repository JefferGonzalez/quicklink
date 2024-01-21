import Layout from '@/components/Layout'
import SlugForm from '@/components/SlugForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UndoDotIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Slug() {
  return (
    <Layout>
      <header className='flex justify-between items-center'>
        <h2 className='text-4xl font-extrabold mt-2'>Create a new slug</h2>
        <Link to='/dashboard'>
          <Button className='flex gap-2' title='Back to dashboard'>
            <span className='sr-only'>Back to dashboard</span>
            <UndoDotIcon />
            Back to dashboard
          </Button>
        </Link>
      </header>
      <Separator className='my-4' />

      <section>
        <SlugForm withAccount />
      </section>
    </Layout>
  )
}
