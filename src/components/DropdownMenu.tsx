import { Button } from '@/components/ui/button'
import {
  DropdownMenu as Dropdown,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { PropsWithChildren } from 'react'

interface ButtonProps {
  text: string
  icon?: JSX.Element
  title?: string
  className?: string
}

interface DropdownMenuProps extends PropsWithChildren {
  button: ButtonProps
  className?: string
}

export default function DropdownMenu({
  button,
  className,
  children: items
}: DropdownMenuProps): JSX.Element {
  const {
    text,
    icon,
    title = text,
    className: buttonClassName = 'text-neutral-400 hover:text-neutral-300'
  } = button

  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <Button className={buttonClassName} title={title}>
          <span className='sr-only'>{text}</span>
          {icon ?? text}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className={className}>
        {items}
      </DropdownMenuContent>
    </Dropdown>
  )
}
