'use client'
import { FC } from 'react'
import { Social } from '.prisma/client'
import { Input } from '@/components/Input'
import { useForm } from 'react-hook-form'
import { socialsSchema, TSocialsSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { capitalizeFirstLetter } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { CustomButton } from '@/components/CustomButton'
import { useRouter } from 'next/navigation'

type Props = {
  socials: Social[]
}

export const Socials: FC<Props> = ({ socials }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSocialsSchema>({ resolver: zodResolver(socialsSchema) })

  const onSubmit = async (data: TSocialsSchema) => {
    try {
      const response = await fetch('/api/socials', {
        method: 'POST',
        body: JSON.stringify({ ...data }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        toast.error('Failed!')
      }

      const res = await response.json()

      if (res.errors) {
        // todo field validation
      }

      toast.success(`Updated!`)
      router.refresh()
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to update socials: ', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {socials.map((s) => (
        <Input
          key={s.id}
          register={register}
          errors={errors}
          id={`socials-${s.title}`}
          type='text'
          name={s.title}
          label={capitalizeFirstLetter(s.title)}
          defaultValue={s.url ? s.url : ''}
        />
      ))}

      <div className='mt-6 flex justify-end gap-x-6'>
        <CustomButton
          fill='success'
          type='submit'
          disabled={isSubmitting}
          title='Update'
        />
      </div>
    </form>
  )
}
