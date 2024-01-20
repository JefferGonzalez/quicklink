import { Alert } from '@/components/ui/alert'
import AlertIcon from '@/icons/Alert'
import CheckIcon from '@/icons/Check'

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
        {type === 'destructive' ? <AlertIcon /> : <CheckIcon />}
        {text}
      </span>
    </Alert>
  )
}
