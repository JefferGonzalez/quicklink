import useAuth from '@/hooks/useAuth'
import GitHubIcon from '@/icons/GitHub'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from '@/shared/ui'
import {
  ClockIcon,
  CommandIcon,
  LayoutDashboardIcon,
  PlusSquareIcon
} from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Command() {
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth()

  const createShortLinkPage = isAuthenticated
    ? '/dashboard/create'
    : '/getting-started'

  const [open, setOpen] = useState(false)

  const handleNavigate = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  const handleGoToRepository = () => {
    window.open(
      'https://github.com/JefferGonzalez/quicklink',
      '_blank',
      'noopener noreferrer'
    )
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      } else if (e.code === 'KeyS' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleNavigate(createShortLinkPage)
      } else if (e.code === 'KeyM' && (e.metaKey || e.ctrlKey)) {
        if (isAuthenticated) {
          e.preventDefault()
          handleNavigate('/dashboard')
        }
      } else if (e.code === 'KeyQ' && (e.metaKey || e.ctrlKey)) {
        if (isAuthenticated) {
          e.preventDefault()
          handleNavigate('/getting-started')
        }
      } else if (e.code === 'KeyB' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleGoToRepository()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isAuthenticated])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Select a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Suggestions'>
          <CommandItem
            title='Create a new short link'
            onSelect={() => handleNavigate(createShortLinkPage)}
          >
            <span className='sr-only'>Create a new short link</span>
            <PlusSquareIcon className='mr-2 h-4 w-4' />
            Create a new short link
            <CommandShortcut className='flex items-center gap-1'>
              <CommandIcon /> + <kbd>S</kbd>
            </CommandShortcut>
          </CommandItem>

          {isAuthenticated && (
            <Fragment>
              <CommandItem
                title='Create a temporary short link'
                onSelect={() => handleNavigate('/getting-started')}
              >
                <span className='sr-only'>Create a temporary short link</span>
                <ClockIcon className='mr-2 h-4 w-4' />
                Create a temporary short link
                <CommandShortcut className='flex items-center gap-1'>
                  <CommandIcon /> + <kbd>Q</kbd>
                </CommandShortcut>
              </CommandItem>

              <CommandItem
                title='Dashboard'
                onSelect={() => handleNavigate('/dashboard')}
              >
                <span className='sr-only'>Dashboard</span>
                <LayoutDashboardIcon className='mr-2 h-4 w-4' />
                Dashboard
                <CommandShortcut className='flex items-center gap-1'>
                  <CommandIcon /> + <kbd>M</kbd>
                </CommandShortcut>
              </CommandItem>
            </Fragment>
          )}

          <CommandItem title='Repository' onSelect={handleGoToRepository}>
            <span className='sr-only'>Repository</span>
            <GitHubIcon className='mr-2 h-4 w-4' />
            Repository
            <CommandShortcut className='flex items-center gap-1'>
              <CommandIcon /> + <kbd>B</kbd>
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
