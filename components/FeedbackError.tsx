import { FC } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

type Props = {
  title: string
  messages: string[]
  onClose: () => void
}
//TODO absolute or Alert, to avoid layout shift
export const FeedbackError: FC<Props> = ({ messages, onClose, title }) => {
  return (
    <div className='rounded-md bg-danger/20 p-4 my-6'>
      <div className='flex'>
        <div className='flex-shrink-0 mt-1'>
          <AiFillCloseCircle
            onClick={onClose}
            size={22}
            className='text-danger hover:bg-dangerHover active:text-dangerActive cursor-pointer'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3'>
          <h3 className='text-danger text-lg'>{title}</h3>
          <div className='mt-2 text-danger'>
            <ul role='list' className='list-disc space-y-1 pl-5'>
              {messages.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
