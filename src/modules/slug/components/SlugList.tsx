import useAuth from '@/hooks/useAuth'
import SlugCard from '@/modules/slug/components/SlugCard'
import SlugPagination from '@/modules/slug/components/SlugPagination'
import { SlugsResponse } from '@/modules/slug/types/response'
import { getAllSlugs, removeSlug } from '@/modules/slug/use-cases'
import { HttpStatus } from '@/shared/constants/httpStatus'
import { Skeleton } from '@/shared/ui'
import { showToastError } from '@/shared/utils/showToastError'
import { Fragment, useEffect, useState } from 'react'
import { toast } from 'sonner'

export const MAX_PAGES = 5
const MIN_PAGES = 1

export default function SlugList() {
  const { isAuthenticated, logout } = useAuth()

  const [slugs, setSlugs] = useState<SlugsResponse>({
    data: [],
    info: { pages: 0 }
  })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(MIN_PAGES)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(MAX_PAGES)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(MIN_PAGES)

  const handleDelete = async (id: string) => {
    setLoading(true)

    try {
      const response = await removeSlug(id)

      if (!response.ok) {
        const statusCode = response.status

        if (statusCode === HttpStatus.Unauthorized) return logout()

        if (statusCode === HttpStatus.NotFound) {
          toast('🙃 Slug not found, please refresh the page')
          return
        }

        return
      }
    } catch {
      showToastError()
    } finally {
      setLoading(false)
    }
  }

  const handlePageClick = (page: number) => {
    setLoading(true)
    setSlugs({ data: [], info: { pages: 0 } })
    setCurrentPage(page)
  }

  const handleNextPage = (nextPage: number) => {
    handlePageClick(nextPage)

    const prevPage = nextPage - 1
    const isLimitReached = prevPage % MAX_PAGES === 0

    if (isLimitReached) {
      setMinPageNumberLimit(nextPage)

      const remainingPages = slugs.info.pages - prevPage

      if (remainingPages > MAX_PAGES) {
        setMaxPageNumberLimit(MAX_PAGES)
      } else {
        setMaxPageNumberLimit(remainingPages)
      }
    }
  }

  const handlePrevPage = (prevPage: number) => {
    handlePageClick(prevPage)

    const isLimitReached = prevPage % MAX_PAGES === 0

    if (isLimitReached) {
      setMaxPageNumberLimit(MAX_PAGES)
      setMinPageNumberLimit(minPageNumberLimit - MAX_PAGES)
    }
  }

  useEffect(() => {
    const loadSlugs = async () => {
      try {
        const response = await getAllSlugs(currentPage)

        if (!response.ok) {
          if (response.status === HttpStatus.Unauthorized) logout()
          return
        }

        setSlugs(response.data)
      } catch {
        showToastError()
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      loadSlugs()
    }
  }, [isAuthenticated, currentPage])

  return (
    <Fragment>
      <section className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
        {loading && (
          <Fragment>
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index.toString()} className='h-32 rounded-lg' />
              ))}
          </Fragment>
        )}

        {!loading &&
          slugs.data
            .sort(({ created_at: a }, { created_at: b }) => {
              return Date.parse(b) - Date.parse(a)
            })
            .map((link) => (
              <SlugCard key={link.id} info={link} handleDelete={handleDelete} />
            ))}
      </section>

      {!loading && slugs.data.length === 0 && (
        <div className='flex justify-center items-center h-96'>
          <p className='text-xl font-bold'>No slugs found, create one now!</p>
        </div>
      )}

      {slugs.info.pages > MIN_PAGES && (
        <footer className='my-4'>
          <SlugPagination
            pages={slugs.info.pages}
            currentPage={currentPage}
            maxPageNumberLimit={maxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            handlePageClick={handlePageClick}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </footer>
      )}
    </Fragment>
  )
}
