'use client'
import { FC } from 'react'
import Link from 'next/link'
import { Search } from '@/components/client/Search'
import { Sort } from '@/components/client/Sort'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type CategoryTab = {
  id: string
  title: string
  href: string
  count: number
  current: boolean
}
type Props = {
  sort?: string
  search?: string
  currentPage: number
  currentCategory: string
  categoryTabs: CategoryTab[]
}
export const SortAndSearchPanel: FC<Props> = ({
  sort,
  search,
  currentPage,
  categoryTabs,
  currentCategory,
}) => {
  const router = useRouter()

  // TODO: Нужно ли сбрасывать все фильтры при смене категории ???

  return (
    <div className='flex flex-col lg:flex-row items-center justify-between w-full'>
      <div className='hidden lg:block'>
        <div className=''>
          <nav className='flex space-x-8' aria-label='Tabs'>
            {categoryTabs.map((tab) => (
              <Link
                key={tab.title}
                href={`/products?category=${tab.title}&page=1`}
                className={cn(
                  'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm border-transparent',
                  {
                    'border-accent text-accent': tab.current,
                    'hover:border-accent': !tab.current,
                  },
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.title}
                <span className='ml-3 hidden rounded-full py-0.5 px-2.5 text-xs md:inline-block bg-accent/10'>
                  {tab.count}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className='mt-5 lg:mt-0 w-full lg:w-[400px]'>
        <div className='flex'>
          <Search
            search={search}
            currentCategory={currentCategory}
            sort={sort}
            currentPage={currentPage}
          />
          <Sort
            search={search}
            currentCategory={currentCategory}
            currentSort={sort}
            currentPage={currentPage}
          />
          <div className='lg:hidden'>
            <select
              onChange={(e) =>
                router.push(`/products?category=${e.target.value}`)
              }
              id='tabs'
              name='tabs'
              className='block remove-tw-outline border border-l-0 rounded-r-md border-borderColor focus:border-borderColor items-center gap-x-1.5 px-3 text-sm pr-10 hover:bg-lightGray cursor-pointer'
              defaultValue={'All'}
            >
              {categoryTabs.map((tab) => (
                <option key={tab.id} value={tab.title}>
                  {tab.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
