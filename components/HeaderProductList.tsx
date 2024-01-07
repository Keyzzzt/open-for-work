import Image from 'next/image'
import { NoImage } from '@/components/NoImage'
import { cartRemoveItem } from '@/helpers/cartRemoveItem'
import { FC, useContext, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { CartItemsContext, CartProductType } from '@/contexts/CartItemsContext'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { CiTrash } from 'react-icons/ci'
import { IconButton } from '@/components/IconButton'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  products: CartProductType[]
  close: () => void
}
export const HeaderProductList: FC<Props> = ({ products, close }) => {
  const { cartProducts, setCartProducts } = useContext(CartItemsContext)
  const router = useRouter()

  const handleQtyChange = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    action: 'plus' | 'minus',
    id: string,
    countInStock: number,
  ) => {
    e.preventDefault()
    const changed = cartProducts.map((item) => {
      if (item.id === id) {
        if (action === 'plus') {
          if (item.qty === countInStock) {
            return item
          } else {
            item.qty += 1
          }
        } else {
          if (item.qty === 1) {
            return item
          } else {
            item.qty -= 1
          }
        }
      }
      return item
    })

    localStorage.setItem('cartItems', JSON.stringify(changed))
    setCartProducts(changed)
  }
  return (
    <>
      <ul role='list' className='divide-y divide-borderColor overflow-auto'>
        {products.length > 0 ? (
          products.map((p) => (
            <li key={p.id} className='flex items-center py-3'>
              {p.image ? (
                <Image
                  src={p.image}
                  height={90}
                  width={90}
                  alt='img'
                  className='rounded-md border border-borderColor'
                />
              ) : (
                <NoImage width={90} height={90} />
              )}

              <div className='ml-4 flex-auto'>
                <Paragraph
                  value={p.title}
                  className='cursor-pointer hover:text-textHover'
                  onClick={() => {
                    router.push(`/products/${p.id}`)
                    close()
                  }}
                />
              </div>
              <div className='flex items-center px-4'>
                <IconButton
                  type='button'
                  onClick={(e) =>
                    handleQtyChange(e, 'minus', p.id, p.countInStock)
                  }
                  icon={
                    <>
                      <span className='sr-only'>
                        Decrement {p.title} quantity by one
                      </span>
                      <AiOutlineMinus
                        size={18}
                        className='cursor-pointer hover:text-textHover'
                      />
                    </>
                  }
                />
                <span className='sr-only'>
                  Total {p.qty} of {p.title} in your cart
                </span>
                <Paragraph
                  value={p.qty}
                  className='w-[40px] text-center'
                ></Paragraph>
                <IconButton
                  type='button'
                  onClick={(e) =>
                    handleQtyChange(e, 'plus', p.id, p.countInStock)
                  }
                  icon={
                    <>
                      <span className='sr-only'>
                        Increment {p.title} quantity by one
                      </span>
                      <AiOutlinePlus
                        size={18}
                        className='cursor-pointer hover:text-textHover'
                      />
                    </>
                  }
                />
              </div>

              <IconButton
                type='button'
                onClick={() =>
                  cartRemoveItem(cartProducts, p.id, setCartProducts)
                }
                icon={
                  <>
                    <span className='sr-only'>Remove</span>
                    <CiTrash size={24} aria-hidden='true' />
                  </>
                }
              />
            </li>
          ))
        ) : (
          <Paragraph value='Cart is empty' className='my-5' />
        )}
      </ul>
      {cartProducts.length > 3 && (
        <Paragraph value={`And ${cartProducts.length - 3} more...`} />
      )}
    </>
  )
}
