import { cn } from '@/shared/utils/cn'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn(
        'bg-neutral-100 border border-neutral-200 animate-pulse rounded-md dark:bg-neutral-900 dark:border-neutral-800',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
