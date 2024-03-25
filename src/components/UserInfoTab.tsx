import ProfileForm from '@/components/ProfileForm'
import { Separator } from '@/components/ui/separator'
import { Fragment } from 'react'
import type { User } from '@/types'

interface UserInfoTabProps {
  user?: User
}

export default function UserInfoTab({ user }: UserInfoTabProps): JSX.Element {
  return (
    <Fragment>
      <h3 className='text-2xl font-bold'>User information</h3>
      <Separator className='my-4 bg-neutral-800' />

      <ProfileForm user={user} />
    </Fragment>
  )
}
