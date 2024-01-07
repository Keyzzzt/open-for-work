import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { paragraphSchema } from '@/schemas'

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
    const errors = validateBody(body, paragraphSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    // Check if FAQ item exists with given id
    const { id } = params
    const paragraph = await prismaClient.paragraph.findUnique({
      where: {
        id,
      },
    })
    if (!paragraph) {
      return NextResponse.json(
        { errors: ['Paragraph not found!'] },
        {
          status: 404,
        },
      )
    }

    await prismaClient.paragraph.update({
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
    console.error(`/api/paragraph/id PATCH ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
