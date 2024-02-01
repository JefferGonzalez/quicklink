import DropdownMenu from '@/components/DropdownMenu'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { AuthContext } from '@/context/AuthContext'
import LinkIcon from '@/icons/Link'
import {
  ClockIcon,
  CommandIcon,
  LayoutDashboardIcon,
  LoaderIcon,
  LogOutIcon,
  PlusSquareIcon
} from 'lucide-react'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar(): JSX.Element {
  const { auth, logout } = useContext(AuthContext)

  const { isAuthenticated, isSessionLoading, user } = auth

  const { pathname } = useLocation()

  const handleOpenMenu = () => {
    const event = new KeyboardEvent('keydown', {
      code: 'Space',
      ctrlKey: true,
      metaKey: true
    })

    document.dispatchEvent(event)
  }

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

      <section className='flex items-center gap-4'>
        <Button
          title='Open command menu'
          onClick={handleOpenMenu}
          className='flex items-center gap-1'
        >
          <span className='sr-only'>
            Open command menu (Ctrl + Space or Cmd + Space)
          </span>
          <CommandIcon />+<kbd className='ml-1'>Space</kbd>
        </Button>

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
              title: `Profile of ${user?.username ?? 'Loading...'}`,
              className: 'text-neutral-100 hover:text-neutral-300'
            }}
            className='bg-black border-neutral-700 text-neutral-100'
          >
            <DropdownMenuItem
              className='focus:bg-neutral-950 focus:text-neutral-100'
              asChild
            >
              <Link
                to='/dashboard'
                className='flex items-center gap-2'
                title='Dashboard'
              >
                <LayoutDashboardIcon />
                <DropdownMenuLabel>
                  <span className='sr-only'>Dashboard</span>
                  Dashboard
                </DropdownMenuLabel>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='focus:bg-neutral-950 focus:text-neutral-100'
              asChild
            >
              <Link
                to='/dashboard/create'
                className='flex items-center gap-2'
                title='Create a new slug'
              >
                <PlusSquareIcon />
                <DropdownMenuLabel>
                  <span className='sr-only'>Create a new slug</span>
                  Create a new slug
                </DropdownMenuLabel>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='focus:bg-neutral-950 focus:text-neutral-100'
              asChild
            >
              <Link
                to='/getting-started'
                className='flex items-center gap-2'
                title='Create a temporary slug'
              >
                <ClockIcon />
                <DropdownMenuLabel>
                  <span className='sr-only'>Create a temporary slug</span>
                  Create a temporary slug
                </DropdownMenuLabel>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='focus:bg-neutral-950 focus:text-neutral-100 flex items-center gap-2'
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
      </section>
    </nav>
  )
}
