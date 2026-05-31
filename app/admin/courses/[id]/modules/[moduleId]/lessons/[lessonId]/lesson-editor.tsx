'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ExternalLink } from 'lucide-react'

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

/** Render **bold** markdown for the preview */
function renderContent(text: string) {
  return text.split('\n\n').map((para, i) => (
    <p key={i} className="text-sm text-gray-700 mb-3 last:mb-0 leading-relaxed">
      {para.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={j} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
          : part
      )}
    </p>
  ))
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
  const [showPreview, setShowPreview] = useState(false)
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
      {/* Metadata row */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-2">Lesson Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title">
            <input type="text" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} required />
          </Field>
          <Field label="Slug" hint="⚠️ Changing breaks the URL and learner progress">
            <input type="text" value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))} className={inputCls} pattern="[a-z0-9-]+" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Read Time">
            <input type="text" value={form.estimatedReadTime} onChange={(e) => setForm(f => ({ ...f, estimatedReadTime: e.target.value }))} className={inputCls} placeholder="5 min" />
          </Field>
          <Field label="YouTube Video ID" hint="Just the ID, e.g. dQw4w9WgXcQ — leave blank for none">
            <input type="text" value={form.youtubeVideoId} onChange={(e) => setForm(f => ({ ...f, youtubeVideoId: e.target.value }))} className={inputCls} placeholder="Optional" />
          </Field>
        </div>
      </div>

      {/* Content editor */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400">Content</h2>
            <p className="text-xs text-gray-400 mt-0.5">Use **double asterisks** for <strong>bold</strong>. Separate paragraphs with a blank line.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#2CCEAC] transition-colors"
          >
            {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
            {showPreview ? 'Hide preview' : 'Show preview'}
          </button>
        </div>

        {showPreview ? (
          <div className="min-h-[300px] border border-gray-100 rounded-lg p-4 bg-gray-50">
            {form.content ? renderContent(form.content) : <p className="text-sm text-gray-400 italic">Nothing to preview yet.</p>}
          </div>
        ) : (
          <textarea
            value={form.content}
            onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
            className={`${inputCls} resize-y min-h-[300px] font-mono text-xs leading-relaxed`}
            placeholder="Write the lesson content here..."
          />
        )}
      </div>

      {/* Key Takeaway */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <Field label="Key Takeaway" hint="One sentence shown in the green box at the bottom of the lesson">
          <textarea
            value={form.keyTakeaway}
            onChange={(e) => setForm(f => ({ ...f, keyTakeaway: e.target.value }))}
            className={`${inputCls} resize-none h-20`}
            placeholder="The most important thing to remember from this lesson..."
          />
        </Field>
      </div>

      {/* Save bar */}
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
          href={`/courses/pre-cbt/modules/${moduleId.split('-')[0]}/lessons/${form.slug}`}
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
