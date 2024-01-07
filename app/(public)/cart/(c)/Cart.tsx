'use client'
import { useContext } from 'react'
import { CartItemsContext } from '@/contexts/CartItemsContext'
import { CiCircleQuestion } from 'react-icons/ci'
import { CurrencyIcon } from '@/components/CurrencyIcon'
import { CustomLink } from '@/components/CustomLink'
import { CheckoutAndCartProductsList } from '@/app/(public)/checkout/(c)/CheckoutAndCartProductsList'
import Section from '@/components/Section'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'
import { EmptyState } from '@/components/EmptyState'

export const Cart = () => {
  const { cartProducts } = useContext(CartItemsContext)
  const totalPrice = cartProducts.reduce(
    (acc, el) => acc + el.price * el.qty,
    0,
  )

  return (
    <Section>
      {cartProducts.length !== 0 ? (
        <EmptyState
          title='Cart is empty'
          href='/products?category=All'
          subTitle='Click to check our product list!'
        />
      ) : (
        <div className='lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <div aria-labelledby='cart-heading' className='lg:col-span-7'>
            <h2 id='cart-heading' className='sr-only'>
              Items in your shopping cart
            </h2>

            <CheckoutAndCartProductsList />
          </div>

          {/* Order summary */}
          <section
            aria-labelledby='summary-heading'
            className='mt-16 rounded-lg bg-lightGray/70 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'
          >
            <Heading2 value='Order summary' id='summary-heading' />

            <div className='mt-6 space-y-4 divide-y divide-borderColor'>
              <div className='flex items-center justify-between'>
                <Paragraph value='Subtotal' />
                <Paragraph value='$99.00' />
              </div>
              <div className='flex items-center justify-between pt-4'>
                <div className='flex items-center'>
                  <Paragraph className='mr-2' value='Shipping estimate' />
                  <span className='sr-only'>
                    Learn more about how shipping is calculated
                  </span>

                  <CiCircleQuestion size={22} aria-hidden='true' />
                </div>
                <Paragraph value='$5.00' />
              </div>
              <div className='flex items-center justify-between pt-4'>
                <dt className='flex items-center'>
                  <Paragraph className='mr-2' value='Tax' />

                  <span className='sr-only'>
                    Learn more about how tax is calculated
                  </span>
                  <CiCircleQuestion size={22} aria-hidden='true' />
                </dt>
                <Paragraph value='$5.00' />
              </div>
              <div className='flex items-center justify-between pt-4'>
                <Paragraph value='Total' />
                <Paragraph value={totalPrice}>
                  <CurrencyIcon />
                </Paragraph>
              </div>
            </div>

            <CustomLink title='Checkout' href='checkout' className='mt-6' />
          </section>
        </div>
      )}
    </Section>
  )
}
