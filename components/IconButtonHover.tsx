'use client'
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
} from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type HoverIconButtonType = DefaultProps & {
  icon: ReactElement
}

type Props = {
  items: HoverIconButtonType[]
}

export const IconButtonHover: FC<Props> = ({ items }) => {
  return (
    <div className='absolute flex justify-center z-50 opacity-0 group-hover:opacity-100 transition w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      {items.map((item, idx) => (
        <button
          type='button'
          key={idx}
          onClick={item.onClick}
          disabled={item.disabled}
          className={cn(
            'h-14 w-14 hover:scale-110 transition rounded-full flex items-center justify-center bg-white border border-borderColor shadow-md p-2 z-10',
            item.className,
          )}
        >
          {item.icon}
        </button>
      ))}
    </div>
  )
}
