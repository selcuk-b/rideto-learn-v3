import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const { orderedIds } = await request.json() as { orderedIds: string[] }

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.lesson.update({ where: { id }, data: { order: index + 1 } })
    )
  )
  return NextResponse.json({ ok: true })
}
