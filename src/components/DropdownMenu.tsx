import {
  DropdownMenu as Dropdown,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { PropsWithChildren } from 'react'

interface DropdownMenuProps extends PropsWithChildren {
  button: JSX.Element
  className?: string
}

export default function DropdownMenu({
  button,
  className,
  children: items
}: DropdownMenuProps): JSX.Element {
  return (
    <Dropdown>
      <DropdownMenuTrigger>{button}</DropdownMenuTrigger>
      <DropdownMenuContent className={className}>{items}</DropdownMenuContent>
    </Dropdown>
  )
}
