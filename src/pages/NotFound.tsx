import { Button } from '@/components/ui/button'
import { Fragment } from 'react'

export default function NotFound() {
  return (
    <Fragment>
      <section className='flex flex-col items-center space-y-3 py-20'>
        <p>404 | This page could not be found.</p>
        <picture>
          <img
            src='/this-is-fine-404.gif'
            alt='This is fine.'
            title='This is fine.'
            loading='lazy'
          />
        </picture>

        <Button onClick={() => window.history.back()} title='Go back'>
          <span className='sr-only'>Go back</span>
          Go back
        </Button>
      </section>
    </Fragment>
  )
}
