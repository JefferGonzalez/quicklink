import { API_URL, APP_URL } from '@/Config'
import useAuth from '@/hooks/useAuth'
import SlugForm from '@/modules/slug/components/SlugForm'
import { Slug, SlugSchema } from '@/modules/slug/schemas/Slug'
import { Errors } from '@/shared/types/errors'
import { Button } from '@/shared/ui'
import { showToastError } from '@/shared/utils/showToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import confetti from 'canvas-confetti'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function GettingStarted() {
  const { isAuthenticated } = useAuth()

  const [loading, setLoading] = useState(false)

  const form = useForm<Slug>({
    resolver: zodResolver(SlugSchema),
    defaultValues: {
      description: '',
      slug: '',
      url: ''
    }
  })

  const handleSubmit = async (values: Slug) => {
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
      const response = await fetch(`${API_URL}/slug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const { errors }: { errors: Errors<Slug>[] } = await response.json()

      if (!response.ok) {
        const statusCode = response.status
        if (statusCode === 400) {
          for (const { message, path } of errors) {
            const name = path?.[0] ?? 'root'

            form.setError(name, {
              type: 'pattern',
              message
            })
          }
        }

        if (statusCode === 409) {
          form.setError('slug', {
            type: 'pattern',
            message: errors?.[0]?.message || 'The slug is already taken.'
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
    } catch {
      setLoading(false)

      showToastError()
    }
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}
