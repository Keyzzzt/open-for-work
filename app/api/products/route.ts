import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { productSchema } from '@/schemas'

// Create new product
export async function POST(req: Request) {
  try {
    // Check user
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { errors: ['Unauthorized!'] },
        {
          status: 401,
        },
      )
    }

    // Check body
    const body = await req.json()
    const errors = validateBody(body, productSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    const createdProduct = await prismaClient.product.create({
      data: {
        ...body,
        price: parseInt(body.price),
        countInStock: parseInt(body.countInStock),
        images: {
          createMany: {
            data: [...body.images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    return NextResponse.json(
      { success: true, data: createdProduct.id },
      { status: 200 },
    )
  } catch (error) {
    console.error(`/api/products POST ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
