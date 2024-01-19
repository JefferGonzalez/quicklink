import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
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
    </Fragment>
  )
}
