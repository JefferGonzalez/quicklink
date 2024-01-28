import { APP_URL } from '@/Config'
import AlertWithIcon from '@/components/AlertWithIcon'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext'
import { UrlSlugSchema, type UrlSlug } from '@/schemas/UrlSlug'
import { createSlug } from '@/services/Slugs'
import { Response } from '@/types'
import { RandomSlug } from '@/utils/slug'
import { zodResolver } from '@hookform/resolvers/zod'
import confetti from 'canvas-confetti'
import { LoaderIcon, RocketIcon, ShuffleIcon } from 'lucide-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface SlugFormProps {
  withAccount?: boolean
}

export default function SlugForm({ withAccount = false }: SlugFormProps) {
  const { logout } = useContext(AuthContext)

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
    const response = await createSlug(values)

    const { errors }: Response = await response.json()

    if (!response.ok) {
      const statusCode = response.status
      if (statusCode === 401) logout()
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
      action: {
        label: 'Open slug',
        onClick: () => {
          window.open(`${APP_URL}/${values.slug}`, '_blank')
        }
      }
    })
  }

  const handleRandomSlug = () => {
    form.clearErrors('slug')
    form.setValue('slug', RandomSlug())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <FormField
          name='url'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Enter the URL of your site:</FormLabel>
              <FormControl>
                <Input
                  placeholder='https://'
                  className='bg-neutral-900 border-neutral-950'
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              {fieldState.invalid && (
                <AlertWithIcon
                  text={fieldState.error?.message}
                  type='destructive'
                />
              )}
            </FormItem>
          )}
        />

        <FormField
          name='slug'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Enter a custom slug:</FormLabel>
              <FormControl>
                <div className='flex space-x-2'>
                  <Input
                    className='bg-neutral-900 border-neutral-950'
                    disabled={loading}
                    {...field}
                  />
                  <Button
                    type='button'
                    title='Generate a random slug'
                    className='flex gap-2'
                    onClick={handleRandomSlug}
                    disabled={loading}
                  >
                    <span className='sr-only'>Generate a random slug</span>
                    <ShuffleIcon />
                    Random
                  </Button>
                </div>
              </FormControl>
              <FormDescription className='text-neutral-400'>
                {`${APP_URL}/<slug>/`}
              </FormDescription>

              {fieldState.invalid && (
                <AlertWithIcon
                  text={fieldState.error?.message}
                  type='destructive'
                />
              )}
            </FormItem>
          )}
        />

        {withAccount && (
          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter a description (optional):</FormLabel>
                <FormControl>
                  <Input
                    className='bg-neutral-900 border-neutral-950'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button
          type='submit'
          className='flex gap-2'
          title='Create a short URL'
          disabled={loading}
        >
          {loading ? (
            <LoaderIcon className='transition-all duration-300 animate-spin' />
          ) : (
            <RocketIcon />
          )}
          <span className='sr-only'>Create a short URL</span>
          Create a short URL
        </Button>
      </form>
    </Form>
  )
}
