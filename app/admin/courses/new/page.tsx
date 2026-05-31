'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewCoursePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    trainingType: 'cbt',
    estimatedTime: '',
    status: 'draft',
  })

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
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error) }
      const course = await res.json()
      router.push(`/admin/courses/${course.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create course')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-6">
        <ChevronLeft size={14} /> All courses
      </Link>
      <h1 className="font-heading text-2xl uppercase text-[#2B2B2B] mb-8">New Course</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <Field label="Title" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputCls}
            placeholder="e.g. Pre-CBT Training"
            required
          />
        </Field>

        <Field label="Slug (URL)" required hint="Used in the URL — lowercase, hyphens only">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className={inputCls}
            placeholder="e.g. pre-cbt"
            pattern="[a-z0-9-]+"
            required
          />
        </Field>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className={`${inputCls} resize-none h-20`}
            placeholder="Short description shown on the course card"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Estimated Time">
            <input
              type="text"
              value={form.estimatedTime}
              onChange={(e) => setForm((f) => ({ ...f, estimatedTime: e.target.value }))}
              className={inputCls}
              placeholder="e.g. ~75 min"
            />
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className={inputCls}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
        </div>

        {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#2CCEAC] hover:bg-[#25b899] disabled:opacity-50 text-white font-heading text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors"
          >
            {saving ? 'Creating…' : 'Create Course'}
          </button>
          <Link href="/admin" className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

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
