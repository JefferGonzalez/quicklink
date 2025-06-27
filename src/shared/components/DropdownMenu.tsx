import {
  Button,
  DropdownMenu as Dropdown,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/shared/ui'
import { PropsWithChildren } from 'react'

interface ButtonProps {
  text: string
  icon?: React.ReactNode
  title?: string
  className?: string
}

interface Props extends PropsWithChildren {
  button: ButtonProps
  className?: string
}

export default function DropdownMenu({
  button,
  className,
  children: items
}: Props) {
  const {
    text,
    icon,
    title = text,
    className: buttonClassName = 'hover:bg-neutral-800 focus:bg-neutral-800'
  } = button

  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <Button
          className={buttonClassName}
          title={title}
          size={icon ? 'icon' : 'default'}
        >
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
