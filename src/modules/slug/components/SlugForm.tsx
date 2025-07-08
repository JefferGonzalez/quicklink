import { APP_URL } from '@/Config'
import { type Slug } from '@/modules/slug/schemas/Slug'
import { RandomSlug } from '@/modules/slug/utils/randomSlug'
import AlertWithIcon from '@/shared/components/AlertWithIcon'
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input
} from '@/shared/ui'
import { QRCode } from '@/shared/utils/QRCode'
import { LoaderIcon, RocketIcon, ShuffleIcon } from 'lucide-react'
import { Suspense } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<Slug>
  loading: boolean
  withAccount?: boolean
  isEdit?: boolean
  handleSubmit: (values: Slug) => void
}

export default function SlugForm({
  form,
  loading,
  withAccount = false,
  isEdit = false,
  handleSubmit
}: Props) {
  const handleRandomSlug = () => {
    form.clearErrors('slug')
    form.setValue('slug', RandomSlug())
  }

  const buttonText = isEdit ? 'Update your short URL' : 'Create a short URL'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <section className='flex items-center justify-center gap-x-2'>
          <FormField
            name='url'
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className='w-full'>
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

          {withAccount &&
            form.watch('url') &&
            !form.getFieldState('url').invalid && (
              <picture title='QR Code'>
                <Suspense
                  fallback={
                    <div className='animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12' />
                  }
                >
                  <QRCode
                    size={100}
                    bgColor='$000'
                    fgColor='#FFF'
                    level='H'
                    value={form.getValues('url')}
                  />
                </Suspense>
              </picture>
            )}
        </section>

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
                  {`${APP_URL}/s/<slug>/`}
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Enter a description (optional):</FormLabel>
                <FormControl>
                  <Input
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
