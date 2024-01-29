import Layout from '@/components/Layout'
import AuthProvider from '@/context/AuthContext'
import { LoaderIcon } from 'lucide-react'

export default function Slug(): JSX.Element {
  return (
    <AuthProvider>
      <Layout>
        <section className='flex justify-center py-32'>
          <h1 className='flex gap-2 text-3xl'>
            <LoaderIcon className='size-10 transition-all duration-300 animate-spin' />
            Loading...
          </h1>
        </section>
      </Layout>
    </AuthProvider>
  )
}
