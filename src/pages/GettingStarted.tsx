import { API_URL, APP_URL } from '@/Config'
import Layout from '@/components/Layout'
import SlugForm from '@/components/SlugForm'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext'
import { UrlSlug, UrlSlugSchema } from '@/schemas/UrlSlug'
import { Response } from '@/types'
import { showToastError } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import confetti from 'canvas-confetti'
import { Fragment, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function GettingStarted(): JSX.Element {
  const {
    auth: { isAuthenticated }
  } = useContext(AuthContext)

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
    if (values.url === values.slug) {
      form.setError('slug', {
        type: 'pattern',
        message: 'The slug cannot be the same as the URL.'
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/slug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const { errors }: Response = await response.json()

      if (!response.ok) {
        const statusCode = response.status
        if (statusCode === 400) {
          for (const { message, path } of errors) {
            const name = path?.at(0) ?? 'root'

            form.setError(name, {
              type: 'pattern',
              message
            })
          }
        }

        if (statusCode === 409) {
          form.setError('slug', {
            type: 'pattern',
            message: errors.at(0)?.message || 'The slug is already taken.'
          })
        }

        setLoading(false)
        return
      }

      form.reset()

      setLoading(false)

      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      })

      toast('🎉 Slug created successfully!', {
        duration: 10000,
        action: {
          label: 'Open slug',
          onClick: () => {
            window.open(`${APP_URL}/s/${values.slug}`, '_blank')
          }
        }
      })
    } catch (error) {
      setLoading(false)

      showToastError()
    }
  }

  return (
    <Layout>
      <section className='py-10'>
        <SlugForm form={form} loading={loading} handleSubmit={handleSubmit} />
      </section>

      <section className='flex flex-col items-center text-neutral-400 text-pretty space-y-3'>
        {!isAuthenticated ? (
          <Fragment>
            <p>
              You can create a short URL without an account, but it will be
              deleted after 1 hour.
            </p>

            <p>
              If you want keep your links, create a free account and discover
              more of our features!
            </p>

            <Link to='/auth' className='text-sm' title='Sign in for free'>
              <Button>
                <span className='sr-only'>Sign in for free</span>
                Sign in for free
              </Button>
            </Link>
          </Fragment>
        ) : (
          <p>
            Remember that you can create a temporary slug and it will be deleted
            after 1 hour.
          </p>
        )}
      </section>
    </Layout>
  )
}
