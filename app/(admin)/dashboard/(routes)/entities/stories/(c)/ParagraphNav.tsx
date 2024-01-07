import { FC } from 'react'
import { CiTrash } from 'react-icons/ci'
import { IconButton } from '@/components/IconButton'
import { IoArrowDownSharp, IoArrowUpSharp } from 'react-icons/io5'

type Props = {
  id: string
  position: number
  lastPosition: number
  onDelete: (id: string) => void
  onSwapPosition: (direction: 'up' | 'down', currentPosition: number) => void
}

export const ParagraphNav: FC<Props> = ({
  id,
  position,
  onDelete,
  lastPosition,
  onSwapPosition,
}) => {
  return (
    <div>
      {position !== 0 && (
        <IconButton
          className='mr-3'
          type='button'
          onClick={() => onSwapPosition('up', position)}
          icon={
            <>
              <span className='sr-only'>Move paragraph up</span>
              <IoArrowUpSharp size={24} aria-hidden='true' />
            </>
          }
        />
      )}
      {position !== lastPosition && (
        <IconButton
          className='mr-3'
          type='button'
          onClick={() => onSwapPosition('down', position)}
          icon={
            <>
              <span className='sr-only'>Move paragraph down</span>
              <IoArrowDownSharp size={24} aria-hidden='true' />
            </>
          }
        />
      )}
      <IconButton
        type='button'
        onClick={() => onDelete(id)}
        icon={
          <>
            <span className='sr-only'>Remove paragraph</span>
            <CiTrash size={24} aria-hidden='true' />
          </>
        }
      />
    </div>
  )
}
