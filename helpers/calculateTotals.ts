import { CartProductType } from '@/contexts/CartItemsContext'

/**
 * @param cartProducts - array of cart products from local storage
 * @param taxRate - number that represents tax rate
 * @returns {tax - total tax, subTotal - price excluding tax, totalPrice - price including tax}
 */
export const calculateTotals = (
  cartProducts: CartProductType[],
  taxRate: number = 0,
) => {
  const totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  )
  const tax = (totalPrice / 100) * Number(taxRate)
  const subTotal = totalPrice - tax
  return { subTotal, tax, totalPrice }
}
