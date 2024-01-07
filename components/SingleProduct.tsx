'use client'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { FormEvent, useContext, useState } from 'react'
import { RadioGroup, Tab } from '@headlessui/react'
import { CartItemsContext } from '@/contexts/CartItemsContext'
import { cartAddItem } from '@/helpers/cartAddItem'
import { AiOutlineCheck, AiOutlineHeart } from 'react-icons/ai'
import { CurrencyIcon } from '@/components/CurrencyIcon'
import { CustomButton } from '@/components/CustomButton'
import { IconButton } from '@/components/IconButton'
import { Heading3 } from '@/components/text/Heading3'
import { Paragraph } from '@/components/text/Paragraph'
import Image from 'next/image'
import { ProductType } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'

type Props = {
  product: ProductType
}
const colors = [
  { name: 'Gray', selectedColor: 'ring-slate-500', bgColor: 'bg-slate-500' },
  { name: 'blue', selectedColor: 'ring-blue-500', bgColor: 'bg-blue-500' },
  { name: 'red', selectedColor: 'ring-red-500', bgColor: 'bg-red-500' },
]

const sizes = [
  { name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
  { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  { name: '20L', description: 'Enough room for a serious amount of snacks.' },
]

export const SingleProduct: FC<Props> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const { cartProducts, setCartProducts } = useContext(CartItemsContext)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    cartAddItem(product, cartProducts, setCartProducts)
  }

  return (
    <article
      itemType='http://schema.org/Product'
      className='max-w-2xl py-16 sm:py-24 lg:max-w-7xl'
    >
      <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
        {/* Image gallery */}
        <Tab.Group as='div' className='flex flex-col-reverse'>
          {/* Image selector */}
          <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
            <Tab.List className='grid grid-cols-4 gap-6'>
              {product.images.map((image) => (
                <Tab
                  key={image.id}
                  className='relative flex h-24 cursor-pointer items-center justify-center rounded-md'
                >
                  {({ selected }) => (
                    <>
                      <span className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-md'>
                        <Image
                          height={100}
                          width={100}
                          src={image.url}
                          alt=''
                          className='h-full w-full object-cover object-center'
                        />
                      </span>
                      <span
                        className={cn(
                          'pointer-events-none absolute top-0 left-0 right-0 bottom-0 rounded-md ring-2 ring-offset-2',
                          {
                            'ring-accent': selected,
                            'ring-transparent': !selected,
                          },
                        )}
                        aria-hidden='true'
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <Tab.Panels className='aspect-h-1 aspect-w-1 w-full'>
            {product.images.map((image) => (
              <Tab.Panel key={image.id}>
                <Image
                  width={1000}
                  height={1000}
                  src={image.url}
                  alt='img'
                  className='h-full w-full object-cover object-center sm:rounded-lg'
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* Product info */}
        <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
          <div className='flex'>
            <h1 itemProp='name'>{product.title}</h1>
            <IconButton
              type='button'
              className='ml-4 mt-1'
              icon={
                <AiOutlineHeart
                  size={28}
                  className='flex-shrink-0'
                  aria-hidden='true'
                />
              }
            />
          </div>

          <div className='mt-3'>
            <h2 className='sr-only'>Product information</h2>
            <Heading3 value={product.price}>
              <CurrencyIcon />
            </Heading3>
          </div>
          <div className='mt-2 flex items-center'>
            <AiOutlineCheck
              size={20}
              className='flex-shrink-0 text-success'
              aria-hidden='true'
            />
            <Paragraph className='ml-2' value='In stock and ready to ship' />
          </div>

          {/* Reviews */}
          {/*<div className='mt-3'>*/}
          {/*  <h3 className='sr-only'>Reviews</h3>*/}
          {/*  <div className='flex items-center'>*/}
          {/*    <div className='flex items-center'>*/}
          {/*      {[0, 1, 2, 3, 4].map((rating) => (*/}
          {/*        <StarIcon*/}
          {/*          key={rating}*/}
          {/*          className={classNames(*/}
          {/*            product.rating > rating*/}
          {/*              ? 'text-blue-500'*/}
          {/*              : 'text-gray-300',*/}
          {/*            'h-5 w-5 flex-shrink-0',*/}
          {/*          )}*/}
          {/*          aria-hidden='true'*/}
          {/*        />*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*    <p className='sr-only'>{product.rating} out of 5 stars</p>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className='mt-6'>
            <h3 className='sr-only'>Description</h3>
            <Paragraph value={product.description} />
          </div>

          <form className='mt-6' onSubmit={handleSubmit}>
            {/* Colors */}
            <div>
              <Paragraph value='Color' />

              <RadioGroup
                value={selectedColor}
                onChange={setSelectedColor}
                className='mt-2'
              >
                <RadioGroup.Label className='sr-only'>
                  Choose a color
                </RadioGroup.Label>
                <span className='flex items-center space-x-3'>
                  {colors.map((color) => (
                    <RadioGroup.Option
                      key={color.name}
                      value={color}
                      className={({ active, checked }) =>
                        cn(
                          'relative flex cursor-pointer items-center justify-center rounded-full focus:outline-none',
                          color.selectedColor,
                          {
                            'ring ring-offset-1': active && checked,
                            'ring-2': !active && checked,
                          },
                        )
                      }
                    >
                      <RadioGroup.Label as='span' className='sr-only'>
                        {color.name}
                      </RadioGroup.Label>
                      <span
                        aria-hidden='true'
                        className={cn(
                          'h-8 w-8 rounded-full border-2 border-white',
                          color.bgColor,
                        )}
                      />
                    </RadioGroup.Option>
                  ))}
                </span>
              </RadioGroup>
            </div>

            {/*Sizes*/}
            <div className='sm:flex sm:justify-between mt-4'>
              {/* Size selector */}
              <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                <RadioGroup.Label className='block'>
                  <Paragraph value='Size' />
                </RadioGroup.Label>
                <div className='mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  {sizes.map((size) => (
                    <RadioGroup.Option
                      as='div'
                      key={Math.random()}
                      value={size}
                      className={({ active }) =>
                        cn(
                          'relative block cursor-pointer rounded-lg border border-borderColor p-4 focus:outline-none',
                          { 'ring-2 ring-accent': active },
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label>
                            <Paragraph value={size.name} />
                          </RadioGroup.Label>
                          <RadioGroup.Description className='mt-1'>
                            <Paragraph value={size.description} />
                          </RadioGroup.Description>
                          <div
                            className={cn(
                              'pointer-events-none absolute -inset-px rounded-lg',
                              {
                                border: active,
                                'border-2': !active,
                                'border-accent': checked,
                                'border-transparent': !checked,
                              },
                            )}
                            aria-hidden='true'
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <CustomButton
              fill='primary'
              type='submit'
              title='Add to bag'
              className='w-full mt-10'
            />
          </form>

          <section aria-labelledby='details-heading' className='mt-12'>
            <h2 id='details-heading' className='sr-only'>
              Additional details
            </h2>

            {/*<div className='divide-y divide-gray-200 border-t'>*/}
            {/*  {product.details.map((detail) => (*/}
            {/*    <Disclosure as='div' key={detail.name}>*/}
            {/*      {({ open }) => (*/}
            {/*        <>*/}
            {/*          <h3>*/}
            {/*            <Disclosure.Button className='group relative flex w-full items-center justify-between py-6 text-left'>*/}
            {/*              <span*/}
            {/*                className={classNames(*/}
            {/*                  open ? 'text-blue-600' : 'text-gray-900',*/}
            {/*                  'text-sm font-medium',*/}
            {/*                )}*/}
            {/*              >*/}
            {/*                {detail.name}*/}
            {/*              </span>*/}
            {/*              <span className='ml-6 flex items-center'>*/}
            {/*                {open ? (*/}
            {/*                  <MinusIcon*/}
            {/*                    className='block h-6 w-6 text-blue-400 group-hover:text-blue-500'*/}
            {/*                    aria-hidden='true'*/}
            {/*                  />*/}
            {/*                ) : (*/}
            {/*                  <PlusIcon*/}
            {/*                    className='block h-6 w-6 text-gray-400 group-hover:text-gray-500'*/}
            {/*                    aria-hidden='true'*/}
            {/*                  />*/}
            {/*                )}*/}
            {/*              </span>*/}
            {/*            </Disclosure.Button>*/}
            {/*          </h3>*/}
            {/*          <Disclosure.Panel*/}
            {/*            as='div'*/}
            {/*            className='prose prose-sm pb-6'*/}
            {/*          >*/}
            {/*            <ul role='list'>*/}
            {/*              {detail.items.map((item) => (*/}
            {/*                <li key={item}>{item}</li>*/}
            {/*              ))}*/}
            {/*            </ul>*/}
            {/*          </Disclosure.Panel>*/}
            {/*        </>*/}
            {/*      )}*/}
            {/*    </Disclosure>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </section>
        </div>
      </div>
    </article>
  )
}
