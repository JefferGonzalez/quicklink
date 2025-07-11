import ProfileForm from '@/modules/user/components/ProfileForm'
import { Separator } from '@/shared/ui'
import { Fragment } from 'react'

export default function UserInfoTab() {
  return (
    <Fragment>
      <h3 className='text-2xl font-bold ml-2'>User information</h3>

      <Separator className='my-4' />

      <ProfileForm />
    </Fragment>
  )
}
