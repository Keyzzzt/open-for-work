import { FC, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CiTrash } from 'react-icons/ci'
import { cartRemoveItem } from '@/helpers/cartRemoveItem'
import { CartItemsContext } from '@/contexts/CartItemsContext'
import { ProductQuantitySelect } from '@/components/ProductQuantitySelect'
import { CurrencyIcon } from '@/components/CurrencyIcon'
import { IconButton } from '@/components/IconButton'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {}
export const CheckoutAndCartProductsList: FC<Props> = () => {
  const { cartProducts, setCartProducts } = useContext(CartItemsContext)

  return (
    <ul role='list' className='divide-y divide-borderColor'>
      {cartProducts.map((p) => (
        <li key={p.id} className='flex py-6'>
          <div className='flex-shrink-0'>
            <Image
              width={100}
              height={100}
              src={
                p.image
                  ? p.image
                  : 'data:image/jpeg;base64,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'
              }
              alt='img'
              className='rounded-md object-cover object-center w-24'
            />
          </div>

          <div className='mx-2 flex flex-1 flex-col justify-between sm:mx-6'>
            <div className='relative flex justify-between sm:gap-x-6 sm:pr-0'>
              <div>
                <div className='flex justify-between'>
                  <Link
                    href={`/products/${p.id}`}
                    className='hover:text-textHover'
                  >
                    <Paragraph value={p.title} />
                  </Link>
                </div>
                {/*<div className='mt-1 flex text-sm'>*/}
                {/*<p className='text-gray-500'>{product.color}</p>*/}
                {/*{product.size ? (*/}
                {/*  <p className='ml-4 border-l border-gray-200 pl-4 text-gray-500'>*/}
                {/*    {product.size}*/}
                {/*  </p>*/}
                {/*) : null}*/}
                {/*</div>*/}
                <Paragraph value={p.price} className='mt-1'>
                  <CurrencyIcon />
                </Paragraph>
              </div>

              <div className='pr-14'>
                <ProductQuantitySelect product={p} />
                <div className='absolute right-0 top-2'>
                  <IconButton
                    type='button'
                    onClick={() =>
                      cartRemoveItem(cartProducts, p.id, setCartProducts)
                    }
                    icon={
                      <>
                        <span className='sr-only'>
                          Remove {p.title} from cart
                        </span>
                        <CiTrash size={24} aria-hidden='true' />
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
