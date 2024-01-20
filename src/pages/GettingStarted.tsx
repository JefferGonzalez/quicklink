import Layout from '@/components/Layout'
import SlugForm from '@/components/SlugForm'
import { Button } from '@/components/ui/button'

export default function GettingStarted(): JSX.Element {
  return (
    <Layout>
      <section className='py-10'>
        <SlugForm />
      </section>

      <section className='flex flex-col items-center text-neutral-400 text-pretty space-y-3'>
        <p>
          You can create a short URL without an account, but it will be deleted
          after 1 hour.
        </p>

        <p>
          If you want keep your links, create a free account and discover more
          of our features!
        </p>

        <Button>Sign in for free</Button>
      </section>
    </Layout>
  )
}
