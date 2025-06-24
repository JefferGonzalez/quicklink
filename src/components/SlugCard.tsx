import { APP_URL } from '@/Config'
import DropdownMenu from '@/components/DropdownMenu'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Slug } from '@/types'
import {
  CopyIcon,
  PencilLineIcon,
  QrCodeIcon,
  SettingsIcon,
  TrashIcon
} from 'lucide-react'
import { Fragment, useState } from 'react'
import QRCode from 'react-qr-code'
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
      <article className='bg-neutral-900 border-neutral-950 rounded-lg p-4'>
        <header className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
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
              <button
                onClick={() => handleCopy(slug)}
                title='Copy to clipboard'
              >
                <span className='sr-only'>Copy to clipboard</span>
                <CopyIcon />
              </button>
            )}
          </div>

          <DropdownMenu
            button={{
              text: 'Settings',
              icon: <SettingsIcon className='size-6' />
            }}
            className='bg-black border-neutral-950 text-neutral-100'
          >
            <DropdownMenuItem
              className='focus:bg-neutral-950 focus:text-neutral-100'
              onClick={() => setShowQrCode(true)}
            >
              <QrCodeIcon />
              <DropdownMenuLabel>
                <span className='sr-only'>QR Code</span>
                QR Code
              </DropdownMenuLabel>
            </DropdownMenuItem>

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

      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent className='overflow-hidden p-0 shadow-lg border-neutral-700 '>
          <section className='bg-black w-auto p-8 flex flex-col space-y-4 items-center'>
            <picture title='QR Code'>
              <QRCode
                id={`qr-code-${slug}`}
                bgColor='$000'
                fgColor='#FFF'
                level='H'
                value={url}
              />
            </picture>

            <Button
              type='button'
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
