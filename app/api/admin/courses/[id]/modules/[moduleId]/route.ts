import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/admin-auth'

interface Params { params: { id: string; moduleId: string } }

export async function PATCH(request: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  const body = await request.json()
  const { title, description, estimatedTime, icon, slug } = body

  const mod = await prisma.module.update({
    where: { id: params.moduleId },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(estimatedTime !== undefined && { estimatedTime }),
      ...(icon !== undefined && { icon }),
      ...(slug !== undefined && { slug }),
    },
  })
  return NextResponse.json(mod)
}

export async function DELETE(_: Request, { params }: Params) {
  const auth = requireAdminAuth()
  if (auth) return auth

  await prisma.module.delete({ where: { id: params.moduleId } })
  return NextResponse.json({ ok: true })
}
