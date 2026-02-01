import { APP_URL } from '@/Config'
import useAuth from '@/hooks/useAuth'
import ShortLinkForm from '@/modules/short-link/components/ShortLinkForm'
import {
  ShortLink,
  ShortLinkSchema
} from '@/modules/short-link/schemas/ShortLink'
import { createShortLink } from '@/modules/short-link/use-cases'
import { HttpStatus } from '@/shared/constants/httpStatus'
import { Button, Separator } from '@/shared/ui'
import { setFormErrors } from '@/shared/utils/setFormErrors'
import { showConfetti } from '@/shared/utils/showConfetti'
import { showToastError } from '@/shared/utils/showToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import { UndoDotIcon } from 'lucide-react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function Create() {
  const { signOut } = useAuth()

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

        if (status === HttpStatus.Unauthorized) {
          return signOut()
        }
        if (status === HttpStatus.BadRequest) {
          return setFormErrors(form, errors)
        }
        if (status === HttpStatus.Conflict) {
          return setFormErrors(form, errors, 'slug')
        }

        return
      }

      form.reset()

      await showConfetti()

      toast('🎉 Short link created successfully!', {
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
      <header className='flex justify-between items-center'>
        <h2 className='text-2xl md:text-4xl font-extrabold mt-2'>
          Create a new short link
        </h2>
        <Link to='/dashboard'>
          <Button className='flex gap-2' title='Back to dashboard'>
            <span className='sr-only'>Back to dashboard</span>
            <UndoDotIcon />
            <span className='hidden sm:inline-block'>Back to dashboard</span>
          </Button>
        </Link>
      </header>
      <Separator className='my-4' />

      <section>
        <ShortLinkForm
          form={form}
          handleSubmit={handleSubmit}
          loading={loading}
          withAccount
        />
      </section>
    </Fragment>
  )
}
