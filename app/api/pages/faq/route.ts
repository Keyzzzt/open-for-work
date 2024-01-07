import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { faqPageSchema } from '@/schemas'

// Update FAQ page
export async function PATCH(req: Request) {
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
    const errors = validateBody(body, faqPageSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    // Check if FAQ page exists with given id
    const page = await prismaClient.faqPage.findFirst({})
    if (!page) {
      return NextResponse.json(
        { errors: ['FAQ page not found!'] },
        {
          status: 404,
        },
      )
    }

    await prismaClient.faqPage.updateMany({
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
    console.error(`/api/faq PATCH ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
