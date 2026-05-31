'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CCEAC]/30 focus:border-[#2CCEAC] transition-colors'

function Field({ label, children, required, hint }: { label: string; children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {children}
    </div>
  )
}

export default function NewLessonPage({ params }: { params: { id: string; moduleId: string } }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', slug: '', content: '', estimatedReadTime: '5 min', keyTakeaway: '', youtubeVideoId: '' })

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: f.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/courses/${params.id}/modules/${params.moduleId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, youtubeVideoId: form.youtubeVideoId || null }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      const lesson = await res.json()
      router.push(`/admin/courses/${params.id}/modules/${params.moduleId}/lessons/${lesson.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create lesson')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <Link href={`/admin/courses/${params.id}/modules/${params.moduleId}`} className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6">
        <ChevronLeft size={14} /> Back to module
      </Link>
      <h1 className="font-heading text-2xl uppercase text-[#2B2B2B] mb-8">New Lesson</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title" required>
            <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputCls} placeholder="e.g. Right of Way Rules" required />
          </Field>
          <Field label="Slug" required hint="Auto-generated from title">
            <input type="text" value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))} className={inputCls} pattern="[a-z0-9-]+" required />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Read Time">
            <input type="text" value={form.estimatedReadTime} onChange={(e) => setForm(f => ({ ...f, estimatedReadTime: e.target.value }))} className={inputCls} placeholder="5 min" />
          </Field>
          <Field label="YouTube Video ID" hint="Optional — just the ID, e.g. dQw4w9WgXcQ">
            <input type="text" value={form.youtubeVideoId} onChange={(e) => setForm(f => ({ ...f, youtubeVideoId: e.target.value }))} className={inputCls} placeholder="Optional" />
          </Field>
        </div>
        <Field label="Content" hint="Supports **bold** markdown">
          <textarea value={form.content} onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))} className={`${inputCls} resize-y h-48 font-mono text-xs`} placeholder="Write the lesson content here..." />
        </Field>
        <Field label="Key Takeaway" hint="One sentence summary shown at the bottom of the lesson">
          <textarea value={form.keyTakeaway} onChange={(e) => setForm(f => ({ ...f, keyTakeaway: e.target.value }))} className={`${inputCls} resize-none h-16`} placeholder="The most important thing to remember..." />
        </Field>

        {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-[#2CCEAC] hover:bg-[#25b899] disabled:opacity-50 text-white font-heading text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors">
            {saving ? 'Creating…' : 'Create Lesson'}
          </button>
          <Link href={`/admin/courses/${params.id}/modules/${params.moduleId}`} className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-700">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
