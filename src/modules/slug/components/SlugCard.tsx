import { APP_URL } from '@/Config'
import { SlugEntity } from '@/modules/slug/entities/Slug'
import DropdownMenu from '@/shared/components/DropdownMenu'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/shared/ui'
import { QRCode } from '@/shared/utils/QRCode'
import {
  CopyIcon,
  PencilLineIcon,
  QrCodeIcon,
  SettingsIcon,
  TrashIcon
} from 'lucide-react'
import { Fragment, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const ALLOW_COPY = !!window.navigator.clipboard

interface Props {
  info: SlugEntity
  handleDelete: (id: string) => void
}

export default function SlugCard({
  info: { id, slug, url, description = 'No description' },
  handleDelete
}: Props) {
  const [showQrCode, setShowQrCode] = useState(false)

  const handleCopy = (slug: string) => {
    const link = `${APP_URL}/s/${slug}`
    window.navigator.clipboard.writeText(link)

    toast('👻 Copied to clipboard')
  }

  const handleDownload = (slug: string) => {
    const qrCode = document.getElementById(`qr-code-${slug}`) as HTMLElement
    const data = new XMLSerializer().serializeToString(qrCode)

    const canvas = document.createElement('canvas') as HTMLCanvasElement
    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    const img = new Image()

    img.src = `data:image/svg+xml;base64,${window.btoa(data)}`

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      context.drawImage(img, 0, 0)

      const file = canvas.toDataURL('image/png')
      const anchor = document.createElement('a')
      anchor.download = 'QRCode'
      anchor.href = `${file}`
      anchor.click()
    }
  }

  return (
    <Fragment>
      <article className='bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-lg p-4'>
        <header className='flex justify-between items-center'>
          <div className='flex items-center gap-x-2'>
            <a
              href={`${APP_URL}/s/${slug}`}
              className='text-2xl'
              target='_blank'
              rel='noopener noreferrer'
              title='Open in new tab'
            >
              {`/s/${slug}`}
            </a>

            {ALLOW_COPY && (
              <Button
                title='Copy to clipboard'
                onClick={() => handleCopy(slug)}
                size='icon'
              >
                <span className='sr-only'>Copy to clipboard</span>
                <CopyIcon />
              </Button>
            )}
          </div>

          <DropdownMenu
            button={{
              text: 'Settings',
              icon: <SettingsIcon />
            }}
          >
            <DropdownMenuItem onClick={() => setShowQrCode(true)}>
              <QrCodeIcon />
              <DropdownMenuLabel>
                <span className='sr-only'>QR Code</span>
                QR Code
              </DropdownMenuLabel>
            </DropdownMenuItem>

            {ALLOW_COPY && (
              <DropdownMenuItem title='Copy' onClick={() => handleCopy(slug)}>
                <CopyIcon />
                <DropdownMenuLabel>
                  <span className='sr-only'>Copy</span>
                  Copy
                </DropdownMenuLabel>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <Link to={`/dashboard/edit/${id}`} title='Edit' className='flex'>
                <PencilLineIcon />
                <DropdownMenuLabel>
                  <span className='sr-only'>Edit</span>
                  Edit
                </DropdownMenuLabel>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem title='Delete' onClick={() => handleDelete(id)}>
              <TrashIcon />
              <DropdownMenuLabel>
                <span className='sr-only'>Delete</span>
                Delete
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenu>
        </header>

        <p className='text-neutral-500 text-sm text-pretty break-all mb-2 dark:text-neutral-400'>
          {url}
        </p>

        <p className='text-pretty'>{description}</p>
      </article>

      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent className='overflow-hidden p-0 shadow-lg'>
          <section className='p-8 flex flex-col items-center gap-y-4'>
            <DialogTitle className='text-2xl font-bold'>
              QR Code for <span className='text-pretty'>/s/{slug}</span>
            </DialogTitle>

            <DialogDescription className='text-pretty p-2 rounded-md bg-neutral-800'>
              Scan the QR code or download it for later use.
            </DialogDescription>

            <picture
              className='border rounded-md p-2 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800'
              title='QR Code'
            >
              <Suspense
                fallback={
                  <div className='animate-spin rounded-full border-4 border-t-transparent h-12 w-12' />
                }
              >
                <QRCode
                  id={`qr-code-${slug}`}
                  bgColor='$000'
                  fgColor='#FFF'
                  level='H'
                  value={url}
                />
              </Suspense>
            </picture>

            <Button
              type='button'
              variant='secondary'
              title='Download QR Code'
              onClick={() => handleDownload(slug)}
            >
              Download
            </Button>
          </section>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
