import { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  sort?: string
  totalPages: number
  currentPage: number
  search?: string
  category?: string
}

export const Pagination: FC<Props> = ({
  sort,
  search,
  category,
  totalPages,
  currentPage,
}) => {
  const pagesCount = []
  for (let i = 1; i <= totalPages; i++) {
    pagesCount.push(i)
  }

  return (
    <div className='w-full mt-10'>
      {totalPages > 0 && (
        <ul className='mx-auto flex justify-center'>
          {currentPage > 4 && (
            <>
              <li className='h-10 w-10 flex items-center justify-center'>
                <Link
                  className='h-full w-full flex items-center justify-center'
                  href={{
                    pathname: '/products',
                    query: {
                      category,
                      page: 1,
                      ...(search ? { search: search } : {}),
                      ...(sort ? { sort: sort } : {}),
                    },
                  }}
                >
                  1
                </Link>
              </li>
              {currentPage - 1 === 4 ? null : (
                <li className='h-7 w-7 flex items-center justify-center'>
                  <span>...</span>
                </li>
              )}
            </>
          )}
          {pagesCount.map(
            (pageNumber, i) =>
              pageNumber < currentPage + 4 &&
              pageNumber > currentPage - 4 && (
                <li
                  className={cn(
                    'h-10 w-10 flex items-center justify-center mx-1',
                    {
                      'text-2xl border-b border-borderColor':
                        pageNumber === currentPage,
                    },
                  )}
                  key={i}
                >
                  <Link
                    className={cn(
                      'h-full w-full flex items-center justify-center',
                      {
                        'hover:text-textHover': pageNumber !== currentPage,
                      },
                    )}
                    href={{
                      pathname: '/products',
                      query: {
                        category,
                        page: pageNumber,
                        ...(search ? { search: search } : {}),
                        ...(sort ? { sort: sort } : {}),
                      },
                    }}
                  >
                    {pageNumber}
                  </Link>
                </li>
              ),
          )}

          {totalPages - currentPage > 3 && (
            <>
              {totalPages - currentPage === 4 ? null : (
                <li className='h-7 w-7 flex items-center justify-center'>
                  <span>...</span>
                </li>
              )}

              <li className='h-10 w-10 flex items-center justify-center cursor-pointer'>
                <Link
                  className='h-full w-full flex items-center justify-center'
                  href={{
                    pathname: '/products',
                    query: {
                      category,
                      page: totalPages,
                      ...(search ? { search: search } : {}),
                      ...(sort ? { sort: sort } : {}),
                    },
                  }}
                >
                  {totalPages}
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  )
}
