import { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react'
import { Paragraph } from '@/components/text/Paragraph'
import { cn } from '@/lib/utils'

type Default = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

type Props = Default & {
  width: number
  height: number
}
export const AddImage: FC<Props> = ({ className, height, width, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        `group flex items-center justify-center h-[${height}px] w-[${width}px] cursor-pointer border border-borderColor`,
        className,
      )}
    >
      <Paragraph
        value='Click to add image'
        className='group-hover:text-textHover'
      />
    </div>
  )
}
