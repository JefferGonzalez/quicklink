import useTheme from '@/hooks/useTheme'
import DropdownMenu from '@/shared/components/DropdownMenu'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/shared/ui'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { Fragment } from 'react'

export default function ThemeToggle() {
  const { toggleTheme } = useTheme()

  return (
    <DropdownMenu
      button={{
        text: 'Toggle theme',
        title: 'Toggle theme',
        icon: (
          <Fragment>
            <SunIcon className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
            <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          </Fragment>
        )
      }}
    >
      <DropdownMenuLabel className='font-normal'>
        <p className='text-sm font-medium leading-none'>Theme</p>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={() => toggleTheme('light')}>
        <SunIcon />
        <DropdownMenuLabel>
          <span className='sr-only'>Light</span>
          Light
        </DropdownMenuLabel>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => toggleTheme('dark')}>
        <MoonIcon />
        <DropdownMenuLabel>
          <span className='sr-only'>Dark</span>
          Dark
        </DropdownMenuLabel>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => toggleTheme('system')}>
        <MonitorIcon />
        <DropdownMenuLabel>
          <span className='sr-only'>System</span>
          System
        </DropdownMenuLabel>
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
