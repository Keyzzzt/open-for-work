import { FC } from 'react'
import { CustomButton } from '@/components/CustomButton'
import { EnableDisable } from '@/app/(admin)/dashboard/(routes)/pages/about/(components)/EnableDisable'

type Props = {
  disabled: boolean
  onClick: () => void
}
export const EditSectionNav: FC<Props> = ({ disabled, onClick }) => {
  return (
    <div className='flex justify-end items-center mb-10'>
      <CustomButton onClick={onClick} fill='blank' title='Edit' />
      <EnableDisable disabled={disabled} />
    </div>
  )
}
