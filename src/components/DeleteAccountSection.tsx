import DeleteAccountForm from '@/components/DeleteAccountForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import useAuth from '@/hooks/useAuth'
import { assertAuthenticated } from '@/lib/auth/assertAuthenticated'
import {
  createDeleteAccountValidationSchema as DeleteAccountValidationSchema,
  type DeleteAccountValidation
} from '@/schemas/DeleteAccountValidation'
import { deleteUserAccount, signOut } from '@/services/User'
import { showToastError } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function DeleteAccountSection() {
  const { logout, user } = useAuth()
  assertAuthenticated(user)

  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<DeleteAccountValidation>({
    resolver: zodResolver(DeleteAccountValidationSchema(user.username)),
    defaultValues: {
      username: '',
      text: ''
    }
  })

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const response = await deleteUserAccount()

      const statusCode = response.status
      if (!response.ok) {
        if (statusCode === 401) logout()

        if (statusCode === 404) await signOut()
      }

      if (statusCode === 204) {
        setShowDisclaimer(false)

        toast('🥲 Account deleted successfully. Redirecting...')

        setTimeout(() => logout(), 3000)
      }

      setLoading(false)
    } catch {
      setLoading(false)

      showToastError()
    }
  }

  const handleCancel = () => {
    form.clearErrors()
    form.reset()

    setShowDisclaimer(false)
  }

  const handleShowDisclaimer = (boolean: boolean) => {
    if (loading) return

    setShowDisclaimer(boolean)
  }

  return (
    <Fragment>
      <section className='rounded-md border border-red-600 shadow-md bg-neutral-900 text-neutral-100'>
        <div className='p-4 flex flex-col gap-y-4'>
          <h4 className='text-xl font-semibold'>Delete Account</h4>

          <p className='text-pretty'>
            Permanently delete your account. This action is not reversible, so
            proceed with caution. All your data will be lost.
          </p>
        </div>

        <footer className='bg-neutral-950 rounded-b-md p-4 flex justify-end gap-x-4'>
          <Button
            title='Delete Account'
            variant='destructive'
            onClick={() => setShowDisclaimer(true)}
          >
            <span className='sr-only'>Delete Account</span>
            Delete Account
          </Button>
        </footer>
      </section>

      <Dialog open={showDisclaimer} onOpenChange={handleShowDisclaimer}>
        <DialogContent
          className='overflow-hidden p-0 shadow-lg border-neutral-700 '
          onInteractOutside={(e) => e.preventDefault()}
        >
          <section className='bg-black p-8'>
            <DialogTitle className='text-2xl font-bold mb-6'>
              Delete Account
            </DialogTitle>

            <DialogDescription className='text-white text-pretty p-2 rounded-md bg-destructive'>
              This action is not reversible. Please be sure.
            </DialogDescription>

            <Separator className='my-4 bg-neutral-500' />

            <DeleteAccountForm
              username={user.username}
              form={form}
              loading={loading}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </section>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
