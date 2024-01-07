import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'

// Removes all images for a given product id
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } },
) {
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

    // Check product id in params
    const { productId } = params
    if (!productId) {
      return NextResponse.json(
        { errors: ['Product ID not found!'] },
        { status: 400 },
      )
    }

    // Check if product exists
    const product = await prismaClient.product.findUnique({
      where: {
        id: productId,
      },
    })
    if (!product) {
      return NextResponse.json(
        { errors: ['Product not found!'] },
        { status: 404 },
      )
    }

    await prismaClient.image.deleteMany({
      where: {
        productId,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(`/api/images/productId/all DELETE ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
