'use client'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'

const sortTabs = [
  {
    name: 'Sort',
    current: true,
    value: 'default',
  },
  {
    name: 'Name A - Z',
    current: false,
    value: 'a-z',
  },
  {
    name: 'Name Z - A',
    current: false,
    value: 'z-a',
  },
  {
    name: 'Price ascending',
    current: false,
    value: 'price-asc',
  },
  {
    name: 'Price descending',
    current: false,
    value: 'price-desc',
  },
]

type Props = {
  search?: string
  currentPage: number
  currentSort?: string
  currentCategory: string
}

export const Sort: FC<Props> = ({
  search,
  currentSort,
  currentPage,
  currentCategory,
}) => {
  const [value, setValue] = useState<string>()
  const router = useRouter()

  const initialRender = useRef(true)
  const categoryRef = useRef('')

  useEffect(() => {
    if (currentSort) {
      // Check if currentSort is in the sortTabs.value
      const isInTabs = sortTabs.find((t) => t.value === currentSort)
      if (!isInTabs) {
        setValue('default')
      } else {
        setValue(currentSort)
      }
    } else {
      setValue('default')
    }
  }, [currentSort])

  useEffect(() => {
    // On initial render, set initialRender and current category value
    if (initialRender.current) {
      initialRender.current = false
      categoryRef.current = currentCategory
      return
    }

    // Reset search if category has changed
    if (categoryRef.current !== currentCategory) {
      setValue('default')
      categoryRef.current = currentCategory
      return
    }

    // If not initial render, and category didn't change update query string
    let url: string
    if (value === 'default') {
      url = `/products?category=${currentCategory}&page=${currentPage}${
        search ? `&search=${search}` : ''
      }`
    } else {
      url = `/products?category=${currentCategory}&page=${currentPage}${
        search ? `&search=${search}` : ''
      }&sort=${value}`
    }

    router.push(url)
  }, [value, currentCategory, router, search, currentPage])

  return (
    <div className=''>
      <select
        onChange={(e) => setValue(e.target.value)}
        id='tabs'
        name='tabs'
        className='block remove-tw-outline items-center gap-x-1.5 border border-l-0 border-borderColor focus:border-borderColor lg:rounded-r-md px-3 text-sm pr-10 text-gray-500 hover:bg-lightGray cursor-pointer'
        defaultValue={sortTabs[0].name}
        value={value}
      >
        {sortTabs.map((tab) => (
          <option key={tab.name} value={tab.value}>
            {tab.name}
          </option>
        ))}
      </select>
    </div>
  )
}
