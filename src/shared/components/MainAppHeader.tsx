import LinkIcon from '@/icons/Link'
import Waves from '@/shared/components/Waves'
import { Fragment } from 'react'

export default function MainAppHeader() {
  return (
    <Fragment>
      <header className='flex items-center gap-x-2'>
        <LinkIcon className='size-16' />
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
          Open Source URL Shortener
        </h1>
      </header>
      <span className='text-lg text-neutral-400 pb-4'>
        Unlimited urls, custom slugs & QR Codes
      </span>

      <Waves />
    </Fragment>
  )
}
