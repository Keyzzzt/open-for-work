import { FC } from 'react'
import { FormFieldErrorMessage } from '@/components/FormFieldErrorMessage'
import { Paragraph } from '@/components/text/Paragraph'

type Props = {
  register: Function
  errors: any
  id: string
  name: string
  label: string
  description?: string
  defaultValue?: boolean
}
export const InputCheckbox: FC<Props> = ({
  register,
  errors,
  label,
  description,
  name,
  id,
  defaultValue,
}) => {
  return (
    <div className='relative flex gap-x-3'>
      <div className='flex h-6 items-center'>
        <input
          {...register(name)}
          id={id}
          name={name}
          type='checkbox'
          defaultChecked={defaultValue}
          className='remove-tw-outline h-4 w-4 rounded border-2 border-borderColor text-accent'
        />
      </div>
      <div>
        <label htmlFor={id} className='text-textColor'>
          {label}
        </label>
        {description && <Paragraph value={description} />}
      </div>
      {errors.isFeatured && (
        <FormFieldErrorMessage message={errors.isFeatured.message as string} />
      )}
    </div>
  )
}
