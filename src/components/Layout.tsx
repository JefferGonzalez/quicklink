import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from '@/components/ui/command'
import { AuthContext } from '@/context/AuthContext'
import GitHubIcon from '@/icons/GitHub'
import {
  ClockIcon,
  CommandIcon,
  LayoutDashboardIcon,
  PlusSquareIcon
} from 'lucide-react'
import {
  Fragment,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'

interface LayoutProps extends PropsWithChildren {}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const {
    auth: { isAuthenticated }
  } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  const createSlugPage = isAuthenticated
    ? '/dashboard/create'
    : '/getting-started'

  const navigate = useNavigate()

  const handleNavigate = (path: string) => navigate(path)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      } else if (e.code === 'KeyS' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleNavigate(createSlugPage)
      } else if (e.code === 'KeyM' && (e.metaKey || e.ctrlKey)) {
        if (isAuthenticated) {
          e.preventDefault()
          handleNavigate('/dashboard')
        }
      } else if (e.code === 'KeyX' && (e.metaKey || e.ctrlKey)) {
        if (isAuthenticated) {
          e.preventDefault()
          handleNavigate('/getting-started')
        }
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isAuthenticated])

  return (
    <Fragment>
      <main className='container max-w-[1100px]'>
        <NavBar />
        {children}
      </main>

      <Footer />

      <CommandDialog
        className='bg-black text-neutral-100'
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder='Select a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions' className='text-neutral-100'>
            <CommandItem
              title='Create a new slug'
              className='cursor-pointer'
              onSelect={() => handleNavigate(createSlugPage)}
            >
              <span className='sr-only'>Create a new slug</span>
              <PlusSquareIcon className='mr-2 h-4 w-4' />
              Create a new slug
              <CommandShortcut className='flex items-center gap-1'>
                <CommandIcon /> + <kbd>S</kbd>
              </CommandShortcut>
            </CommandItem>
            {isAuthenticated && (
              <Fragment>
                <CommandItem
                  title='Create a temporary slug'
                  className='cursor-pointer'
                  onSelect={() => handleNavigate('/getting-started')}
                >
                  <span className='sr-only'>Create a temporary slug</span>
                  <ClockIcon className='mr-2 h-4 w-4' />
                  Create a temporary slug
                  <CommandShortcut className='flex items-center gap-1'>
                    <CommandIcon /> + <kbd>X</kbd>
                  </CommandShortcut>
                </CommandItem>
                <CommandItem
                  title='Dashboard'
                  className='cursor-pointer'
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
            <CommandItem
              title='Repository'
              className='cursor-pointer'
              onSelect={() =>
                window.open(
                  'https://github.com/JefferGonzalez/quicklink',
                  '_blank',
                  'noopener noreferrer'
                )
              }
            >
              <span className='sr-only'>Repository</span>
              <GitHubIcon className='mr-2 h-4 w-4' />
              Repository
              <CommandShortcut className='flex items-center gap-1'>
                <CommandIcon /> + <kbd>G</kbd>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Toaster theme='dark' duration={2500} />
    </Fragment>
  )
}
