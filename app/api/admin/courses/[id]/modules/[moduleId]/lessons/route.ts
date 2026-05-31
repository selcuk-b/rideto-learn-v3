import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

interface Params { params: { id: string; moduleId: string } }

export async function GET(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const lessons = await prisma.lesson.findMany({
    where: { moduleId: params.moduleId },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(lessons)
}

export async function POST(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const body = await request.json()
  const { slug, title, content, estimatedReadTime, keyTakeaway, youtubeVideoId } = body

  if (!slug || !title) {
    return NextResponse.json({ error: 'slug and title are required' }, { status: 400 })
  }

  const last = await prisma.lesson.findFirst({
    where: { moduleId: params.moduleId },
    orderBy: { order: 'desc' },
  })
  const order = (last?.order ?? 0) + 1

  const lesson = await prisma.lesson.create({
    data: {
      slug,
      title,
      content: content ?? '',
      estimatedReadTime: estimatedReadTime ?? '5 min',
      keyTakeaway: keyTakeaway ?? '',
      youtubeVideoId: youtubeVideoId ?? null,
      order,
      moduleId: params.moduleId,
    },
  })
  return NextResponse.json(lesson, { status: 201 })
}
