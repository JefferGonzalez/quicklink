import DeleteAccountSection from '@/components/DeleteAccountSection'
import { Separator } from '@/components/ui/separator'
import type { User } from '@/types'
import { Fragment } from 'react'

interface AccountTabProps {
  user?: User
}

export default function AccountTab({ user }: AccountTabProps): JSX.Element {
  return (
    <Fragment>
      <h3 className='text-2xl font-bold'>Account</h3>

      <Separator className='my-4 bg-neutral-800' />

      <DeleteAccountSection user={user} />
    </Fragment>
  )
}
