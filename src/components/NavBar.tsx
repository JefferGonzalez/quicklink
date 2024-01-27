import DropdownMenu from '@/components/DropdownMenu'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { AuthContext } from '@/context/AuthContext'
import LinkIcon from '@/icons/Link'
import { LoaderIcon, LogOutIcon } from 'lucide-react'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar(): JSX.Element {
  const { isAuthenticated, isSessionLoading, user, logout } =
    useContext(AuthContext)

  const { pathname } = useLocation()

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

      {pathname !== '/auth' && !isAuthenticated && (
        <Link to='/auth' className='text-sm' title='Sign in'>
          <Button className='flex gap-x-2'>
            {!isAuthenticated && isSessionLoading && (
              <LoaderIcon className='transition-all duration-300 animate-spin' />
            )}
            <span className='sr-only'>Sign in</span>
            Sign in
          </Button>
        </Link>
      )}

      {isAuthenticated && (
        <DropdownMenu
          button={{
            text: user?.username ?? 'Loading...',
            title: `Profile of ${user?.username ?? 'Loading...'}`
          }}
          className='bg-black border-neutral-950 text-neutral-100'
        >
          <DropdownMenuItem
            className='focus:bg-neutral-950 focus:text-neutral-100'
            onClick={logout}
          >
            <LogOutIcon />
            <DropdownMenuLabel>
              <span className='sr-only'>Sign out</span>
              Sign out
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenu>
      )}
    </nav>
  )
}
