import { FC } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  register: Function
  errors: any
  id: string
  type: 'number' | 'text' | 'textarea' | 'email'
  name: string
  className?: string
  label?: string
  defaultValue?: string | number
  placeholder?: string
  rows?: number
}

// TODO NOT WORKING
export const Input: FC<Props> = ({
  id,
  type,
  name,
  rows,
  label,
  errors,
  register,
  className,
  placeholder,
  defaultValue,
}) => {
  return (
    <div className={cn('relative mt-4', className)}>
      {label && (
        <label htmlFor={id} className='block text-textColor'>
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          {...register(name)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={cn(
            'mt-1 remove-tw-outline text-textColor block w-full rounded-md py-1.5 border-borderColor focus:outline-none placeholder:text-lightGray',
            {
              'border-danger': errors[name] && errors[name].message,
            },
          )}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={cn(
            'mt-1 remove-tw-outline text-textColor block w-full rounded-md py-1.5 border-borderColor focus:outline-none',
            className,
            {
              'border-danger': errors[name] && errors[name].message,
            },
          )}
        />
      )}
      {/*{errors[name] && (*/}
      {/*  <FormFieldErrorMessage*/}
      {/*    className='absolute bottom-[-10] left-0'*/}
      {/*    message={errors[name].message as string}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  )
}
