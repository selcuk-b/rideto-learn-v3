'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  ChevronUp, ChevronDown, Trash2, Plus, CheckCircle2,
  ChevronRight, Image as ImageIcon, Loader2, Upload,
} from 'lucide-react'

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CCEAC]/30 focus:border-[#2CCEAC] transition-colors'

interface Question {
  id: string
  questionText: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
  image: string | null
  order: number
}

interface Quiz {
  id: string
  title: string
  description: string
  passingScore: number
  questions: Question[]
}

interface Props {
  courseId: string
  quiz: Quiz | null
}

// ─── Quiz Metadata Form ───────────────────────────────────────────────────────

function QuizMetaForm({ courseId, quiz, onCreated }: { courseId: string; quiz: Quiz | null; onCreated: (q: Quiz) => void }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: quiz?.title ?? '',
    description: quiz?.description ?? '',
    passingScore: quiz?.passingScore ?? 70,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setSaved(false); setError('')
    try {
      const method = quiz ? 'PATCH' : 'POST'
      const res = await fetch(`/api/admin/courses/${courseId}/quiz`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      if (!quiz) onCreated({ ...data, questions: [] })
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Quiz Title</label>
          <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="e.g. Pre-CBT Quiz" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Pass Mark (%)</label>
          <input type="number" min={1} max={100} value={form.passingScore} onChange={e => setForm(f => ({ ...f, passingScore: Number(e.target.value) }))} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
        <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inputCls} placeholder="Short description of this quiz" />
      </div>
      {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
      <button type="submit" disabled={saving} className="bg-[#2CCEAC] hover:bg-[#25b899] disabled:opacity-50 text-white font-heading text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors">
        {saving ? 'Saving…' : saved ? '✓ Saved' : quiz ? 'Save Changes' : 'Create Quiz'}
      </button>
    </form>
  )
}

// ─── Question Row (collapsed) ─────────────────────────────────────────────────

function QuestionRow({
  question, index, total, courseId,
  onMove, onDelete, onUpdate,
}: {
  question: Question; index: number; total: number; courseId: string
  onMove: (i: number, dir: 'up' | 'down') => void
  onDelete: (id: string) => void
  onUpdate: (q: Question) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ ...question, image: question.image ?? '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = await res.json()
      setForm(f => ({ ...f, image: url }))
    } catch {
      alert('Image upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/quiz/questions/${question.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image: form.image || null }),
      })
      if (!res.ok) throw new Error()
      const updated = await res.json()
      onUpdate({ ...updated, image: updated.image ?? null })
      setExpanded(false)
    } catch {
      alert('Failed to save question')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this question? Cannot be undone.')) return
    setDeleting(true)
    await fetch(`/api/admin/courses/${courseId}/quiz/questions/${question.id}`, { method: 'DELETE' })
    onDelete(question.id)
  }

  return (
    <div className={`bg-white border rounded-xl transition-all ${expanded ? 'border-[#2CCEAC]/40 shadow-sm' : 'border-gray-200'}`}>
      {/* Collapsed header */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Reorder */}
        <div className="flex flex-col gap-0.5 flex-shrink-0">
          <button onClick={() => onMove(index, 'up')} disabled={index === 0} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 cursor-pointer"><ChevronUp size={13} /></button>
          <button onClick={() => onMove(index, 'down')} disabled={index === total - 1} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 cursor-pointer"><ChevronDown size={13} /></button>
        </div>

        {/* Number */}
        <span className="text-xs font-bold text-gray-300 w-5 text-center flex-shrink-0">{index + 1}</span>

        {/* Question preview */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <p className="text-sm font-medium text-gray-800 truncate">{question.questionText || <span className="italic text-gray-400">Empty question</span>}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {question.options.length} options · Correct: {String.fromCharCode(65 + question.correctAnswerIndex)}
            {question.image && <span className="ml-2 inline-flex items-center gap-0.5"><ImageIcon size={10} /> image</span>}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={handleDelete} disabled={deleting} className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-30"><Trash2 size={13} /></button>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-300 hover:text-[#2CCEAC] transition-colors cursor-pointer">
            <ChevronRight size={16} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded editor */}
      {expanded && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          {/* Question text */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Question</label>
            <textarea value={form.questionText} onChange={e => setForm(f => ({ ...f, questionText: e.target.value }))} className={`${inputCls} resize-none h-20`} placeholder="Type the question..." />
          </div>

          {/* Options */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Answer Options <span className="text-gray-400 font-normal normal-case tracking-normal">— click the circle to mark correct</span></label>
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, correctAnswerIndex: i }))}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      form.correctAnswerIndex === i
                        ? 'border-[#2CCEAC] bg-[#2CCEAC]'
                        : 'border-gray-300 hover:border-[#2CCEAC]'
                    }`}
                  >
                    {form.correctAnswerIndex === i && <CheckCircle2 size={12} className="text-white" />}
                  </button>
                  <span className="text-xs font-bold text-gray-400 w-4">{String.fromCharCode(65 + i)}</span>
                  <input
                    type="text"
                    value={opt}
                    onChange={e => {
                      const opts = [...form.options]
                      opts[i] = e.target.value
                      setForm(f => ({ ...f, options: opts }))
                    }}
                    className={inputCls}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Explanation <span className="text-gray-400 font-normal normal-case tracking-normal">— shown after answering</span></label>
            <textarea value={form.explanation} onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} className={`${inputCls} resize-none h-16`} placeholder="Why is this the correct answer?" />
          </div>

          {/* Image */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Image <span className="text-gray-400 font-normal normal-case tracking-normal">— optional</span>
            </label>

            {/* Upload button + current image */}
            <div className="flex items-start gap-3">
              {form.image ? (
                <div className="relative flex-shrink-0">
                  <img
                    src={form.image}
                    alt="preview"
                    className="h-24 w-24 object-contain rounded-lg border border-gray-200 bg-gray-50 p-1"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, image: '' }))}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="h-24 w-24 flex-shrink-0 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                  <ImageIcon size={24} />
                </div>
              )}

              <div className="flex-1 space-y-2">
                {/* Upload from computer */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#2CCEAC] text-gray-600 hover:text-[#2CCEAC] text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 w-full justify-center"
                >
                  {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                  {uploading ? 'Uploading…' : 'Upload from computer'}
                </button>

                {/* Or paste URL */}
                <input
                  type="text"
                  value={form.image}
                  onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                  className={inputCls}
                  placeholder="Or paste an image URL…"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={handleSave} disabled={saving} className="bg-[#2CCEAC] hover:bg-[#25b899] disabled:opacity-50 text-white font-heading text-xs uppercase tracking-widest px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
              {saving && <Loader2 size={12} className="animate-spin" />}
              {saving ? 'Saving…' : 'Save Question'}
            </button>
            <button type="button" onClick={() => { setForm({ ...question, image: question.image ?? '' }); setExpanded(false) }} className="px-4 py-2 text-xs text-gray-500 hover:text-gray-700">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Quiz Editor ─────────────────────────────────────────────────────────

export default function QuizEditor({ courseId, quiz: initialQuiz }: Props) {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(initialQuiz)
  const [questions, setQuestions] = useState<Question[]>(initialQuiz?.questions ?? [])
  const [addingQuestion, setAddingQuestion] = useState(false)
  const [deletingQuiz, setDeletingQuiz] = useState(false)

  async function handleAddQuestion() {
    if (!quiz) return
    setAddingQuestion(true)
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/quiz/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0, explanation: '' }),
      })
      const q = await res.json()
      setQuestions(qs => [...qs, q])
    } finally {
      setAddingQuestion(false)
    }
  }

  async function handleMove(index: number, dir: 'up' | 'down') {
    const newList = [...questions]
    const swap = dir === 'up' ? index - 1 : index + 1
    ;[newList[index], newList[swap]] = [newList[swap], newList[index]]
    setQuestions(newList)
    await fetch(`/api/admin/courses/${courseId}/quiz/questions/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds: newList.map(q => q.id) }),
    })
  }

  async function handleDeleteQuiz() {
    if (!confirm(`Delete this entire quiz and all ${questions.length} questions? Cannot be undone.`)) return
    setDeletingQuiz(true)
    await fetch(`/api/admin/courses/${courseId}/quiz`, { method: 'DELETE' })
    router.push(`/admin/courses/${courseId}`)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {/* Quiz metadata */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-5">Quiz Details</h2>
        <QuizMetaForm courseId={courseId} quiz={quiz} onCreated={(q) => setQuiz(q)} />
      </section>

      {/* Questions */}
      {quiz && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xs uppercase tracking-widest text-gray-400">
              Questions ({questions.length})
            </h2>
            <button
              onClick={handleAddQuestion}
              disabled={addingQuestion}
              className="inline-flex items-center gap-1.5 bg-[#2B2B2B] hover:bg-[#434343] disabled:opacity-50 text-white font-heading text-xs uppercase tracking-widest px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              {addingQuestion ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
              Add Question
            </button>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-gray-200 rounded-xl text-gray-400">
              <p className="text-sm">No questions yet. Add your first one above.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {questions.map((q, i) => (
                <QuestionRow
                  key={q.id}
                  question={q}
                  index={i}
                  total={questions.length}
                  courseId={courseId}
                  onMove={handleMove}
                  onDelete={(id) => setQuestions(qs => qs.filter(q => q.id !== id))}
                  onUpdate={(updated) => setQuestions(qs => qs.map(q => q.id === updated.id ? updated : q))}
                />
              ))}
            </div>
          )}

          {/* Danger zone */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Danger Zone</p>
            <button
              onClick={handleDeleteQuiz}
              disabled={deletingQuiz}
              className="inline-flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 size={13} />
              {deletingQuiz ? 'Deleting…' : 'Delete this quiz'}
            </button>
            <p className="text-xs text-gray-400 mt-2">Removes the quiz and all {questions.length} questions permanently.</p>
          </div>
        </section>
      )}
    </div>
  )
}
