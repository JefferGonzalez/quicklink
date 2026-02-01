import useAuth from '@/hooks/useAuth'
import { User, UserSchema } from '@/modules/user/schemas/User'
import { updateUser } from '@/modules/user/services/User'
import { assertAuthenticated } from '@/modules/user/utils/assertAuthenticated'
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
import { showToastError } from '@/shared/utils/showToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon, SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ProfileForm() {
  const { user } = useAuth()
  assertAuthenticated(user)

  const [loading, setLoading] = useState(false)

  const form = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: ''
    },
    values: {
      name: user.name
    }
  })

  const handleSubmit = async (values: User) => {
    setLoading(true)

    try {
      const response = await updateUser(values)

      if (!response.ok) {
        showToastError(response.error ?? 'Failed to update profile.')

        return
      }
    } catch {
      showToastError()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <section className='flex gap-x-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field, fieldState }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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

          {user.image && (
            <picture
              className='border rounded-md p-2 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800'
              title={`Profile picture of ${user.name}`}
            >
              <img
                src={user.image}
                alt={user.name}
                className='w-25 object-cover'
                loading='lazy'
              />
            </picture>
          )}
        </section>

        <Button type='submit' className='flex gap-2' title='Update profile'>
          {loading ? (
            <LoaderIcon className='transition-all duration-300 animate-spin' />
          ) : (
            <SaveIcon />
          )}
          <span className='sr-only'>Update profile</span>
          Update profile
        </Button>
      </form>
    </Form>
  )
}
