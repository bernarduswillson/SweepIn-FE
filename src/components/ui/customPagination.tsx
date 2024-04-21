import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface paginationProps {
  page: number
  totalItem: number
  perPage: number
  onChange: (page: number) => void
}

const customPagination = (props: paginationProps): JSX.Element => {
  let { page, totalItem, perPage, onChange } = props
  let totalPage = Math.floor((totalItem - 1) / perPage) + 1
  let newPage

  const handlePageChange = (page: number) => {
    newPage = page
    onChange(newPage)
  }

  return (
    <Pagination className="mt-20 mb-24">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>
        )}
        {page > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page == totalPage && totalPage > 3 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(page - 2)}>
              {page - 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {page < totalPage && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page == 1 && totalPage > 3 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(page + 2)}>
              {page + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < totalPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page < totalPage - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(totalPage)}>
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < totalPage && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default customPagination
