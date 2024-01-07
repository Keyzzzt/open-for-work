'use client'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { useRouter } from 'next/navigation'
import { Paragraph } from '@/components/text/Paragraph'
import { cn } from '@/lib/utils'

type DefaultProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type Props = DefaultProps & {
  href?: string
  title: string
  subTitle?: string
}

export const EmptyState: FC<Props> = ({ href, subTitle, title, className }) => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(href ? href : '')}
      type='button'
      className={cn(
        'relative cursor-auto block w-full mx-auto rounded-lg border-2 border-dashed border-borderColor p-12 text-center',
        className,
        {
          'group cursor-pointer': !!href,
        },
      )}
    >
      <svg
        className='mx-auto h-12 w-12 group-hover:text-textHover'
        stroke='currentColor'
        fill='none'
        viewBox='0 0 48 48'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6'
        />
      </svg>
      <Paragraph className='group-hover:text-textHover mt-4' value={title} />
      <Paragraph
        className='group-hover:text-textHover mt-2'
        value={subTitle ? subTitle : ''}
      />
    </button>
  )
}
