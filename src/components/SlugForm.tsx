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
import RocketIcon from '@/icons/Rocket'
import ShuffleIcon from '@/icons/Shuffle'
import { UrlSlugSchema, type UrlSlug } from '@/schemas/UrlSlug'
import { RandomSlug } from '@/utils/slug'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface SlugFormProps {
  withAccount?: boolean
}

export default function SlugForm({ withAccount = false }: SlugFormProps) {
  const form = useForm<UrlSlug>({
    resolver: zodResolver(UrlSlugSchema),
    defaultValues: {
      description: '',
      slug: '',
      url: ''
    }
  })

  const handleSubmit = (values: UrlSlug) => {
    if (values.url === values.slug) {
      form.setError('slug', {
        type: 'pattern',
        message: 'The slug cannot be the same as the URL.'
      })
      return
    }
    console.log(values)
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
                    {...field}
                  />
                  <Button
                    type='button'
                    title='Generate a random slug'
                    className='flex gap-2'
                    onClick={handleRandomSlug}
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
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button type='submit' className='flex gap-2' title='Create a short URL'>
          <span className='sr-only'>Create a short URL</span>
          <RocketIcon />
          Create a short URL
        </Button>
      </form>
    </Form>
  )
}
