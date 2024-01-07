'use client'
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

export type CartProductType = {
  id: string
  title: string
  qty: number
  price: number
  countInStock: number
  image: string
}

type ContextProps = {
  cartProducts: CartProductType[]
  setCartProducts: Dispatch<SetStateAction<CartProductType[]>>
}

type Props = {
  children: ReactNode
}
export const CartItemsContext = createContext([] as unknown as ContextProps)

export const CartItemsContextProvider: FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([])

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems')
    if (!cartItems) {
      return
    } else {
      setCartProducts(JSON.parse(cartItems))
    }
  }, [])

  return (
    <CartItemsContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartItemsContext.Provider>
  )
}
