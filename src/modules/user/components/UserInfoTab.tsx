import ProfileForm from '@/modules/user/components/ProfileForm'
import { Separator } from '@/shared/ui'
import { Fragment } from 'react'

export default function UserInfoTab() {
  return (
    <Fragment>
      <h3 className='text-2xl font-bold'>User information</h3>
      <Separator className='my-4 bg-neutral-800' />

      <ProfileForm />
    </Fragment>
  )
}
