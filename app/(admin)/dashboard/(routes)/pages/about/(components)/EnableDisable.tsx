import { FC } from 'react'

type Props = {
  disabled: boolean
}

export const EnableDisable: FC<Props> = ({ disabled }) => {
  return (
    <span className='min-w-[90px] px-3 text-sm font-bold uppercase'>
      {disabled ? 'Disabled' : 'Enabled'}
    </span>
  )
}
