import { format } from 'date-fns'
import { ProductType } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'

/**
 * @param products - array of products from database
 * @returns products, type of ProductType[]
 */
export const formatProducts = (products: any): ProductType[] => {
  return products.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    isFeatured: p.isFeatured,
    isArchived: p.isArchived,
    price: p.price,
    countInStock: p.countInStock,
    createdAt: format(p.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(p.updatedAt, 'MMMM do, yyyy'),
    category: {
      id: p.category.id,
      title: p.category.title,
      description: p.category.description,
      createdAt: format(p.category.createdAt, 'MMMM do, yyyy'),
      updatedAt: format(p.category.updatedAt, 'MMMM do, yyyy'),
    },
    images: p.images.map((image: any) => ({
      id: image.id,
      url: image.url,
      public_id: image.public_id,
      createdAt: format(image.createdAt, 'MMMM do, yyyy'),
      productId: image.productId,
    })),
  }))
}
