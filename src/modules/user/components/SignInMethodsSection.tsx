import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'
import { Button } from '@/shared/ui'

export default function SignInMethodsSection() {
  return (
    <section className='rounded-md shadow-md bg-neutral-900 text-neutral-100'>
      <header className='p-4 border-b border-neutral-800'>
        <h4 className='text-xl font-semibold'>Sign-in methods</h4>
        <p className='text-sm text-neutral-300 mt-2'>
          Customize how you sign in to your account.
        </p>
      </header>

      <div className='p-4 space-y-4'>
        <Button
          className='flex items-center gap-2 bg-neutral-800'
          title='Connect GitHub'
          disabled
        >
          <GitHubIcon className='size-6' />
          <span>Connect GitHub</span>
        </Button>

        <Button
          className='flex items-center gap-2 bg-neutral-800'
          title='Connect Google'
          disabled
        >
          <GoogleIcon className='size-6' />
          <span>Connect Google</span>
        </Button>

        <p className='text-sm text-neutral-400 mt-4'>
          ⚠️ Right now, GitHub and Google accounts created with the same email
          are not synced. Account linking will be available soon.
        </p>
      </div>
    </section>
  )
}
