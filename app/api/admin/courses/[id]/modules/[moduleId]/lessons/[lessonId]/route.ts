import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

interface Params { params: { id: string; moduleId: string; lessonId: string } }

export async function GET(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const lesson = await prisma.lesson.findUnique({ where: { id: params.lessonId } })
  if (!lesson) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(lesson)
}

export async function PATCH(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const body = await request.json()
  const { title, slug, content, estimatedReadTime, keyTakeaway, youtubeVideoId } = body

  const lesson = await prisma.lesson.update({
    where: { id: params.lessonId },
    data: {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(content !== undefined && { content }),
      ...(estimatedReadTime !== undefined && { estimatedReadTime }),
      ...(keyTakeaway !== undefined && { keyTakeaway }),
      ...(youtubeVideoId !== undefined && { youtubeVideoId: youtubeVideoId || null }),
    },
  })
  return NextResponse.json(lesson)
}

export async function DELETE(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  await prisma.lesson.delete({ where: { id: params.lessonId } })
  return NextResponse.json({ ok: true })
}
