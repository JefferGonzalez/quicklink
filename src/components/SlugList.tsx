import SlugCard from '@/components/SlugCard'
import SlugPagination from '@/components/SlugPagination'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthContext } from '@/context/AuthContext'
import { deleteSlug, getSlugs } from '@/services/Slugs'
import { Data, Info, Slug } from '@/types'
import { showToastError } from '@/utils/errors'
import { Fragment, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export const MAX_PAGES = 5
const MIN_PAGES = 1

export default function SlugList() {
  const {
    logout,
    auth: { isAuthenticated }
  } = useContext(AuthContext)

  const [{ slugs, info }, setData] = useState<Data>({
    slugs: [],
    info: { pages: 0 }
  })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(MAX_PAGES)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(MIN_PAGES)

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const response = await deleteSlug(id)

      if (!response.ok) {
        const statusCode = response.status

        if (statusCode === 401) logout()
        if (statusCode === 404) {
          toast('🙃 Slug not found, please refresh the page')
        }
        setLoading(false)
        return
      }

      window.location.reload()
    } catch (error) {
      setLoading(false)

      showToastError()
    }
  }

  const handlePageClick = (page: number) => {
    setData({ slugs: [], info: { pages: 0 } })
    setCurrentPage(page)
  }

  const handleNextPage = (page: number) => {
    handlePageClick(page)

    if (page % MAX_PAGES === 0) {
      setMinPageNumberLimit(page + 1)
      if (info.pages - page > MAX_PAGES) {
        setMaxPageNumberLimit(MAX_PAGES)
      } else {
        setMaxPageNumberLimit(info.pages - page)
      }
    }
  }

  const handlePrevPage = (page: number) => {
    handlePageClick(page)

    if ((page + 1) % MAX_PAGES === 0) {
      setMaxPageNumberLimit(MAX_PAGES)
      setMinPageNumberLimit(minPageNumberLimit - MAX_PAGES)
    }
  }

  useEffect(() => {
    const loadSlugs = async () => {
      try {
        const response = await getSlugs(currentPage)

        if (!response.ok) {
          if (response.status === 401) logout()
          return
        }

        const data = await response.json()

        const { data: slugs, info }: { data: Slug[]; info: Info } = data

        setData({ slugs, info })

        setLoading(false)
      } catch (error) {
        setLoading(false)

        showToastError()
      }
    }

    isAuthenticated && loadSlugs()
  }, [isAuthenticated, currentPage])

  return (
    <Fragment>
      <section className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
        {loading && (
          <Fragment>
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index.toString()}
                  className='h-32 bg-neutral-900 border-neutral-950 rounded-lg'
                />
              ))}
          </Fragment>
        )}

        {!loading &&
          slugs
            .sort(({ created_at: a }, { created_at: b }) => {
              return Date.parse(b) - Date.parse(a)
            })
            .map((link) => (
              <SlugCard key={link.id} info={link} handleDelete={handleDelete} />
            ))}
      </section>

      {!loading && slugs.length === 0 && (
        <div className='flex justify-center items-center h-96'>
          <p className='text-xl font-bold'>No slugs found, create one now!</p>
        </div>
      )}

      {info.pages > 1 && (
        <footer className='my-4'>
          <SlugPagination
            pages={info.pages}
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
