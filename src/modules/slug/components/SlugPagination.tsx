import { MAX_PAGES } from '@/modules/slug/components/SlugList'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/shared/ui'
import { cn } from '@/shared/utils/cn'

interface Props {
  pages: number
  currentPage: number
  minPageNumberLimit: number
  maxPageNumberLimit: number
  handlePageClick: (page: number) => void
  handleNextPage: (page: number) => void
  handlePrevPage: (page: number) => void
}

export default function SlugPagination({
  pages,
  currentPage,
  minPageNumberLimit,
  maxPageNumberLimit,
  handlePageClick,
  handleNextPage,
  handlePrevPage
}: Props) {
  const visiblePageNumbers =
    pages > MAX_PAGES
      ? Array.from(
          { length: maxPageNumberLimit },
          (_, index) => index + minPageNumberLimit
        )
      : Array.from({ length: pages }, (_, index) => index + 1)

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePrevPage(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {visiblePageNumbers.map((page) => {
          const isActive = page === currentPage

          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={isActive}
                className={cn(isActive && 'cursor-not-allowed')}
                onClick={!isActive ? () => handlePageClick(page) : undefined}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {currentPage < pages && (
          <PaginationItem>
            <PaginationNext onClick={() => handleNextPage(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
