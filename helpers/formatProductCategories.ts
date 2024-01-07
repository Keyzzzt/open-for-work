import { format } from 'date-fns'

export type Category = {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  products: any[]
  [key: string]: string | any[]
}

/**
 * @param categories - array of categories from database
 * @returns array, of type Category
 */
export const formatProductCategories = (categories: any[]): Category[] => {
  return categories.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    createdAt: format(c.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(c.updatedAt, 'MMMM do, yyyy'),
    products: c.products,
  }))
}
