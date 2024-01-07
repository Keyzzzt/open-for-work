'use client'
import { FC } from 'react'
import { CiShoppingCart } from 'react-icons/ci'

type Props = {
  productsLength: number
}

export const HeaderCartIcon: FC<Props> = ({ productsLength }) => {
  return (
    <div className='flex group-hover:text-textHover'>
      <CiShoppingCart size={22} className='flex-shrink-0' aria-hidden='true' />
      <span className='ml-2'>{productsLength}</span>
      <span className='sr-only'>items in cart, view bag</span>
    </div>
  )
}
