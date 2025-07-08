import useAuth from '@/hooks/useAuth'
import { User, UserSchema } from '@/modules/user/schemas/User'
import { updateUser } from '@/modules/user/use-cases'
import { assertAuthenticated } from '@/modules/user/utils/assertAuthenticated'
import AlertWithIcon from '@/shared/components/AlertWithIcon'
import { HttpStatus } from '@/shared/constants/httpStatus'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input
} from '@/shared/ui'
import { setFormErrors } from '@/shared/utils/setFormErrors'
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
      name: '',
      username: ''
    },
    values: {
      name: user.name,
      username: user.username
    }
  })

  const handleSubmit = async (values: User) => {
    setLoading(true)

    try {
      const response = await updateUser(values)

      if (!response.ok) {
        const { status, errors } = response

        if (status === HttpStatus.BadRequest) {
          setFormErrors(form, errors)
        }

        return
      }

      window.location.reload()
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
                  <Input
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

          <picture title={`Profile picture of ${user.username}`}>
            <img
              src={user.photo}
              alt={user.name}
              className='w-[100px] rounded-lg object-cover'
              loading='lazy'
            />
          </picture>
        </section>

        <FormField
          control={form.control}
          name='username'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
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
