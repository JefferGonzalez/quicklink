import AlertWithIcon from '@/components/AlertWithIcon'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAuth from '@/hooks/useAuth'
import { assertAuthenticated } from '@/lib/auth/assertAuthenticated'
import { Profile, ProfileSchema } from '@/schemas/Profile'
import { updateUserProfile } from '@/services/User'
import { Errors } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon, SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ProfileForm() {
  const { user } = useAuth()
  assertAuthenticated(user)

  const [loading, setLoading] = useState(false)

  const form = useForm<Profile>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: '',
      username: ''
    },
    values: {
      name: user.name,
      username: user.username
    }
  })

  const handleSubmit = async (values: Profile) => {
    setLoading(true)

    try {
      const response = await updateUserProfile(values)

      if (!response.ok) {
        const statusCode = response.status

        if (statusCode === 400) {
          const { errors }: { errors: Errors<Profile>[] } = await response.json()

          for (const { message, path } of errors) {
            const name = path?.[0] ?? 'root'

            form.setError(name, {
              type: 'pattern',
              message
            })
          }
        }
        setLoading(false)
        return
      }

      window.location.reload()
    } catch {
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
