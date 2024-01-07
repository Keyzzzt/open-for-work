'use client'
import { FC, Fragment, ReactNode, useContext, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { CartItemsContext } from '@/contexts/CartItemsContext'
import { calculateTotals } from '@/helpers/calculateTotals'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { HeaderCartIcon } from '@/components/HeaderCartIcon'
import { HeaderMenuItem } from '@/components/HeaderMenuItem'
import { HeaderInformationTab } from '@/components/HeaderInformationTab'
import { HeaderCallToAction } from '@/components/HeaderCallToAction'
import { HeaderMobileMenuItem } from '@/components/HeaderMobileMenuItem'
import { HeaderProductList } from '@/components/HeaderProductList'
import {
  BsChevronDown,
  BsInfoSquareFill,
  BsPlayCircleFill,
} from 'react-icons/bs'
import { IoFingerPrintOutline } from 'react-icons/io5'
import { AiOutlineAppstoreAdd, AiOutlineClose } from 'react-icons/ai'
import { IoMdCall } from 'react-icons/io'
import { MdOutlineApps } from 'react-icons/md'
import { RxHamburgerMenu } from 'react-icons/rx'
import { CurrencyIcon } from '@/components/CurrencyIcon'
import { CustomLink } from '@/components/CustomLink'
import { IconButton } from '@/components/IconButton'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  allCategoryId?: string
}

type HeaderMenuItemType = {
  type: 'link' | 'popup'
  title: string
  href: string
}

type CallToAction = {
  name: string
  href: string
  icon: ReactNode
}

type InformationTab = {
  name: string
  description: string
  href: string
  icon: ReactNode
}
export const HeaderClient: FC<Props> = ({ allCategoryId }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartProducts } = useContext(CartItemsContext)
  const { totalPrice } = calculateTotals(cartProducts)

  const informationTabs: InformationTab[] = [
    {
      name: 'FAQ',
      description: 'Frequently asked questions and answers',
      href: '/faq',
      icon: <RiQuestionAnswerFill size={24} />,
    },
    {
      name: 'About',
      description: 'Our products, mission, values and team.',
      href: '/about',
      icon: <BsInfoSquareFill size={24} />,
    },
    {
      name: 'Security',
      description: 'Your customers’ data will be safe and secure',
      href: '/security',
      icon: <IoFingerPrintOutline size={24} />,
    },
    {
      name: 'Integrations',
      description: 'Your customers’ data will be safe and secure',
      href: '/integration',
      icon: <AiOutlineAppstoreAdd size={24} />,
    },
  ]
  const callsToAction: CallToAction[] = [
    {
      name: 'Watch demo',
      href: 'https://www.youtube.com',
      icon: <BsPlayCircleFill size={20} />,
    },
    { name: 'Contact sales', href: '/contact', icon: <IoMdCall size={20} /> },
    {
      name: 'View all products',
      href: '/products?category=All',
      icon: <MdOutlineApps size={22} />,
    },
  ]
  const menuItems: HeaderMenuItemType[] = [
    {
      type: 'link',
      title: 'Products',
      href: '/products?category=All&page=1',
    },
    {
      type: 'link',
      title: 'Marketplace',
      href: '/marketplace',
    },
    {
      type: 'link',
      title: 'Blog',
      href: '/blog',
    },
    {
      type: 'popup',
      title: 'Information',
      href: '#',
    },
  ]

  // Limit the number of products in popup with 3 items
  let productsToRenderInPopup = [...cartProducts]
  if (cartProducts.length > 3) {
    productsToRenderInPopup = cartProducts.filter((p, idx) => idx <= 2)
  }

  return (
    <header className='relative isolate z-20'>
      <nav
        className='mx-auto flex items-center lg:justify-between py-6 lg:py-8'
        aria-label='Global'
      >
        <div className='flex flex-1 lg:flex-1'>
          <Link href='/' className='text-3xl cursor-pointer'>
            Keizt
          </Link>
        </div>
        <Popover.Group className='hidden lg:flex lg:gap-x-12'>
          {menuItems.map((item, idx) => {
            if (item.type === 'link') {
              return (
                <HeaderMenuItem
                  key={idx}
                  href={item.href}
                  title={item.title}
                  className='hover:text-textHover border-b-2 border-transparent focus:outline-none focus:border-accent'
                />
              )
            } else {
              return (
                <Popover key={idx}>
                  {({ close }) => {
                    return (
                      <>
                        <Popover.Button className='flex items-center gap-x-1 font-semibold hover:text-textHover border-b-2 border-transparent focus:outline-none focus:border-accent'>
                          Information
                          <div className='ml-1 mt-1'>
                            <BsChevronDown size={16} aria-hidden='true' />
                          </div>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-200'
                          enterFrom='opacity-0 -translate-y-1'
                          enterTo='opacity-100 translate-y-0'
                          leave='transition ease-in duration-150'
                          leaveFrom='opacity-100 translate-y-0'
                          leaveTo='opacity-0 -translate-y-1'
                        >
                          <Popover.Panel className='absolute left-0 right-0 top-20 bg-white pt-2 shadow-lg rounded-b-lg'>
                            <div className='grid grid-cols-4 gap-x-4 py-10 px-4 border-b border-borderColor'>
                              {informationTabs.map((p, idx) => (
                                <HeaderInformationTab
                                  onClick={() => close()}
                                  key={idx}
                                  title={p.name}
                                  icon={p.icon}
                                  href={p.href}
                                  description={p.description}
                                />
                              ))}
                            </div>
                            <div className='grid grid-cols-3 divide-x divide-borderColor'>
                              {callsToAction.map((item, idx) => (
                                <HeaderCallToAction
                                  onClick={() => close()}
                                  key={idx}
                                  title={item.name}
                                  href={item.href}
                                  icon={item.icon}
                                />
                              ))}
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )
                  }}
                </Popover>
              )
            }
          })}
        </Popover.Group>
        {/*Cart popover*/}
        <Popover className='flex mr-5 lg:mr-0 lg:flex lg:flex-1 lg:justify-end'>
          {({ close }) => {
            return (
              <>
                <Popover.Button className='group flex items-center py-2 hover:text-textHover border-b-2 border-transparent focus:outline-none focus:border-accent'>
                  <HeaderCartIcon productsLength={cartProducts.length} />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Popover.Panel className='fixed left-0 right-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-9 lg:-mr-1.5 lg:mt-3 lg:w-96 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
                    <h2 className='sr-only'>Shopping Cart</h2>
                    <form className='mx-auto max-w-2xl px-4'>
                      <HeaderProductList
                        close={close}
                        products={productsToRenderInPopup}
                      />
                      <div className='border-t border-t-borderColor py-4 text-right'>
                        <Paragraph value={totalPrice}>
                          <>
                            <span>Total price: </span>
                            <CurrencyIcon />
                          </>
                        </Paragraph>
                      </div>

                      {cartProducts.length > 0 ? (
                        <>
                          <CustomLink
                            title='Checkout'
                            href='/checkout'
                            onClick={() => close()}
                          />
                          {/*<p className='mt-6 text-center'>*/}
                          <CustomLink
                            title='View shopping cart'
                            href='/cart'
                            onClick={() => close()}
                            className='bg-white mt-6 text-textColor hover:text-textHover hover:bg-white active:bg-white'
                          />

                          {/*</p>*/}
                        </>
                      ) : (
                        <CustomLink
                          title='Go to products page'
                          href={`/products?category=${allCategoryId}&page=1`}
                        />
                      )}
                    </form>
                  </Popover.Panel>
                </Transition>
              </>
            )
          }}
        </Popover>
        <div className='flex lg:hidden'>
          <IconButton
            type='button'
            className='inline-flex items-center justify-center rounded-md'
            onClick={() => setMobileMenuOpen(true)}
            icon={
              <>
                <span className='sr-only'>Open main menu</span>
                <RxHamburgerMenu
                  size={22}
                  className='hover:text-textHover'
                  aria-hidden='true'
                />
              </>
            }
          />
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed top-0 left-0 right-0 bottom-0 z-20' />
        <Dialog.Panel className='fixed top-0 bottom-0 right-0 z-20  w-full overflow-y-auto bg-white px-6 sm:max-w-sm'>
          <div className='flex items-center justify-between py-6 sm:justify-end'>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              href='/'
              className='text-3xl sm:hidden '
            >
              Keizt
            </Link>
            <IconButton
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              icon={
                <>
                  <span className='sr-only'>Close menu</span>
                  <AiOutlineClose
                    size={22}
                    className='h-6 w-6 text-textColor hover:text-textHover'
                    aria-hidden='true'
                  />
                </>
              }
            />
          </div>
          <div>
            <div className='divide-y divide-borderColor'>
              {/*Cart icon mobile*/}
              <div className='py-6 border-t border-borderColor'>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href='/cart'
                  className='group flex justify-end text-textColor'
                >
                  <HeaderCartIcon productsLength={cartProducts.length} />
                </Link>
              </div>
              <div className='space-y-2 py-6'>
                {menuItems.map((item, idx) => {
                  if (item.type === 'link') {
                    return (
                      <HeaderMenuItem
                        key={idx}
                        href={item.href}
                        title={item.title}
                        onClick={() => setMobileMenuOpen(false)}
                        className='block py-2 text-textColor hover:text-textHover'
                      />
                    )
                  } else {
                    return (
                      <Disclosure key={idx} as='div'>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className='flex w-full items-center rounded-lg py-2 font-semibold text-textColor hover:text-textHover'>
                              {item.title}
                              <span className='ml-2'>
                                <BsChevronDown size={16} aria-hidden='true' />
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className='mt-2 space-y-2'>
                              {[...informationTabs, ...callsToAction].map(
                                (item, idx) => (
                                  <HeaderMobileMenuItem
                                    key={idx}
                                    onClick={() => setMobileMenuOpen(false)}
                                    href={item.href}
                                    title={item.name}
                                  />
                                ),
                              )}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
