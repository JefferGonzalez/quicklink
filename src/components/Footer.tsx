import GitHubIcon from '@/icons/GitHub'

export default function Footer(): JSX.Element {
  return (
    <footer className='fixed bottom-0 w-full py-4'>
      <div className='container max-w-[1100px] flex items-center justify-between'>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500'>
          Made using PERN Stack
        </span>

        <a href='' title='GitHub'>
          <GitHubIcon />
          <span className='sr-only'>GitHub</span>
        </a>
      </div>
    </footer>
  )
}
