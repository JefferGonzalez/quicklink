import { APP_URL } from '@/Config'
import DropdownMenu from '@/components/DropdownMenu'
import {
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Slug } from '@/types'
import { CopyIcon, PencilLineIcon, SettingsIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const ALLOW_COPY = !!window.navigator.clipboard

interface SlugCardProps {
  info: Slug
  handleDelete: (id: string) => void
}

export default function SlugCard({
  info: { id, slug, url, description = 'No description' },
  handleDelete
}: SlugCardProps) {
  const handleCopy = (slug: string) => {
    const link = `${APP_URL}/${slug}`
    window.navigator.clipboard.writeText(link)

    toast('👻 Copied to clipboard')
  }

  return (
    <article className='bg-neutral-900 border-neutral-950 rounded-lg p-4'>
      <header className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <a
            href={`${APP_URL}/${slug}`}
            className='text-2xl'
            target='_blank'
            rel='noopener noreferrer'
            title='Open in new tab'
          >
            {`/${slug}`}
          </a>
          {ALLOW_COPY && (
            <button onClick={() => handleCopy(slug)} title='Copy to clipboard'>
              <span className='sr-only'>Copy to clipboard</span>
              <CopyIcon />
            </button>
          )}
        </div>

        <DropdownMenu
          button={{
            text: 'Settings',
            icon: <SettingsIcon />
          }}
          className='bg-black border-neutral-950 text-neutral-100'
        >
          {ALLOW_COPY && (
            <DropdownMenuItem
              className='focus:bg-neutral-950 focus:text-neutral-100'
              title='Copy'
              onClick={() => handleCopy(slug)}
            >
              <CopyIcon />
              <DropdownMenuLabel>
                <span className='sr-only'>Copy</span>
                Copy
              </DropdownMenuLabel>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className='focus:bg-neutral-950 focus:text-neutral-100'
            asChild
          >
            <Link to={`/dashboard/edit/${id}`} title='Edit' className='flex'>
              <PencilLineIcon />
              <DropdownMenuLabel>
                <span className='sr-only'>Edit</span>
                Edit
              </DropdownMenuLabel>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className='focus:bg-neutral-950 focus:text-neutral-100'
            title='Delete'
            onClick={() => handleDelete(id)}
          >
            <TrashIcon />
            <DropdownMenuLabel>
              <span className='sr-only'>Delete</span>
              Delete
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenu>
      </header>

      <p className='text-neutral-400 text-sm text-pretty break-all mb-2'>
        {url}
      </p>

      <p className='text-pretty'>{description}</p>
    </article>
  )
}
