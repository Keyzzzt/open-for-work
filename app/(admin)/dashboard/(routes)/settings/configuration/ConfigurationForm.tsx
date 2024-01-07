'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { configurationSchema, TConfigurationSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomButton } from '@/components/CustomButton'
import { toast } from 'react-hot-toast'
import { Input } from '@/components/Input'

type Props = {
  taxRate: number
}

export const ConfigurationForm: FC<Props> = ({ taxRate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TConfigurationSchema>({
    resolver: zodResolver(configurationSchema),
  })

  const onSubmit = async (data: TConfigurationSchema) => {
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        body: JSON.stringify({ ...data }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        return toast.error('Failed!')
      }

      const res = await response.json()

      if (res.errors) {
        const errors = res.errors
        if (errors.title) {
          return setError('taxRate', {
            type: 'server',
            message: errors.taxRate,
          })
        } else {
          return toast.error('Failed!')
        }
      }

      toast.success('Updated!')
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to update configuration: ', err)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input
        register={register}
        errors={errors}
        id='tax-rate'
        placeholder='Current VAT rate'
        type='number'
        name='taxRate'
        label='Tax rate'
        defaultValue={taxRate}
      />
      <div className='mt-10 flex items-center justify-end'>
        <CustomButton
          fill='success'
          title='Update'
          disabled={isSubmitting}
          type='submit'
        />
      </div>
    </form>
  )
}
