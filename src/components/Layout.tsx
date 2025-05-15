import Command from '@/components/Command'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Analytics } from '@vercel/analytics/react'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function Layout(): JSX.Element {
  return (
    <Fragment>
      <main className='container max-w-[1100px]'>
        <NavBar />
        <section className='min-h-[calc(100vh-9rem)]'>{<Outlet />}</section>
      </main>

      <Footer />

      <Command />

      <Toaster theme='dark' duration={2500} />

      <Analytics />
    </Fragment>
  )
}
