'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import dynamic from 'next/dynamic'

// Load Tiptap only on client (avoids SSR issues)
const RichTextEditor = dynamic(() => import('@/app/admin/components/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="border border-gray-200 rounded-xl h-64 bg-gray-50 animate-pulse" />,
})

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

interface Lesson {
  id: string; title: string; slug: string; content: string
  estimatedReadTime: string; keyTakeaway: string; youtubeVideoId: string | null
}

export default function LessonEditor({ lesson, courseId, moduleId }: { lesson: Lesson; courseId: string; moduleId: string }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: lesson.title,
    slug: lesson.slug,
    estimatedReadTime: lesson.estimatedReadTime,
    youtubeVideoId: lesson.youtubeVideoId ?? '',
    content: lesson.content,
    keyTakeaway: lesson.keyTakeaway,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError('')
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, youtubeVideoId: form.youtubeVideoId || null }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Metadata */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-2">Lesson Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title">
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} required />
          </Field>
          <Field label="Slug" hint="⚠️ Changing breaks the URL and learner progress">
            <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className={inputCls} pattern="[a-z0-9-]+" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Read Time">
            <input type="text" value={form.estimatedReadTime} onChange={e => setForm(f => ({ ...f, estimatedReadTime: e.target.value }))} className={inputCls} placeholder="5 min" />
          </Field>
          <Field label="YouTube Video ID" hint="Just the ID — leave blank for none">
            <input type="text" value={form.youtubeVideoId} onChange={e => setForm(f => ({ ...f, youtubeVideoId: e.target.value }))} className={inputCls} placeholder="Optional" />
          </Field>
        </div>
      </div>

      {/* Rich text content editor */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-4">Content</h2>
        <RichTextEditor
          content={form.content}
          onChange={html => setForm(f => ({ ...f, content: html }))}
          placeholder="Write the lesson content here…"
        />
      </div>

      {/* Key Takeaway */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <Field label="Key Takeaway" hint="One sentence shown in the green box at the bottom of the lesson">
          <textarea
            value={form.keyTakeaway}
            onChange={e => setForm(f => ({ ...f, keyTakeaway: e.target.value }))}
            className={`${inputCls} resize-none h-20`}
            placeholder="The most important thing to remember from this lesson..."
          />
        </Field>
      </div>

      {/* Save */}
      {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#2CCEAC] hover:bg-[#25b899] disabled:opacity-50 text-white font-heading text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>
        <a
          href={`/courses/pre-cbt/modules/${moduleId}/lessons/${form.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#2CCEAC] transition-colors"
        >
          <ExternalLink size={12} />
          View on site
        </a>
      </div>
    </form>
  )
}
