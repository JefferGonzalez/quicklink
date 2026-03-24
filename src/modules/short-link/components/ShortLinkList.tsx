import useAuth from '@/hooks/useAuth'
import ShortLinkCard from '@/modules/short-link/components/ShortLinkCard'
import ShortLinkPagination from '@/modules/short-link/components/ShortLinkPagination'
import { ShortLinksResponse } from '@/modules/short-link/types/response'
import {
  getAllShortLinks,
  removeShortLink
} from '@/modules/short-link/use-cases'
import { HttpStatus } from '@/shared/constants/httpStatus'
import { Skeleton } from '@/shared/ui'
import { showToastError } from '@/shared/utils/showToastError'
import { Fragment, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const MAX_PAGES = 5
const MIN_PAGES = 1

export default function ShortLinkList() {
  const { isAuthenticated, signOut } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const [shortLinks, setShortLinks] = useState<ShortLinksResponse>({
    data: [],
    info: { pages: 0 }
  })
  const [loading, setLoading] = useState(true)

  const rawPage = searchParams.get('page')
  const parsedPage = Number(rawPage)
  const isValid = rawPage && Number.isInteger(parsedPage) && parsedPage >= 1
  const currentPage = isValid ? parsedPage : MIN_PAGES

  const totalPages = shortLinks.info.pages

  const minPageNumberLimit =
    Math.floor((currentPage - 1) / MAX_PAGES) * MAX_PAGES + 1

  const maxPageNumberLimit = Math.min(
    MAX_PAGES,
    totalPages - minPageNumberLimit + 1
  )

  const handleDelete = async (id: string) => {
    setLoading(true)

    try {
      const response = await removeShortLink(id)

      if (!response.ok) {
        const statusCode = response.status

        if (statusCode === HttpStatus.Unauthorized) {
          return signOut()
        }

        if (statusCode === HttpStatus.NotFound) {
          toast('🙃 Short link not found, please refresh the page')
          return
        }

        return
      }

      window.location.reload()
    } catch {
      showToastError()
    } finally {
      setLoading(false)
    }
  }

  const handlePageClick = (page: number) => {
    setLoading(true)
    setShortLinks({ data: [], info: { pages: 0 } })
    setSearchParams({ page: String(page) })
  }

  useEffect(() => {
    const loadShortLinks = async () => {
      if (!isValid) {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('page', String(MIN_PAGES))
        setSearchParams(newParams, { replace: true })
        return
      }

      try {
        const response = await getAllShortLinks(currentPage)
        if (!response.ok) {
          if (response.status === HttpStatus.Unauthorized) {
            signOut()
          }

          return
        }

        const data = response.data
        const totalPages = data.info.pages

        if (currentPage > totalPages && totalPages > 0) {
          const newParams = new URLSearchParams(searchParams)
          newParams.set('page', String(totalPages))
          setSearchParams(newParams, { replace: true })
          return
        }

        setShortLinks(data)
      } catch {
        showToastError()
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadShortLinks()
    }
  }, [isAuthenticated, searchParams])

  return (
    <Fragment>
      <section className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
        {loading && (
          <Fragment>
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className='h-28 rounded-lg' />
            ))}
          </Fragment>
        )}

        {!loading &&
          shortLinks.data
            .sort(({ created_at: a }, { created_at: b }) => {
              return Date.parse(b) - Date.parse(a)
            })
            .map((link) => (
              <ShortLinkCard
                key={link.id}
                info={link}
                handleDelete={handleDelete}
              />
            ))}
      </section>

      {!loading && shortLinks.info.pages === 0 && (
        <div className='flex justify-center items-center h-96'>
          <p className='text-xl font-bold'>
            No short links found, create one now!
          </p>
        </div>
      )}

      {shortLinks.info.pages > 1 && (
        <footer className='my-4'>
          <ShortLinkPagination
            pages={shortLinks.info.pages}
            currentPage={currentPage}
            maxPageNumberLimit={maxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            onPageChange={handlePageClick}
          />
        </footer>
      )}
    </Fragment>
  )
}
