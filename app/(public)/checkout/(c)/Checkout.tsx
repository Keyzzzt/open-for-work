'use client'
import { FC, useContext, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CartItemsContext } from '@/contexts/CartItemsContext'
import { calculateTotals } from '@/helpers/calculateTotals'
import { CheckoutAndCartProductsList } from '@/app/(public)/checkout/(c)/CheckoutAndCartProductsList'
import { checkoutSchema, TCheckoutForm } from '@/schemas'
import { Input } from '@/components/Input'
import { AiFillCheckCircle } from 'react-icons/ai'
import { CurrencyIcon } from '@/components/CurrencyIcon'
import { cn } from '@/lib/utils'
import Section from '@/components/Section'
import { Heading2 } from '@/components/text/Heading2'
import { Paragraph } from '@/components/text/Paragraph'

// TODO: Перед этим шагом создаем order и на его основе рендерим инфу о заказе в серверном компоненте.

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '16.00' },
]
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

type Props = {
  taxRate: number
}

export const Checkout: FC<Props> = ({ taxRate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCheckoutForm>({ resolver: zodResolver(checkoutSchema) })

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0],
  )
  const { cartProducts } = useContext(CartItemsContext)
  const { subTotal, tax, totalPrice } = calculateTotals(cartProducts, taxRate)

  const onSubmit = async (data: TCheckoutForm) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000))
    reset()
  }

  return (
    <Section className='max-w-2xl pb-24 pt-16 lg:max-w-7xl'>
      <h2 className='sr-only'>Checkout</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'
      >
        <div>
          <Heading2 value='Contact information' />

          <div className='mt-4'>
            <Input
              register={register}
              errors={errors}
              id='checkout-email'
              type='email'
              name='email'
              label='Email'
            />
          </div>

          <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
            <div>
              <Input
                register={register}
                errors={errors}
                id='checkout-firstname'
                type='text'
                name='firstName'
                label='First name'
              />
            </div>

            <div>
              <Input
                register={register}
                errors={errors}
                id='checkout-lastname'
                type='text'
                name='lastName'
                label='Last name'
              />
            </div>

            <div className='sm:col-span-2'>
              <Input
                register={register}
                errors={errors}
                id='checkout-company'
                type='text'
                name='company'
                label='Company'
              />
            </div>

            <div className='sm:col-span-2'>
              <Input
                register={register}
                errors={errors}
                id='checkout-address'
                type='text'
                name='address'
                label='Address'
              />
            </div>

            <div className='sm:col-span-2'>
              <Input
                register={register}
                errors={errors}
                id='checkout-info'
                type='text'
                name='info'
                label='Apartment, suite, additional info, etc.'
              />
            </div>

            <div>
              <Input
                register={register}
                errors={errors}
                id='checkout-country'
                type='text'
                name='country'
                label='Country'
              />
            </div>

            <div>
              <Input
                register={register}
                errors={errors}
                id='checkout-city'
                type='text'
                name='city'
                label='City'
              />
            </div>

            <div>
              <Input
                register={register}
                errors={errors}
                id='checkout-region'
                type='text'
                name='stateProvince'
                label='State / Province'
              />
            </div>

            <div>
              <Input
                register={register}
                errors={errors}
                id='checkout-postalcode'
                type='text'
                name='postalCode'
                label='Postal code'
              />
            </div>

            <div className='sm:col-span-2'>
              <Input
                register={register}
                errors={errors}
                id='checkout-phone'
                type='text'
                name='phone'
                label='Phone'
              />
            </div>
          </div>
          <div className='mt-10 border-t border-borderColor pt-8'>
            <RadioGroup
              value={selectedDeliveryMethod}
              onChange={setSelectedDeliveryMethod}
            >
              <RadioGroup.Label>
                <Paragraph value='Delivery method' />
              </RadioGroup.Label>

              <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                {deliveryMethods.map((deliveryMethod) => (
                  <RadioGroup.Option
                    key={deliveryMethod.id}
                    value={deliveryMethod}
                    className={({ checked, active }) =>
                      cn(
                        'relative flex cursor-pointer rounded-lg border border-borderColor bg-white p-4 shadow-sm focus:outline-none',
                        {
                          'border-2 border-accent': checked,
                          'border-borderColor': !checked,
                          'ring-2 ring-accent': active,
                        },
                      )
                    }
                  >
                    {({ checked, active }) => (
                      <>
                        <span className='flex flex-1'>
                          <span className='flex flex-col'>
                            <RadioGroup.Label>
                              <Paragraph value={deliveryMethod.title} />
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as='span'
                              className='mt-1 flex items-center'
                            >
                              <Paragraph value={deliveryMethod.turnaround} />
                            </RadioGroup.Description>
                            <RadioGroup.Description className='mt-6'>
                              <Paragraph value={deliveryMethod.price}>
                                <CurrencyIcon />
                              </Paragraph>
                            </RadioGroup.Description>
                          </span>
                        </span>
                        {checked ? (
                          <AiFillCheckCircle
                            size={20}
                            className='text-accent'
                            aria-hidden='true'
                          />
                        ) : null}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Payment */}
          <div className='mt-10 border-t border-borderColor pt-8'>
            <Heading2 value='Payment' />

            <fieldset className='mt-4'>
              <legend className='sr-only'>Payment type</legend>
              <div className='space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0'>
                {paymentMethods.map((m, paymentMethodIdx) => (
                  <div key={m.id} className='flex items-center'>
                    {paymentMethodIdx === 0 ? (
                      <input
                        id={m.id}
                        name='payment-type'
                        type='radio'
                        defaultChecked
                        className='h-4 w-4 border-borderColor'
                      />
                    ) : (
                      <input
                        id={m.id}
                        name='payment-type'
                        type='radio'
                        className='h-4 w-4 border-borderColor'
                      />
                    )}

                    <label htmlFor={m.id} className='ml-3 block'>
                      {m.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className='mt-6 grid grid-cols-4 gap-x-4 gap-y-6'>
              <div className='col-span-4'>
                <label htmlFor='card-number' className='block'>
                  Card number
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    id='card-number'
                    name='card-number'
                    className='block w-full rounded-md'
                  />
                </div>
              </div>

              <div className='col-span-4'>
                <label htmlFor='name-on-card' className='block'>
                  Name on card
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    id='name-on-card'
                    name='name-on-card'
                    className='block w-full rounded-md'
                  />
                </div>
              </div>

              <div className='col-span-3'>
                <label htmlFor='expiration-date' className='block'>
                  Expiration date (MM/YY)
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='expiration-date'
                    id='expiration-date'
                    className='block w-full rounded-md'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='cvc' className='block'>
                  CVC
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='cvc'
                    id='cvc'
                    className='block w-full rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className='mt-10 lg:mt-0 bg-lightGray/70 px-4 sm:px-6 pt-4 sm:pt-6'>
          <Heading2 value='Order summary' />

          <div className='mt-4 rounded-lg'>
            <h3 className='sr-only'>Items in your cart</h3>
            <CheckoutAndCartProductsList />
            <div className='divide-y divide-borderColor'>
              <div className='flex items-center justify-between py-4'>
                <Paragraph value='Subtotal' />
                <Paragraph value={subTotal} />
              </div>
              <div className='flex items-center justify-between py-4'>
                <Paragraph value='Shipping' />
                <Paragraph value='5.00'>
                  <CurrencyIcon />
                </Paragraph>
              </div>
              <div className='flex items-center justify-between py-4'>
                <Paragraph value='Taxes' />
                <Paragraph value={tax} />
              </div>
              <div className='flex items-center justify-between py-4'>
                <Paragraph value='Total' />
                <Paragraph value={totalPrice}>
                  <CurrencyIcon />
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Section>
  )
}
