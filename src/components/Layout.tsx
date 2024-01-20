import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Toaster } from 'sonner'
import { Fragment, PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Fragment>
      <main className='container max-w-[1100px] min-h-auto'>
        <NavBar />
        {children}
      </main>
      <Footer />

      <Toaster theme='dark' duration={2500} />
    </Fragment>
  )
}
