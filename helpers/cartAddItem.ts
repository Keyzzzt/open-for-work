import toast from 'react-hot-toast'
import { Dispatch, SetStateAction } from 'react'
import { ProductType } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'
import { CartProductType } from '@/contexts/CartItemsContext'

/**
 * @param product - product that need to be added to local storage
 * @param cartProducts - list of cart products from context e.g. global state
 * @param setCartProducts - function to set cart products in context e.g. global state
 */
export const cartAddItem = (
  product: ProductType,
  cartProducts: CartProductType[],
  setCartProducts: Dispatch<SetStateAction<CartProductType[]>>,
) => {
  const isInCart = cartProducts.find((item) => item.id === product.id)
  if (isInCart) {
    toast.error('Product already in cart')
    return
  } else {
    const formatted = {
      id: product.id,
      title: product.title,
      price: product.price,
      countInStock: product.countInStock,
      qty: 1,
      image: product.images[0]?.url ? product.images[0].url : '',
    }
    setCartProducts((prev) => [...prev, formatted])
    const cartItems = localStorage.getItem('cartItems')
    if (!cartItems) {
      localStorage.setItem('cartItems', JSON.stringify([formatted]))
    } else {
      const items: CartProductType[] = JSON.parse(cartItems)
      items.push(formatted)
      localStorage.setItem('cartItems', JSON.stringify(items))
      toast.success('Product added to cart')
    }
  }
}
