import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { testimonialItemSchema } from '@/schemas'

// Update testimonial item
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

    // Check item with given id
    const { id } = params
    const item = await prismaClient.testimonialItem.findUnique({
      where: { id },
    })
    if (!item) {
      return NextResponse.json(
        { errors: ['Item not found!'] },
        {
          status: 404,
        },
      )
    }

    // Check body
    const body = await req.json()
    const errors = validateBody(body, testimonialItemSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    await prismaClient.testimonialItem.updateMany({
      where: {
        id,
      },
      data: {
        ...body,
      },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/pages/landing/testimonial/id PATCH ${error}`)
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
    const item = await prismaClient.testimonialItem.findUnique({
      where: { id },
    })
    if (!item) {
      return NextResponse.json(
        { errors: ['Item not found!'] },
        {
          status: 404,
        },
      )
    }

    await prismaClient.testimonialItem.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/testimonial/id DELETE ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
