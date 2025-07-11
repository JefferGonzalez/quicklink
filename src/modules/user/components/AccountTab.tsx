import DeleteAccountSection from '@/modules/user/components/DeleteAccountSection'
import SignInMethodsSection from '@/modules/user/components/SignInMethodsSection'
import { Separator } from '@/shared/ui'
import { Fragment } from 'react'

export default function AccountTab() {
  return (
    <Fragment>
      <h3 className='text-2xl font-bold ml-2'>Account</h3>

      <Separator className='my-4' />
      <SignInMethodsSection />

      <Separator className='my-4' />
      <DeleteAccountSection />
    </Fragment>
  )
}
