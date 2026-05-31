import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function GET() {
  const auth = requireAdminAuth()
  if (auth) return auth

  const courses = await prisma.course.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { modules: true } } },
  })
  return NextResponse.json(courses)
}

export async function POST(request: Request) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const body = await request.json()
  const { slug, title, description, trainingType, estimatedTime, status, order } = body

  if (!slug || !title) {
    return NextResponse.json({ error: 'slug and title are required' }, { status: 400 })
  }

  const course = await prisma.course.create({
    data: { slug, title, description: description ?? '', trainingType: trainingType ?? 'cbt', estimatedTime: estimatedTime ?? '', status: status ?? 'draft', order: order ?? 0 },
  })
  return NextResponse.json(course, { status: 201 })
}
