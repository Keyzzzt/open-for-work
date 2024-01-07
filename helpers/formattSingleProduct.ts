import { format } from 'date-fns'
import { ProductType } from '@/app/(admin)/dashboard/(routes)/entities/products/(c)/EditProductForm'

/**
 * @param product - single product from database.
 * @returns product, type of ProductType.
 */
export const formattSingleProduct = (product: any): ProductType => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: product.price,
    countInStock: product.countInStock,
    createdAt: format(product.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(product.updatedAt, 'MMMM do, yyyy'),
    category: {
      id: product.category.id,
      title: product.category.title,
      description: product.category.description,
      createdAt: format(product.category.createdAt, 'MMMM do, yyyy'),
      updatedAt: format(product.category.updatedAt, 'MMMM do, yyyy'),
      products: product.category.products,
    },
    images: product.images.map((image: any) => ({
      id: image.id,
      url: image.url,
      public_id: image.public_id,
      createdAt: format(image.createdAt, 'MMMM do, yyyy'),
      productId: image.productId,
    })),
  }
}
