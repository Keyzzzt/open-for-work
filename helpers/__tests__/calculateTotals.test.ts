import { calculateTotals } from '@/helpers/calculateTotals'
import { CartProductType } from '@/contexts/CartItemsContext'

export const cartProducts: CartProductType[] = [
  // Arrange
  {
    id: '1',
    title: 'string',
    qty: 2,
    price: 10,
    countInStock: 5,
    image: 'string',
  },
  {
    id: '2',
    title: 'string',
    qty: 3,
    price: 20,
    countInStock: 5,
    image: 'string',
  },
  {
    id: '3',
    title: 'string',
    qty: 1,
    price: 20,
    countInStock: 5,
    image: 'string',
  },
]

it('Should return correct data', () => {
  // Act
  const { tax, subTotal, totalPrice } = calculateTotals(cartProducts, 20)

  // Assert
  expect(tax).toEqual(20)
  expect(subTotal).toEqual(80)
  expect(totalPrice).toEqual(100)
})
