'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronUp, ChevronDown, ChevronRight, Trash2, FileText } from 'lucide-react'

interface LessonItem { id: string; title: string; slug: string; order: number; estimatedReadTime: string }

export default function LessonList({ courseId, moduleId, lessons: initial }: { courseId: string; moduleId: string; lessons: LessonItem[] }) {
  const router = useRouter()
  const [lessons, setLessons] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function move(index: number, direction: 'up' | 'down') {
    const newList = [...lessons]
    const swap = direction === 'up' ? index - 1 : index + 1
    ;[newList[index], newList[swap]] = [newList[swap], newList[index]]
    setLessons(newList)
    await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}/lessons/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds: newList.map((l) => l.id) }),
    })
    router.refresh()
  }

  async function remove(id: string, title: string) {
    if (!confirm(`Delete lesson "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}/lessons/${id}`, { method: 'DELETE' })
    setLessons((ls) => ls.filter((l) => l.id !== id))
    router.refresh()
    setDeleting(null)
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-gray-200 rounded-xl text-gray-400">
        <FileText size={24} className="mx-auto mb-2 opacity-30" />
        <p className="text-sm">No lessons yet. Add your first lesson above.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {lessons.map((lesson, i) => (
        <div key={lesson.id} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <button onClick={() => move(i, 'up')} disabled={i === 0} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 cursor-pointer"><ChevronUp size={14} /></button>
            <button onClick={() => move(i, 'down')} disabled={i === lessons.length - 1} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 cursor-pointer"><ChevronDown size={14} /></button>
          </div>
          <span className="text-xs font-bold text-gray-300 w-5 text-center">{i + 1}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{lesson.title}</p>
            <p className="text-xs text-gray-400">{lesson.estimatedReadTime} · /{lesson.slug}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => remove(lesson.id, lesson.title)} disabled={deleting === lesson.id} className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-30"><Trash2 size={14} /></button>
            <Link href={`/admin/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`} className="text-gray-300 hover:text-[#2CCEAC] transition-colors"><ChevronRight size={16} /></Link>
          </div>
        </div>
      ))}
    </div>
  )
}
