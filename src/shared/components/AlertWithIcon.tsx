import { Alert, AlertTitle } from '@/shared/ui'
import { AlertTriangleIcon, CheckIcon } from 'lucide-react'

interface Props {
  type: 'destructive' | 'default'
  text?: string
}

const icons = {
  destructive: <AlertTriangleIcon />,
  default: <CheckIcon />
}

export default function AlertWithIcon({ type, text }: Props) {
  return (
    <Alert variant={type}>
      {icons[type]}
      <AlertTitle>{text}</AlertTitle>
    </Alert>
  )
}
