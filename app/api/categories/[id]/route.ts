import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { categorySchema } from '@/schemas'

// Update product category
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

    // Check ID and category in DB
    const { id } = params
    const category = await prismaClient.category.findUnique({
      where: { id },
    })
    if (!category) {
      return NextResponse.json(
        { errors: ['Category not found!'] },
        { status: 404 },
      )
    }

    // Check body
    const body = await req.json()
    const errors = validateBody(body, categorySchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    await prismaClient.category.update({
      where: {
        id,
      },
      data: { ...body },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/categories/id PATCH ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}

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

    // Check ID and category in DB
    const { id } = params
    const category = await prismaClient.category.findUnique({
      where: { id },
    })
    if (!category) {
      return NextResponse.json(
        { errors: ['Category not found!'] },
        { status: 404 },
      )
    }

    // Check not allowed to delete All category
    if (category?.title === 'All') {
      return NextResponse.json(
        { errors: ['"All category can\'t be deleted!"'] },
        { status: 400 },
      )
    }

    // Check if category is in use
    const products = await prismaClient.product.findMany({
      where: { id },
    })
    if (products.length > 0) {
      return NextResponse.json(
        { errors: ['Category is in use.'] },
        { status: 400 },
      )
    }

    await prismaClient.category.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(`/api/categories/id DELETE ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
