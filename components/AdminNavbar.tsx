'use client'
import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'
import { CiBellOn, CiLogout } from 'react-icons/ci'
import { IconButton } from '@/components/IconButton'
import { cn } from '@/lib/utils'

type Navigation = {
  name: string
  href: string
  current: boolean
}

export const AdminNavbar = () => {
  const pathname = usePathname()
  let navigation: Navigation[]

  if (pathname) {
    navigation = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        current: pathname === '/dashboard',
      },
      {
        name: 'Entities',
        href: '/dashboard/entities/products',
        current:
          `/${pathname.split('/')[1]}/${pathname.split('/')[2]}` ===
          '/dashboard/entities',
      },
      {
        name: 'Pages',
        href: '/dashboard/pages/landing?section=hero',
        current:
          `/${pathname.split('/')[1]}/${pathname.split('/')[2]}` ===
          '/dashboard/pages',
      },
      {
        name: 'Settings',
        href: '/dashboard/settings/configuration',
        current:
          `/${pathname.split('/')[1]}/${pathname.split('/')[2]}` ===
          '/dashboard/settings',
      },
    ]
  }

  return (
    <>
      <Disclosure as='nav' className='border-b border-borderColor'>
        {({ open, close }) => (
          <>
            <div className='flex h-16 justify-between'>
              <div className='flex'>
                <div className='flex flex-shrink-0 items-center text-3xl'>
                  Keizt
                </div>
                <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'inline-flex items-center px-1 pt-1 border-b-2 border-transparent',
                        {
                          'border-accent text-accent border-b-2': item.current,
                          'hover:border-b-2 hover:border-accent': !item.current,
                        },
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className='hidden sm:ml-6 sm:flex sm:items-center'>
                <IconButton
                  type='button'
                  className='hover:text-textHover'
                  icon={
                    <>
                      <span className='sr-only'>View notifications</span>
                      <CiBellOn size={22} aria-hidden='true' />
                    </>
                  }
                />
                <IconButton
                  type='button'
                  onClick={() => signOut()}
                  className='ml-3 cursor-pointer hover:text-textHover'
                  icon={
                    <>
                      <span className='sr-only'>Logout</span>
                      <CiLogout size={22} aria-hidden='true' />
                    </>
                  }
                />
              </div>
              <div className='-mr-2 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-400 focus:outline-none'>
                  <span className='sr-only'>Open main menu</span>
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

            {/*Mobile*/}
            <Disclosure.Panel className='sm:hidden'>
              <ul className='py-2'>
                {navigation.map((item) => (
                  <li
                    key={item.name}
                    className={cn(
                      'block border-l-2 border-transparent py-2 pl-2 cursor-pointer',
                      {
                        'border-accent bg-accent/10 text-accent': item.current,
                        'hover:border-accent': !item.current,
                      },
                    )}
                  >
                    <Link
                      href={item.href}
                      onClick={() => close()}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className='border-t border-borderColor pb-3 pt-4'>
                <div className='flex items-center justify-end'>
                  <IconButton
                    type='button'
                    icon={
                      <>
                        <span className='sr-only'>View notifications</span>
                        <CiBellOn size={22} aria-hidden='true' />
                      </>
                    }
                  />
                  <IconButton
                    type='button'
                    className='ml-3'
                    onClick={() => signOut()}
                    icon={
                      <>
                        <span className='sr-only'>Logout</span>
                        <CiLogout size={22} />
                      </>
                    }
                  />
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
