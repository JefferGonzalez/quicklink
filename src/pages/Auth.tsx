import Layout from '@/components/Layout'
import MainAppHeader from '@/components/MainAppHeader'
import { Button } from '@/components/ui/button'
import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'

export default function Auth(): JSX.Element {
  return (
    <Layout>
      <section className='flex flex-col items-center justify-center py-32'>
        <MainAppHeader />

        <Button className='flex gap-2 my-1' title='Sign in with GitHub'>
          <GitHubIcon />
          <span className='sr-only'>Sign in with GitHub</span>
          Sign in with GitHub
        </Button>

        <Button className='flex gap-2 my-1' title='Sign in with Google'>
          <GoogleIcon className='size-6' />
          <span className='sr-only'>Sign in with Google</span>
          Sign in with Google
        </Button>
      </section>
    </Layout>
  )
}
