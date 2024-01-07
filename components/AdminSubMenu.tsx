'use client'
import { FC } from 'react'
import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'
import { BsChevronRight } from 'react-icons/bs'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  tabs: { name: string; href: string }[]
}

export const AdminSubMenu: FC<Props> = ({ title, tabs }) => {
  const pathName = usePathname()

  return (
    <>
      <Disclosure as='nav' className='mb-10 mt-2'>
        {({ open, close }) => (
          <>
            <div className='flex h-10 justify-between'>
              <div className='flex justify-start'>
                <div className='sm:hidden flex flex-shrink-0 items-center'>
                  {title}
                  <BsChevronRight
                    size={18}
                    className='block px-1'
                    aria-hidden='true'
                  />
                  <div>
                    {
                      tabs.filter((tab) => {
                        const endOfPathName = pathName
                          .split('/')[3]
                          .split('-')
                          .join(' ')
                        const name = tab.name.toLowerCase()
                        return endOfPathName === name
                      })[0]?.name
                    }
                  </div>
                </div>
                <div className='hidden sm:-my-px sm:flex sm:space-x-8'>
                  {tabs.map((t) => {
                    //todo duplicated code
                    const arr = pathName.split('/')
                    let current = arr[3] === t.name.toLowerCase()
                    if (
                      t.name === 'Products' &&
                      arr[arr.length - 1] === 'categories'
                    ) {
                      current = true
                    }

                    if (
                      t.name === 'FAQ' &&
                      arr[arr.length - 1] === 'faq-categories'
                    ) {
                      current = true
                    }
                    return (
                      <Link
                        key={t.name}
                        href={t.href}
                        className={cn(
                          'inline-flex items-center px-1 pt-1 border-b-2 border-transparent',
                          {
                            'border-accent text-accent': current,
                            'hover:border-accent': !current,
                          },
                        )}
                        aria-current={
                          pathName === t.href.split('?')[0] ? 'page' : undefined
                        }
                      >
                        {t.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
              {/* Mobile */}
              <div className='flex items-center sm:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md hover:text-textHover'>
                  <span className='sr-only'>Open sub menu</span>
                  {open ? (
                    <AiOutlineClose
                      size={22}
                      className='block'
                      aria-hidden='true'
                    />
                  ) : (
                    <RxHamburgerMenu
                      size={22}
                      className='block'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <ul className='space-y-1 pb-3 pt-2'>
                {tabs.map((t) => {
                  const arr = pathName.split('/')
                  let current = arr[arr.length - 1] === t.name.toLowerCase()
                  if (
                    t.name === 'Products' &&
                    arr[arr.length - 1] === 'categories'
                  ) {
                    current = true
                  }
                  if (
                    t.name === 'FAQ' &&
                    arr[arr.length - 1] === 'faq-categories'
                  ) {
                    current = true
                  }
                  return (
                    <li
                      key={t.name}
                      className={cn(
                        'block border-l-2 border-transparent py-1 pl-3 pr-4 cursor-pointer',
                        {
                          'border-accent bg-accent/10 text-accent': current,
                          'hover:border-accent': !current,
                        },
                      )}
                    >
                      <Link
                        onClick={() => close()}
                        href={t.href}
                        aria-current={pathName === t.href ? 'page' : undefined}
                      >
                        {t.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
