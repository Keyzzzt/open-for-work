import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-hot-toast'
import crypto from 'crypto'
import { TParagraph } from '@/app/(admin)/dashboard/(routes)/entities/stories/(c)/NewStoryForm'
import { Dispatch, SetStateAction } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleProductFieldValidation = (res: any, setError: Function) => {
  const errors = res.errors
  if (errors.title) {
    return setError('title', {
      type: 'server',
      message: errors.title,
    })
  } else if (errors.description) {
    return setError('description', {
      type: 'server',
      message: errors.description,
    })
  } else if (errors.price) {
    return setError('price', {
      type: 'server',
      message: errors.price,
    })
  } else if (errors.countInStock) {
    return setError('countInStock', {
      type: 'server',
      message: errors.countInStock,
    })
  } else if (errors.isFeatured) {
    return setError('isFeatured', {
      type: 'server',
      message: errors.isFeatured,
    })
  } else if (errors.isArchived) {
    return setError('isArchived', {
      type: 'server',
      message: errors.isArchived,
    })
  } else {
    return toast.error('Something went wrong!')
  }
}
export const handleStoryFieldValidation = (res: any, setError: Function) => {
  const errors = res.errors
  if (errors.title) {
    return setError('title', {
      type: 'server',
      message: errors.title,
    })
  } else if (errors.description) {
    return setError('description', {
      type: 'server',
      message: errors.description,
    })
  } else if (errors.content) {
    return setError('content', {
      type: 'server',
      message: errors.content,
    })
  } else if (errors.isFeatured) {
    return setError('isFeatured', {
      type: 'server',
      message: errors.isFeatured,
    })
  } else if (errors.disabled) {
    return setError('disabled', {
      type: 'server',
      message: errors.disabled,
    })
  } else {
    return toast.error('Something went wrong!')
  }
}

export const generateSHA1 = (data: any) => {
  const hash = crypto.createHash('sha1')
  hash.update(data)
  return hash.digest('hex')
}

export const generateSignature = (
  timestamp: string,
  publicId: string,
  apiSecret: string,
) => {
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
}

export const swapParagraphs = (
  paragraphs: TParagraph[],
  setParagraphs: Dispatch<SetStateAction<TParagraph[]>>,
  direction: 'up' | 'down',
  currentPosition: number,
) => {
  if (direction === 'up') {
    const temp = paragraphs[currentPosition - 1]
    const arr = [...paragraphs]
    arr[currentPosition - 1] = arr[currentPosition]
    arr[currentPosition] = temp
    setParagraphs(arr)
  } else {
    const temp = paragraphs[currentPosition + 1]
    const arr = [...paragraphs]
    arr[currentPosition + 1] = arr[currentPosition]
    arr[currentPosition] = temp
    setParagraphs(arr)
  }
  toast.success(`Moved ${direction}`)
}

export const capitalizeFirstLetter = (text: string) => {
  return text[0].toUpperCase() + text.slice(1)
}
