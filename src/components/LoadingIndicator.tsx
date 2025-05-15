import { LoaderIcon } from 'lucide-react'

interface Props {
  message?: string
}

export default function LoadingIndicator({ message = 'Loading...' }: Props) {
  return (
    <section className='flex justify-center items-center py-32'>
      <div
        className='flex items-center gap-3 text-3xl'
        role='status'
        aria-live='polite'
      >
        <LoaderIcon className='size-10 animate-spin transition-all duration-300' />
        <span>{message}</span>
      </div>
    </section>
  )
}
