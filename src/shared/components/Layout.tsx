import Command from '@/shared/components/Command'
import Footer from '@/shared/components/Footer'
import NavBar from '@/shared/components/NavBar'
import { Analytics } from '@vercel/analytics/react'
import { Fragment, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function Layout() {
  return (
    <Fragment>
      <main className='container m-auto px-4 max-w-[1100px]'>
        <NavBar />
        <section className='min-h-[calc(100vh-9rem)]'>
          {
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          }
        </section>
      </main>

      <Footer />

      <Command />

      <Toaster theme='dark' duration={2500} />

      <Analytics />
    </Fragment>
  )
}
