import { Dispatch, SetStateAction } from 'react'
import { CartProductType } from '@/contexts/CartItemsContext'

/**
 *
 * @param cartProducts
 * @param id - product ID that will be removed from local storage
 * @param setCartProducts - fn to remove products from context e.g. global state
 */
export const cartRemoveItem = (
  cartProducts: CartProductType[],
  id: string,
  setCartProducts: Dispatch<SetStateAction<CartProductType[]>>,
) => {
  setCartProducts((prev) => [...prev].filter((item) => item.id !== id))
  const filtered = cartProducts.filter((item) => item.id !== id)
  localStorage.setItem('cartItems', JSON.stringify(filtered))
}
