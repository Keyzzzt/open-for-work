import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/prismaClient'
import { validateBody } from '@/helpers/serverValidation'
import { registerSchema } from '@/schemas'

// Register new admin user
export async function POST(req: Request) {
  try {
    // Check if user already exists
    const user = await prismaClient.user.findFirst({})
    if (user) {
      return NextResponse.json(
        { errors: ['Admin already exists'] },
        {
          status: 400,
        },
      )
    }

    // Check body
    const body = await req.json()
    const errors = validateBody(body, registerSchema)
    if (errors) {
      return NextResponse.json(
        { errors },
        {
          status: 400,
        },
      )
    }

    const hashedPassword = await bcrypt.hash(body.password, 12)

    await prismaClient.user.create({
      data: {
        email: body.email,
        name: body.name,
        hashedPassword,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(`/api/register POST ${error}`)
    return NextResponse.json({ errors: ['Server error'] }, { status: 500 })
  }
}
