import { Button } from '@/components/ui/button'
import LinkIcon from '@/icons/Link'
import { Link } from 'react-router-dom'

export default function NavBar(): JSX.Element {
  return (
    <nav className='flex items-center justify-between sticky py-4 top-0 z-40'>
      <Link
        to='/'
        className='flex items-center gap-2'
        title='URL Shortener | Slug'
      >
        <span className='sr-only'>URL Shortener | Slug</span>
        <LinkIcon className='size-8' />
        URL Shortener | Slug
      </Link>
      <Link to='/auth' className='text-sm' title='Sign in'>
        <Button>
          <span className='sr-only'>Sign in</span>
          Sign in
        </Button>
      </Link>
    </nav>
  )
}
