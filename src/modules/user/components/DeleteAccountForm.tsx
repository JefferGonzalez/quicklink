import { type DeleteAccount } from '@/modules/user/schemas/DeleteAccount'
import AlertWithIcon from '@/shared/components/AlertWithIcon'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input
} from '@/shared/ui'
import { type UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<DeleteAccount>
  username: string
  loading: boolean
  handleSubmit: (values: DeleteAccount) => void
  handleCancel: (value: boolean) => void
}

export default function DeleteAccountForm({
  form,
  username,
  loading,
  handleSubmit,
  handleCancel
}: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <FormField
          name='username'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className='w-full'>
              <FormLabel className='font-normal'>
                Enter your username{' '}
                <span className='font-bold'>{username}</span> to continue:
              </FormLabel>
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

        <FormField
          name='text'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className='w-full'>
              <FormLabel className='font-normal'>
                To verify, type{' '}
                <span className='font-bold'>delete my personal account</span>{' '}
                below:
              </FormLabel>
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

        <footer className='flex justify-between gap-x-4 rounded-b-md p-4'>
          <Button
            title='Cancel'
            variant='secondary'
            type='button'
            disabled={loading}
            onClick={() => handleCancel(false)}
          >
            Cancel
          </Button>

          <Button
            title='Delete Account'
            variant='destructive'
            type='submit'
            disabled={loading}
          >
            Delete Account
          </Button>
        </footer>
      </form>
    </Form>
  )
}
