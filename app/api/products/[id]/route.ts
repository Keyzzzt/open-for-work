import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { productSchema } from '@/schemas'

// Update single product
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
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

    // Check product with given id
    const { id } = params
    const product = await prismaClient.product.findUnique({
      where: { id },
    })
    if (!product) {
      return NextResponse.json(
        { errors: ['Product not found!'] },
        {
          status: 404,
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

    await prismaClient.product.update({
      where: {
        id,
      },
      data: {
        ...body,
        price: parseInt(body.price),
        countInStock: parseInt(body.countInStock),
        images: {
          deleteMany: {},
        },
      },
    })

    await prismaClient.product.update({
      where: {
        id,
      },
      data: {
        images: { createMany: { data: body.images } },
      },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/product/id PATCH ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}

// Delete single product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
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

    // Check product with given id
    const { id } = params
    const product = await prismaClient.product.findUnique({
      where: { id },
    })
    if (!product) {
      return NextResponse.json(
        { errors: ['Product not found!'] },
        {
          status: 404,
        },
      )
    }

    await prismaClient.product.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/products/id DELETE ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
