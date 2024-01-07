'use client'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { registerSchema, TRegisterSchema } from '@/schemas'
import { Input } from '@/components/Input'
import { CustomButton } from '@/components/CustomButton'

//TODO button => CustomButton

type Props = {
  isRegistered: boolean
}

export const Register: FC<Props> = ({ isRegistered }) => {
  const router = useRouter()
  if (isRegistered) {
    router.push('/')
  }
  const [isMounted, setIsMounted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) })

  useEffect(() => setIsMounted(true), [])
  if (!isMounted) return null

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      const response = await fetch('/api/register', {
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
        const errors = res.errors
        if (errors.email) {
          return setError('email', {
            type: 'server',
            message: errors.email,
          })
        } else if (errors.password) {
          return setError('password', {
            type: 'server',
            message: errors.password,
          })
        } else if (errors.confirmPassword) {
          return setError('confirmPassword', {
            type: 'server',
            message: errors.confirmPassword,
          })
        } else {
          return toast.error('Something went wrong!')
        }
      }

      toast.success('Registered!')
      router.push('/dashboard')
      reset()
    } catch (err) {
      toast.error('Failed!')
      console.error('Failed to register: ', err)
    }
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9'>
          Register new administrator
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <div>
              <Input
                register={register}
                errors={errors}
                id='register-email'
                type='email'
                name='email'
                label='Email'
                defaultValue='frontend@hire.me'
              />
            </div>

            <div className='mt-4'>
              <Input
                register={register}
                errors={errors}
                id='register-name'
                type='text'
                name='name'
                label='Name'
                defaultValue='Admin'
              />
            </div>

            <div className='mt-4'>
              <Input
                register={register}
                errors={errors}
                id='register-password'
                type='text'
                name='password'
                label='Password'
                defaultValue='frontend@hire.me'
              />
            </div>

            <div className='mt-4'>
              <Input
                register={register}
                errors={errors}
                id='register-confirm'
                type='text'
                name='confirmPassword'
                label='Confirm'
                defaultValue='frontend@hire.me'
              />
            </div>
            <CustomButton
              type='submit'
              fill='primary'
              title='Register'
              disabled={isSubmitting}
              className='w-full mt-10'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
