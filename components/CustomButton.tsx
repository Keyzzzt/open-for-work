import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type Props = DefaultProps & {
  title: string
  fill: 'success' | 'danger' | 'blank' | 'primary'
}

export const CustomButton: FC<Props> = ({
  type,
  fill,
  title,
  disabled,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'py-2 px-3 text-sm text-textColor font-bold rounded-md transition-colors uppercase',
        className,
        {
          'disabled:bg-gray disabled:border-gray disabled:text-white hover:text-white hover:bg-successHover active:bg-successActive':
            fill === 'success',
          'disabled:bg-gray disabled:border-gray disabled:text-white hover:text-white hover:bg-dangerHover active:bg-dangerActive':
            fill === 'danger',
          'disabled:bg-gray disabled:border-gray disabled:text-white text-white bg-accent hover:bg-accentHover active:bg-accentActive':
            fill === 'primary',
          'disabled:text-textColor hover:text-textHover': fill === 'blank',
        },
      )}
    >
      {title}
    </button>
  )
}
