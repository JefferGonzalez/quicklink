import { Button } from '@/components/ui/button'
import LinkIcon from '@/icons/Link'

export default function NavBar(): JSX.Element {
  return (
    <nav className='flex items-center justify-between sticky py-4 top-0 z-40'>
      <a
        href=''
        className='flex items-center gap-2'
        title='URL Shortener | Slug'
      >
        <span className='sr-only'>URL Shortener | Slug</span>
        <LinkIcon className='size-8' />
        URL Shortener | Slug
      </a>
      <Button>Sign In</Button>
    </nav>
  )
}
