import { APP_URL } from '@/Config'
import useAuth from '@/hooks/useAuth'
import SlugForm from '@/modules/slug/components/SlugForm'
import { Slug, SlugSchema } from '@/modules/slug/schemas/Slug'
import { createSlug } from '@/modules/slug/services/Slug'
import { Errors } from '@/shared/types/errors'
import { Button, Separator } from '@/shared/ui'
import { showToastError } from '@/shared/utils/showToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import confetti from 'canvas-confetti'
import { UndoDotIcon } from 'lucide-react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function Create() {
  const { logout } = useAuth()

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
      const response = await createSlug(values)

      const { errors = [] }: { errors?: Errors<Slug>[] } = await response.json()

      if (!response.ok) {
        const statusCode = response.status
        if (statusCode === 401) logout()
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
      <header className='flex justify-between items-center'>
        <h2 className='text-2xl md:text-4xl font-extrabold mt-2'>
          Create a new slug
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
        />
      </section>
    </Fragment>
  )
}
