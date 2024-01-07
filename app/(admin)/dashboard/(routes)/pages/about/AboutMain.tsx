'use client'
import { FC, Fragment, ReactNode, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IconButton } from '@/components/IconButton'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  currentSection: string
}

export const AboutMain: FC<Props> = ({ children, currentSection }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Hero', href: '/dashboard/pages/about?section=hero' },
    { name: 'Timeline', href: '/dashboard/pages/about?section=timeline' },
    { name: 'Mission', href: '/dashboard/pages/about?section=mission' },
    { name: 'Team', href: '/dashboard/pages/about?section=team' },
    { name: 'Values', href: '/dashboard/pages/about?section=values' },
    { name: 'Partners', href: '/dashboard/pages/about?section=partners' },
    { name: 'Statistics', href: '/dashboard/pages/about?section=statistics' },
    { name: 'Jobs', href: '/dashboard/pages/about?section=vacancies' },
  ]

  return (
    <div className='flex flex-col lg:flex-row text-textColor'>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50 lg:hidden'
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray' />
          </Transition.Child>

          <div className='fixed top-0 left-0 right-0 bottom-0 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute right-0 top-0 flex w-16 justify-center pt-5'>
                    <IconButton
                      type='button'
                      onClick={() => setIsOpen(false)}
                      icon={
                        <>
                          <span className='sr-only'>Close sidebar</span>
                          <AiOutlineClose size={22} aria-hidden='true' />
                        </>
                      }
                    />
                  </div>
                </Transition.Child>
                <div className='pt-10 flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2'>
                  <nav className='flex flex-1 flex-col'>
                    <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                      <li>
                        <ul role='list' className='-mx-2 space-y-1'>
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                onClick={() => setIsOpen(false)}
                                href={item.href}
                                className={cn(
                                  'block border-l-2 py-2 pl-3 pr-4 border-transparent',
                                  {
                                    'border-accent bg-accent/10 text-accent':
                                      currentSection ===
                                      item.name.toLowerCase(),
                                    'hover:border-accent':
                                      currentSection !==
                                      item.name.toLowerCase(),
                                  },
                                )}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop */}
      <div className='hidden min-w-[90px] lg:top-0 lg:bottom-0 lg:z-50 lg:flex lg:flex-col'>
        <div className='flex grow flex-col gap-y-5 overflow-hidden border-r border-borderColor'>
          <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              <li>
                <ul role='list' className='space-y-1'>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'inline-flex py-1 font-semibold border-b-2 border-transparent',
                          {
                            'border-accent text-accent':
                              currentSection === item.name.toLowerCase(),
                            'hover:border-accentHover':
                              currentSection !== item.name.toLowerCase(),
                          },
                          currentSection === item.name.toLowerCase(),
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className='sticky top-0 z-40 flex items-center lg:hidden'>
        <IconButton
          type='button'
          onClick={() => setIsOpen(true)}
          icon={
            <>
              <span className='sr-only'>Open sidebar</span>
              <RxHamburgerMenu size={22} aria-hidden='true' />
            </>
          }
        />
      </div>
      <div className='flex-1 lg:pl-5'>{children}</div>
    </div>
  )
}
