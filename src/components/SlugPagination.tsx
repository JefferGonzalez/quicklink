import { MAX_PAGES } from '@/components/SlugList'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface SlugPaginationProps {
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
}: SlugPaginationProps): JSX.Element {
  const PAGINATION_ITEMS =
    pages > MAX_PAGES
      ? Array.from(
          { length: maxPageNumberLimit },
          (_, index) => index + minPageNumberLimit
        )
      : Array.from({ length: pages }, (_, index) => index + 1)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem hidden={currentPage === 0}>
          <PaginationPrevious onClick={() => handlePrevPage(currentPage - 1)} />
        </PaginationItem>
        {PAGINATION_ITEMS.map((item, index) => (
          <PaginationItem key={index.toString()}>
            <PaginationLink
              isActive={item - 1 === currentPage}
              className={
                item - 1 === currentPage
                  ? 'text-neutral-900'
                  : 'text-neutral-500 cursor-pointer'
              }
              onClick={() =>
                item - 1 !== currentPage && handlePageClick(item - 1)
              }
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem hidden={currentPage === pages - 1}>
          <PaginationNext onClick={() => handleNextPage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
