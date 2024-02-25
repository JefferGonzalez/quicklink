import GitHubIcon from '@/icons/GitHub'

export default function Footer(): JSX.Element {
  return (
    <footer className='fixed bottom-0 w-full py-4'>
      <div className='container max-w-[1100px] flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <span className='text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500'>
            <span className='hidden sm:inline-block'>
              Made using PERN Stack |
            </span>{' '}
            Inspired by{' '}
          </span>

          <img
            loading='lazy'
            className='rounded-full shadow-lg size-8 cursor-pointer'
            src='/midudev.webp'
            title='midudev'
            alt='Miguel Ángel Durán'
            onClick={() => window.open('https://github.com/midudev', '_blank')}
          ></img>
          <img
            loading='lazy'
            className='rounded-full shadow-lg size-8 cursor-pointer'
            src='/pheralb.webp'
            title='pheralb'
            alt='Pablo Hernández Albertos'
            onClick={() => window.open('https://github.com/pheralb', '_blank')}
          ></img>
        </div>

        <a href='' title='GitHub'>
          <GitHubIcon className='size-8' />
          <span className='sr-only'>GitHub</span>
        </a>
      </div>
    </footer>
  )
}
