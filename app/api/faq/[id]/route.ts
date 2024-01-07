import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { newFaqSchema } from '@/schemas'

// Update FAQ item
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

    // Check body
    const body = await req.json()
    const errors = validateBody(body, newFaqSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    if (!body.categoryId) {
      return NextResponse.json(
        { errors: ['Category IDs not found!'] },
        {
          status: 400,
        },
      )
    }

    // Check if FAQ item exists with given id
    const { id } = params
    const faq = await prismaClient.faqItem.findUnique({
      where: {
        id,
      },
    })
    if (!faq) {
      return NextResponse.json(
        { errors: ['FAQ not found!'] },
        {
          status: 404,
        },
      )
    }

    await prismaClient.faqItem.update({
      where: {
        id,
      },
      data: {
        ...body,
        categoryId: body.categoryId,
      },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/faq/id PATCH ${error}`)
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

    // Check if FAQ exists with given id
    const { id } = params
    const faq = await prismaClient.faqItem.findUnique({
      where: { id },
    })
    if (!faq) {
      return NextResponse.json(
        { errors: ['FAQ not found'] },
        {
          status: 400,
        },
      )
    }

    await prismaClient.faqItem.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(`/api/faq/id DELETE ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
