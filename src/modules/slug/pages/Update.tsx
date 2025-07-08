import { APP_URL } from '@/Config'
import useAuth from '@/hooks/useAuth'
import SlugForm from '@/modules/slug/components/SlugForm'
import { SlugEntity } from '@/modules/slug/entities/Slug'
import { Slug, SlugSchema } from '@/modules/slug/schemas/Slug'
import { getSlugById, updateSlug } from '@/modules/slug/use-cases'
import { HttpStatus } from '@/shared/constants/httpStatus'
import { Button, Separator } from '@/shared/ui'
import { setFormErrors } from '@/shared/utils/setFormErrors'
import { showConfetti } from '@/shared/utils/showConfetti'
import { showToastError } from '@/shared/utils/showToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import { UndoDotIcon } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function Update() {
  const { logout } = useAuth()

  const { id = '' } = useParams()
  const [info, setInfo] = useState<SlugEntity>()
  const [loading, setLoading] = useState(false)

  const form = useForm<Slug>({
    resolver: zodResolver(SlugSchema),
    defaultValues: {
      description: '',
      slug: '',
      url: ''
    },
    values: {
      description: info?.description,
      slug: info?.slug ?? '',
      url: info?.url ?? ''
    }
  })

  const handleSubmit = async (values: Slug) => {
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
      const response = await updateSlug(id, values)

      if (!response.ok) {
        const { errors, status } = response

        if (status === HttpStatus.Unauthorized) return logout()
        if (status === HttpStatus.BadRequest) return setFormErrors(form, errors)

        return
      }

      form.reset()

      await showConfetti()

      toast('🎉 Slug updated successfully!', {
        action: {
          label: 'Open slug',
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

  useEffect(() => {
    const loadSlug = async () => {
      try {
        const response = await getSlugById(id)

        if (!response.ok) {
          const statusCode = response.status

          if (
            [HttpStatus.NotFound, HttpStatus.BadRequest].includes(statusCode)
          ) {
            window.location.href = '/dashboard'
          }

          return
        }

        setInfo(response.data)
      } catch {
        showToastError()
      }
    }

    loadSlug()
  }, [id])

  return (
    <Fragment>
      <header className='flex justify-between items-center'>
        <h2 className='text-2xl md:text-4xl font-extrabold mt-2'>
          Edit slug{' '}
          {info?.slug && <span className='text-neutral-500'>/{info.slug}</span>}
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
        <SlugForm
          form={form}
          handleSubmit={handleSubmit}
          loading={loading}
          withAccount
          isEdit
        />
      </section>
    </Fragment>
  )
}
