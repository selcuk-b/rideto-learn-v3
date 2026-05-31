'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { useRef, useCallback, useState } from 'react'
import {
  Bold, Italic, UnderlineIcon, Heading2, Heading3,
  List, ListOrdered, ImageIcon, Undo2, Redo2, Loader2,
  AlignLeft, AlignCenter, AlignRight, Link2, Minus,
  Palette,
} from 'lucide-react'

interface Props {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

/** Convert old **bold** markdown to HTML for backward compatibility */
function markdownToHtml(text: string): string {
  if (!text || text.trim().startsWith('<')) return text
  return text
    .split('\n\n')
    .map(para => {
      const html = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      return `<p>${html}</p>`
    })
    .join('')
}

// ─── Preset text colours ──────────────────────────────────────────────────────
const COLOURS = [
  { label: 'Default',    value: '',        bg: 'bg-gray-800' },
  { label: 'Gray',       value: '#6B7280',  bg: 'bg-gray-500' },
  { label: 'RideTo Green', value: '#2CCEAC', bg: 'bg-[#2CCEAC]' },
  { label: 'Blue',       value: '#2C4FD3',  bg: 'bg-blue-600' },
  { label: 'Red',        value: '#EF4444',  bg: 'bg-red-500' },
  { label: 'Orange',     value: '#F97316',  bg: 'bg-orange-500' },
  { label: 'Purple',     value: '#8B5CF6',  bg: 'bg-violet-500' },
]

// ─── Toolbar button ───────────────────────────────────────────────────────────
function Btn({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-30 ${
        active ? 'bg-[#2CCEAC] text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  )
}

const Sep = () => <div className="w-px h-4 bg-gray-200 mx-1 flex-shrink-0" />

// ─── Link popover ─────────────────────────────────────────────────────────────
function LinkPopover({ onSet, onUnset, currentUrl }: {
  onSet: (url: string) => void; onUnset: () => void; currentUrl: string
}) {
  const [url, setUrl] = useState(currentUrl)
  return (
    <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-3 w-72" onClick={e => e.stopPropagation()}>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Insert Link</p>
      <input
        type="url"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://rideto.com/store"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CCEAC]/30 focus:border-[#2CCEAC] mb-2"
        autoFocus
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onSet(url) } }}
      />
      <div className="flex gap-2">
        <button type="button" onClick={() => onSet(url)}
          className="flex-1 bg-[#2CCEAC] hover:bg-[#25b899] text-white text-xs font-semibold py-1.5 rounded-lg transition-colors">
          Apply
        </button>
        {currentUrl && (
          <button type="button" onClick={onUnset}
            className="px-3 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold py-1.5 rounded-lg transition-colors">
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Color palette ────────────────────────────────────────────────────────────
function ColourPalette({ onSelect, currentColour }: {
  onSelect: (colour: string) => void; currentColour: string
}) {
  return (
    <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-3" onClick={e => e.stopPropagation()}>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Text Colour</p>
      <div className="flex gap-2 flex-wrap">
        {COLOURS.map(c => (
          <button
            key={c.value}
            type="button"
            title={c.label}
            onClick={() => onSelect(c.value)}
            className={`w-6 h-6 rounded-full ${c.bg} transition-transform hover:scale-110 cursor-pointer ${
              currentColour === c.value ? 'ring-2 ring-offset-1 ring-gray-400' : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RichTextEditor({ content, onChange, placeholder }: Props) {
  const [uploading, setUploading] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const [showColour, setShowColour] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      TextStyle,
      Color,
      Image.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-[#2C4FD3] underline cursor-pointer' } }),
      Placeholder.configure({ placeholder: placeholder ?? 'Write lesson content here…' }),
    ],
    content: markdownToHtml(content),
    onUpdate({ editor }) { onChange(editor.getHTML()) },
    editorProps: {
      attributes: { class: 'prose prose-sm max-w-none min-h-[280px] px-4 py-3 focus:outline-none' },
    },
  })

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      const { url } = await res.json()
      editor.chain().focus().setImage({ src: url }).run()
    } catch {
      alert('Image upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }, [editor])

  if (!editor) return null

  const currentUrl = editor.getAttributes('link').href ?? ''
  const currentColour = editor.getAttributes('textStyle').color ?? ''

  function handleSetLink(url: string) {
    if (!url) { editor.chain().focus().unsetLink().run(); setShowLink(false); return }
    const href = url.startsWith('http') ? url : `https://${url}`
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setShowLink(false)
  }

  return (
    <div
      className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2CCEAC]/30 focus-within:border-[#2CCEAC] transition-colors"
      onClick={() => { setShowLink(false); setShowColour(false) }}
    >
      {/* ── Toolbar ── */}
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50 flex-wrap">

        {/* Bold / Italic / Underline */}
        <Btn title="Bold"      onClick={() => editor.chain().focus().toggleBold().run()}      active={editor.isActive('bold')}>      <Bold size={15} /></Btn>
        <Btn title="Italic"    onClick={() => editor.chain().focus().toggleItalic().run()}    active={editor.isActive('italic')}>    <Italic size={15} /></Btn>
        <Btn title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}> <UnderlineIcon size={15} /></Btn>

        <Sep />

        {/* Headings */}
        <Btn title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}><Heading2 size={15} /></Btn>
        <Btn title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}><Heading3 size={15} /></Btn>

        <Sep />

        {/* Lists */}
        <Btn title="Bullet list"   onClick={() => editor.chain().focus().toggleBulletList().run()}  active={editor.isActive('bulletList')}>  <List size={15} /></Btn>
        <Btn title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}> <ListOrdered size={15} /></Btn>

        <Sep />

        {/* Alignment */}
        <Btn title="Align left"   onClick={() => editor.chain().focus().setTextAlign('left').run()}   active={editor.isActive({ textAlign: 'left' })}>   <AlignLeft size={15} /></Btn>
        <Btn title="Align center" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}> <AlignCenter size={15} /></Btn>
        <Btn title="Align right"  onClick={() => editor.chain().focus().setTextAlign('right').run()}  active={editor.isActive({ textAlign: 'right' })}>  <AlignRight size={15} /></Btn>

        <Sep />

        {/* Link */}
        <div className="relative">
          <Btn
            title="Insert link"
            onClick={() => { setShowColour(false); setShowLink(v => !v) }}
            active={editor.isActive('link') || showLink}
          >
            <Link2 size={15} />
          </Btn>
          {showLink && (
            <LinkPopover
              currentUrl={currentUrl}
              onSet={handleSetLink}
              onUnset={() => { editor.chain().focus().unsetLink().run(); setShowLink(false) }}
            />
          )}
        </div>

        {/* Text colour */}
        <div className="relative">
          <button
            type="button"
            title="Text colour"
            onClick={(e) => { e.stopPropagation(); setShowLink(false); setShowColour(v => !v) }}
            className="p-1.5 rounded transition-colors cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-800 relative"
          >
            <Palette size={15} />
            {currentColour && (
              <span
                className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full border border-white"
                style={{ background: currentColour }}
              />
            )}
          </button>
          {showColour && (
            <ColourPalette
              currentColour={currentColour}
              onSelect={(c) => {
                if (c === '') editor.chain().focus().unsetColor().run()
                else editor.chain().focus().setColor(c).run()
                setShowColour(false)
              }}
            />
          )}
        </div>

        {/* Separator line */}
        <Btn title="Insert separator line" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={15} />
        </Btn>

        <Sep />

        {/* Image upload */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <Btn title="Insert image" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
        </Btn>

        <div className="flex-1" />

        {/* Undo / Redo */}
        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><Undo2 size={15} /></Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><Redo2 size={15} /></Btn>
      </div>

      {/* ── Editor area ── */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
