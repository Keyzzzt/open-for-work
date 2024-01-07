import { saleSchema } from '@/schemas'
import getUser from '@/helpers/getUser'
import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import { validateBody } from '@/helpers/serverValidation'

// Update sale section on landing page
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
    const errors = validateBody(body, saleSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    await prismaClient.landingSale.updateMany({
      data: { ...body },
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(`/api/pages/landing/sale POST ${error}`)
    return NextResponse.json({ errors: ['Server error!'] }, { status: 500 })
  }
}
