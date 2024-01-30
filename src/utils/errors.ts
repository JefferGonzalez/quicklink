import { toast } from 'sonner'

export const showToastError = (
  message = 'Something went wrong, please try again later.'
) => {
  toast.error(message, {
    duration: 8000,
    style: {
      width: '110%',
      marginLeft: '-20%'
    },
    action: {
      label: 'Report',
      onClick: () => {
        window.open('https://github.com', '_blank', 'noopener noreferrer')
      }
    }
  })
}
