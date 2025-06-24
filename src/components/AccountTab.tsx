import DeleteAccountSection from '@/components/DeleteAccountSection'
import SignInMethodsSection from '@/components/SignInMethodsSection'
import { Separator } from '@/components/ui/separator'
import { Fragment } from 'react'

export default function AccountTab() {
  return (
    <Fragment>
      <h3 className='text-2xl font-bold'>Account</h3>

      <Separator className='my-4 bg-neutral-800' />
      <SignInMethodsSection />

      <Separator className='my-4 bg-neutral-800' />
      <DeleteAccountSection />
    </Fragment>
  )
}
