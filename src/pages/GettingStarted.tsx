import Layout from '@/components/Layout'
import SlugForm from '@/components/SlugForm'
import { Button } from '@/components/ui/button'
import { UrlSlug, UrlSlugSchema } from '@/schemas/UrlSlug'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function GettingStarted(): JSX.Element {
  const [loading, setLoading] = useState(false)

  const form = useForm<UrlSlug>({
    resolver: zodResolver(UrlSlugSchema),
    defaultValues: {
      description: '',
      slug: '',
      url: ''
    }
  })

  const handleSubmit = async (values: UrlSlug) => {
    setLoading(true)
    console.log(values)
    setLoading(false)
  }

  return (
    <Layout>
      <section className='py-10'>
        <SlugForm form={form} loading={loading} handleSubmit={handleSubmit} />
      </section>

      <section className='flex flex-col items-center text-neutral-400 text-pretty space-y-3'>
        <p>
          You can create a short URL without an account, but it will be deleted
          after 1 hour.
        </p>

        <p>
          If you want keep your links, create a free account and discover more
          of our features!
        </p>

        <Link to='/auth' className='text-sm' title='Sign in for free'>
          <Button>
            <span className='sr-only'>Sign in for free</span>
            Sign in for free
          </Button>
        </Link>
      </section>
    </Layout>
  )
}
