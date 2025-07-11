import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-neutral-950 focus-visible:ring-neutral-950/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
  { 
    variants: {
      variant: {
        default:
          'bg-neutral-50 text-neutral-900 border border-neutral-200 hover:bg-neutral-200 shadow-xs dark:bg-neutral-900 dark:text-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-950/90',
        destructive:
          'text-white shadow-xs bg-red-500 hover:bg-red-500/90 focus-visible:ring-red-500/20',
        outline:
          'border bg-white shadow-xs hover:bg-neutral-100 hover:text-neutral-900 dark:bg-neutral-200/30 dark:border-neutral-200 dark:hover:bg-neutral-200/50 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:dark:bg-neutral-800/30 dark:dark:border-neutral-800 dark:dark:hover:bg-neutral-800/50',
        secondary:
          'bg-neutral-800 text-neutral-50 hover:bg-neutral-800/80 shadow-xs dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-100/80',
        ghost:
          'hover:bg-neutral-100/50 hover:bg-neutral-800 hover:text-neutral-50 hover:bg-neutral-800/50 dark:hover:bg-neutral-100 dark:hover:text-neutral-900',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50'
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
