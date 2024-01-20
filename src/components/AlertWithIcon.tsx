import { Alert } from '@/components/ui/alert'
import { AlertTriangleIcon, CheckIcon } from 'lucide-react'

interface AlertIconProps {
  type: 'destructive' | 'success'
  text?: string
}

export default function AlertWithIcon({ type, text }: AlertIconProps) {
  const variant = type === 'destructive' ? 'destructive' : 'default'

  const className = 'bg-transparent border-green-800 text-green-800'

  return (
    <Alert variant={variant} className={variant === 'default' ? className : ''}>
      <span className='flex gap-2'>
        {type === 'destructive' ? <AlertTriangleIcon /> : <CheckIcon />}
        {text}
      </span>
    </Alert>
  )
}
