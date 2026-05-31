import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

interface Params { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: { lessons: { orderBy: { order: 'asc' } } },
      },
    },
  })
  if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(course)
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const body = await request.json()
  const { title, description, status, estimatedTime, trainingType, order } = body

  const course = await prisma.course.update({
    where: { id: params.id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      ...(estimatedTime !== undefined && { estimatedTime }),
      ...(trainingType !== undefined && { trainingType }),
      ...(order !== undefined && { order }),
    },
  })
  return NextResponse.json(course)
}

export async function DELETE(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  await prisma.course.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
