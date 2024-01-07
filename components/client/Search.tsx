'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { PiMagnifyingGlassLight } from 'react-icons/pi'

type Props = {
  sort?: string
  search?: string
  currentCategory: string
  currentPage: number
}
export const Search: FC<Props> = ({
  sort,
  search,
  currentCategory,
  currentPage,
}) => {
  const [value, setValue] = useState(search)
  const [query] = useDebounce(value, 500)
  const router = useRouter()

  // To prevent wiping out query parameters on initial render after refreshing the page
  const initialRender = useRef(true)
  const categoryRef = useRef('')

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    // Reset search if category has changed
    if (categoryRef.current === '') {
      categoryRef.current = currentCategory
    }

    if (categoryRef.current !== currentCategory) {
      setValue('')
      categoryRef.current = ''
      return
    }

    if (query) {
      router.push(
        `/products?category=${currentCategory}&page=${currentPage}&search=${query}${
          sort ? `&sort=${sort}` : ''
        }`,
      )
    } else {
      router.push(
        `/products?category=${currentCategory}&page=${currentPage}${
          sort ? `&sort=${sort}` : ''
        }`,
      )
    }
  }, [sort, query, router, currentCategory, currentPage])

  return (
    <div className='relative flex-grow focus-within:z-10'>
      <div className='pointer-events-none absolute top-0 bottom-0 left-0 flex items-center pl-3'>
        <PiMagnifyingGlassLight size={20} aria-hidden='true' />
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value.toLowerCase())}
        type='text'
        name='mobile-search-candidate'
        id='mobile-search-candidate'
        className='remove-tw-outline w-full rounded-l-md border-borderColor focus:border-borderColor py-1.5 pl-10 hover:bg-lightGray'
        placeholder='Search products'
      />
    </div>
  )
}
