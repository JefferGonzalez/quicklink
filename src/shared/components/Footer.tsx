import GitHubIcon from '@/icons/GitHub'

export default function Footer() {
  return (
    <footer className='sticky bottom-0 w-full py-4'>
      <div className='container m-auto px-4 max-w-275 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <span className='text-base sm:text-lg bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500'>
            <span className='hidden sm:inline-block'>
              Made using PERN Stack |
            </span>{' '}
            Inspired by{' '}
          </span>

          <a
            href='https://github.com/midudev'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              loading='lazy'
              className='rounded-full shadow-lg size-8 cursor-pointer'
              src='/midudev.webp'
              title='midudev'
              alt='Miguel Ángel Durán'
            ></img>
          </a>

          <a
            href='https://github.com/pheralb'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              loading='lazy'
              className='rounded-full shadow-lg size-8 cursor-pointer'
              src='/pheralb.webp'
              title='pheralb'
              alt='Pablo Hernández Albertos'
            ></img>
          </a>
        </div>

        <a
          title='GitHub'
          href='https://github.com/JefferGonzalez/quicklink'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHubIcon className='size-8' />
          <span className='sr-only'>GitHub</span>
        </a>
      </div>
    </footer>
  )
}
