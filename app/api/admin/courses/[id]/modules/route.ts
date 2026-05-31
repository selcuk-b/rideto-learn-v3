import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

interface Params { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const modules = await prisma.module.findMany({
    where: { courseId: params.id },
    orderBy: { order: 'asc' },
    include: { _count: { select: { lessons: true } } },
  })
  return NextResponse.json(modules)
}

export async function POST(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const body = await request.json()
  const { slug, title, description, estimatedTime, icon } = body

  if (!slug || !title) {
    return NextResponse.json({ error: 'slug and title are required' }, { status: 400 })
  }

  // Set order to end of list
  const last = await prisma.module.findFirst({
    where: { courseId: params.id },
    orderBy: { order: 'desc' },
  })
  const order = (last?.order ?? 0) + 1

  const mod = await prisma.module.create({
    data: {
      slug,
      title,
      description: description ?? '',
      estimatedTime: estimatedTime ?? '',
      icon: icon ?? null,
      order,
      courseId: params.id,
    },
  })
  return NextResponse.json(mod, { status: 201 })
}
