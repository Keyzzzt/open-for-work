import { FC, useContext } from 'react'
import { CartItemsContext, CartProductType } from '@/contexts/CartItemsContext'

type Props = {
  product: CartProductType
}

export const ProductQuantitySelect: FC<Props> = ({ product }) => {
  const { cartProducts, setCartProducts } = useContext(CartItemsContext)

  const count = []
  for (let i = 1; i <= product.countInStock; i++) {
    count.push(i)
  }
  const handleQtyChange = (id: string, value: string) => {
    const changed = cartProducts.map((item) => {
      if (item.id === id) {
        item.qty = Number(value)
      }
      return item
    })

    localStorage.setItem('cartItems', JSON.stringify(changed))
    setCartProducts(changed)
  }

  return (
    <>
      <label htmlFor='checkoutQuantity' className='sr-only'>
        Quantity
      </label>
      <select
        value={product.qty}
        onChange={(e) => handleQtyChange(product.id, e.target.value)}
        id='checkoutQuantity'
        name='checkoutQuantity'
        className='block w-20 remove-tw-outline border rounded-md border-borderColor focus:border-borderColor items-center gap-x-1.5 px-3 pr-10 hover:bg-lightGray cursor-pointer'
      >
        {count.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </>
  )
}
