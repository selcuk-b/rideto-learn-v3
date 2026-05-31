'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronUp, ChevronDown, ChevronRight, Trash2, BookOpen } from 'lucide-react'

interface ModuleItem {
  id: string
  title: string
  slug: string
  order: number
  estimatedTime: string
  _count: { lessons: number }
}

export default function ModuleList({ courseId, modules: initial }: { courseId: string; modules: ModuleItem[] }) {
  const router = useRouter()
  const [modules, setModules] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function move(index: number, direction: 'up' | 'down') {
    const newList = [...modules]
    const swap = direction === 'up' ? index - 1 : index + 1
    ;[newList[index], newList[swap]] = [newList[swap], newList[index]]
    setModules(newList)

    await fetch(`/api/admin/courses/${courseId}/modules/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds: newList.map((m) => m.id) }),
    })
    router.refresh()
  }

  async function remove(id: string, title: string) {
    if (!confirm(`Delete module "${title}" and all its lessons? This cannot be undone.`)) return
    setDeleting(id)
    await fetch(`/api/admin/courses/${courseId}/modules/${id}`, { method: 'DELETE' })
    setModules((ms) => ms.filter((m) => m.id !== id))
    router.refresh()
    setDeleting(null)
  }

  if (modules.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-gray-200 rounded-xl text-gray-400">
        <BookOpen size={24} className="mx-auto mb-2 opacity-30" />
        <p className="text-sm">No modules yet. Add your first module above.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {modules.map((mod, i) => (
        <div
          key={mod.id}
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3"
        >
          {/* Reorder */}
          <div className="flex flex-col gap-0.5">
            <button onClick={() => move(i, 'up')} disabled={i === 0} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 cursor-pointer">
              <ChevronUp size={14} />
            </button>
            <button onClick={() => move(i, 'down')} disabled={i === modules.length - 1} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 cursor-pointer">
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Order number */}
          <span className="text-xs font-bold text-gray-300 w-5 text-center">{i + 1}</span>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{mod.title}</p>
            <p className="text-xs text-gray-400">{mod._count.lessons} lessons · {mod.estimatedTime}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => remove(mod.id, mod.title)}
              disabled={deleting === mod.id}
              className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-30"
            >
              <Trash2 size={14} />
            </button>
            <Link
              href={`/admin/courses/${courseId}/modules/${mod.id}`}
              className="text-gray-300 hover:text-[#2CCEAC] transition-colors"
            >
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
