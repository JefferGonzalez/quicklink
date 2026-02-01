import { APP_URL } from '@/Config'
import useAuth from '@/hooks/useAuth'
import ShortLinkForm from '@/modules/short-link/components/ShortLinkForm'
import {
  ShortLink,
  ShortLinkSchema
} from '@/modules/short-link/schemas/ShortLink'
import { createShortLink } from '@/modules/short-link/use-cases'
import { HttpStatus } from '@/shared/constants/httpStatus'
import { Button } from '@/shared/ui'
import { setFormErrors } from '@/shared/utils/setFormErrors'
import { showConfetti } from '@/shared/utils/showConfetti'
import { showToastError } from '@/shared/utils/showToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function GettingStarted() {
  const { isAuthenticated } = useAuth()

  const [loading, setLoading] = useState(false)

  const form = useForm<ShortLink>({
    resolver: zodResolver(ShortLinkSchema),
    defaultValues: {
      description: '',
      slug: '',
      url: ''
    }
  })

  const handleSubmit = async (values: ShortLink) => {
    setLoading(true)

    if (values.url === values.slug) {
      form.setError('slug', {
        type: 'manual',
        message: 'The slug cannot be the same as the URL.'
      })
      setLoading(false)
      return
    }

    try {
      const response = await createShortLink(values)

      if (!response.ok) {
        const { errors, status } = response

        if (status === HttpStatus.BadRequest) return setFormErrors(form, errors)
        if (status === HttpStatus.Conflict)
          return setFormErrors(form, errors, 'slug')

        return
      }

      form.reset()

      await showConfetti()

      toast('🎉 Short link created successfully!', {
        duration: 10000,
        action: {
          label: 'Open short link',
          onClick: () => {
            window.open(`${APP_URL}/s/${response.slug}`, '_blank')
          }
        }
      })
    } catch {
      showToastError()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <section className='py-10'>
        <ShortLinkForm
          form={form}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </section>

      <section className='flex flex-col items-center text-neutral-400 text-pretty space-y-3'>
        {!isAuthenticated ? (
          <Fragment>
            <p>
              You can create a short link without an account, but it will be
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
