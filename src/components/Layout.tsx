import Command from '@/components/Command'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Analytics } from '@vercel/analytics/react'
import { Fragment, PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

interface LayoutProps extends PropsWithChildren {}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Fragment>
      <main className='container max-w-[1100px]'>
        <NavBar />
        <section className='min-h-[calc(100vh-9rem)]'>{children}</section>
      </main>

      <Footer />

      <Command />

      <Toaster theme='dark' duration={2500} />

      <Analytics />
    </Fragment>
  )
}
