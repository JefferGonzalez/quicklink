import useAuth from '@/hooks/useAuth'
import DeleteAccountForm from '@/modules/user/components/DeleteAccountForm'
import {
  getDeleteAccountSchema,
  type DeleteAccount
} from '@/modules/user/schemas/DeleteAccount'
import { deleteAccount, signOut } from '@/modules/user/use-cases'
import { assertAuthenticated } from '@/modules/user/utils/assertAuthenticated'
import { HttpStatus } from '@/shared/constants/httpStatus'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Separator
} from '@/shared/ui'
import { showToastError } from '@/shared/utils/showToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function DeleteAccountSection() {
  const { logout, user } = useAuth()
  assertAuthenticated(user)

  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<DeleteAccount>({
    resolver: zodResolver(getDeleteAccountSchema(user.username)),
    defaultValues: {
      username: '',
      text: ''
    }
  })

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const { ok, status } = await deleteAccount()

      if (!ok) {
        if (status === HttpStatus.Unauthorized) return logout()
        if (status === HttpStatus.NotFound) {
          await signOut()
        }

        return
      }

      if (status === HttpStatus.NoContent) {
        setShowDisclaimer(false)

        toast('🥲 Account deleted successfully. Redirecting...')

        setTimeout(logout, 3000)
      }
    } catch {
      showToastError()
    } finally {
      setLoading(false)
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
          className='overflow-hidden p-0 shadow-lg'
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
