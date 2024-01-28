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
import { type UrlSlug } from '@/schemas/UrlSlug'
import { RandomSlug } from '@/utils/slug'
import { LoaderIcon, RocketIcon, ShuffleIcon } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface SlugFormProps {
  form: UseFormReturn<UrlSlug>
  loading: boolean
  withAccount?: boolean
  isEdit?: boolean
  handleSubmit: (values: UrlSlug) => void
}

export default function SlugForm({
  form,
  loading,
  withAccount = false,
  isEdit = false,
  handleSubmit
}: SlugFormProps): JSX.Element {
  const handleRandomSlug = () => {
    form.clearErrors('slug')
    form.setValue('slug', RandomSlug())
  }

  const buttonText = isEdit ? 'Update your short URL' : 'Create a short URL'

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

        {!isEdit && (
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
        )}

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
          title={buttonText}
          disabled={loading}
        >
          {loading ? (
            <LoaderIcon className='transition-all duration-300 animate-spin' />
          ) : (
            <RocketIcon />
          )}
          <span className='sr-only'>{buttonText}</span>
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
