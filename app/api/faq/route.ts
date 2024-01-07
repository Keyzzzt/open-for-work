import getUser from '@/helpers/getUser'
import { prismaClient } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import { validateBody } from '@/helpers/serverValidation'
import { newFaqSchema } from '@/schemas'

// Create new FAQ item
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
    const errors = validateBody(body, newFaqSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    // Check if category exists with given id
    const category = await prismaClient.category.findUnique({
      where: {
        id: body.categoryId,
      },
    })
    if (!category) {
      return NextResponse.json(
        { errors: ['Category not found!'] },
        {
          status: 404,
        },
      )
    }

    const created = await prismaClient.faqItem.create({
      data: {
        ...body,
        categoryId: body.categoryId,
      },
    })

    return NextResponse.json(
      { success: true, data: created.id },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/faq POST ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
