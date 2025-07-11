import useAuth from '@/hooks/useAuth'
import LinkIcon from '@/icons/Link'
import DropdownMenu from '@/shared/components/DropdownMenu'
import ThemeToggle from '@/shared/components/ThemeToggle'
import { Button, DropdownMenuItem, DropdownMenuLabel } from '@/shared/ui'
import {
  ClockIcon,
  CommandIcon,
  LayoutDashboardIcon,
  LoaderIcon,
  LogOutIcon,
  PlusSquareIcon,
  UserCogIcon
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const { isAuthenticated, isSessionLoading, user, logout } = useAuth()

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
    <nav className='flex items-center justify-between backdrop-blur-sm sticky py-4 top-0 z-40'>
      <Link
        to='/'
        className='text-xs sm:text-base md:text-xl flex items-center gap-2'
        title='QuickLink | URL Shortener'
      >
        <span className='sr-only'>QuickLink | URL Shortener</span>
        <LinkIcon className='size-8' />
        QuickLink | URL Shortener
      </Link>

      <section className='flex items-center gap-4'>
        <ThemeToggle />

        <Button
          title='Open command menu'
          onClick={handleOpenMenu}
          className='hidden sm:flex items-center gap-1'
        >
          <span className='sr-only'>
            Open command menu (Ctrl + Space or Cmd + Space)
          </span>
          <CommandIcon />+<kbd className='ml-1'>Space</kbd>
        </Button>

        {pathname !== '/auth' && !isAuthenticated && (
          <Link to='/auth' className='text-sm' title='Sign in'>
            <Button className='flex gap-x-2'>
              {isSessionLoading && (
                <LoaderIcon className='transition-all duration-300 animate-spin' />
              )}
              <span className='sr-only'>Sign in</span>
              Sign in
            </Button>
          </Link>
        )}

        {isAuthenticated && user && (
          <DropdownMenu
            button={{
              text: user.username,
              title: `Profile of ${user.username}`
            }}
          >
            <DropdownMenuItem asChild>
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

            <DropdownMenuItem asChild>
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

            <DropdownMenuItem asChild>
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

            <DropdownMenuItem asChild>
              <Link
                to='/profile'
                className='flex items-center gap-2'
                title='Settings'
              >
                <UserCogIcon />
                <DropdownMenuLabel>
                  <span className='sr-only'>Settings</span>
                  Settings
                </DropdownMenuLabel>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={logout}>
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
