import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'
import { Button } from '@/shared/ui'

export default function SignInMethodsSection() {
  return (
    <section className='rounded-md border shadow-md bg-neutral-100 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800'>
      <header className='p-4 border-b border-neutral-200 dark:border-neutral-800'>
        <h4 className='text-xl font-semibold'>Sign-in methods</h4>
        <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-2'>
          Customize how you sign in to your account.
        </p>
      </header>

      <div className='p-4 space-y-4'>
        <Button
          variant='secondary'
          className='flex items-center gap-2'
          title='Connect GitHub'
          disabled
        >
          <GitHubIcon className='size-6' />
          <span>Connect GitHub</span>
        </Button>

        <Button
          variant='secondary'
          className='flex items-center gap-2'
          title='Connect Google'
          disabled
        >
          <GoogleIcon className='size-6' />
          <span>Connect Google</span>
        </Button>

        <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-4'>
          ⚠️ Right now, GitHub and Google accounts created with the same email
          are not synced. Account linking will be available soon.
        </p>
      </div>
    </section>
  )
}
