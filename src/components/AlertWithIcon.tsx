import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertTriangleIcon, CheckIcon } from 'lucide-react'

interface AlertWithIconProps {
  type: 'destructive' | 'default'
  text?: string
}

const icons = {
  destructive: <AlertTriangleIcon />,
  default: <CheckIcon />
}

export default function AlertWithIcon({ type, text }: AlertWithIconProps) {
  return (
    <Alert variant={type}>
      {icons[type]}
      <AlertTitle>{text}</AlertTitle>
    </Alert>
  )
}
