'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Course } from '@/lib/generated/prisma/client'

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CCEAC]/30 focus:border-[#2CCEAC] transition-colors'

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {children}
    </div>
  )
}

export default function CourseForm({ course }: { course: Course }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: course.title,
    description: course.description,
    estimatedTime: course.estimatedTime,
    status: course.status,
    trainingType: course.trainingType,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError('')
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to save')
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Title">
        <input type="text" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} required />
      </Field>
      <Field label="Description">
        <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} className={`${inputCls} resize-none h-20`} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Estimated Time">
          <input type="text" value={form.estimatedTime} onChange={(e) => setForm(f => ({ ...f, estimatedTime: e.target.value }))} className={inputCls} placeholder="~75 min" />
        </Field>
        <Field label="Status">
          <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value as 'draft' | 'published' | 'archived' }))} className={inputCls}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </Field>
      </div>
      {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
      <button type="submit" disabled={saving} className="bg-[#2CCEAC] hover:bg-[#25b899] disabled:opacity-50 text-white font-heading text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors">
        {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Changes'}
      </button>
    </form>
  )
}
