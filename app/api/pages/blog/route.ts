import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import getUser from '@/helpers/getUser'
import { validateBody } from '@/helpers/serverValidation'
import { blogSchema } from '@/schemas'

// Update blog page
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
    const errors = validateBody(body, blogSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    await prismaClient.blogPage.updateMany({
      data: { ...body },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/pages/blog/stories POST ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
