'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { useRef, useCallback } from 'react'
import {
  Bold, Italic, UnderlineIcon, Heading2, Heading3,
  List, ListOrdered, ImageIcon, Undo2, Redo2, Loader2,
} from 'lucide-react'
import { useState } from 'react'

interface Props {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

/** Convert old **bold** markdown to HTML for backward compatibility */
function markdownToHtml(text: string): string {
  if (!text || text.trim().startsWith('<')) return text // already HTML
  return text
    .split('\n\n')
    .map(para => {
      const html = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      return `<p>${html}</p>`
    })
    .join('')
}

function ToolbarButton({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-30 ${
        active
          ? 'bg-[#2CCEAC] text-white'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ content, onChange, placeholder }: Props) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({
        placeholder: placeholder ?? 'Write lesson content here…',
      }),
    ],
    content: markdownToHtml(content),
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[280px] px-4 py-3 focus:outline-none',
      },
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

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2CCEAC]/30 focus-within:border-[#2CCEAC] transition-colors">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50 flex-wrap">

        {/* Text styles */}
        <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
          <UnderlineIcon size={15} />
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Headings */}
        <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          <Heading3 size={15} />
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Lists */}
        <ToolbarButton title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered size={15} />
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Image upload */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <ToolbarButton
          title="Insert image"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
        </ToolbarButton>

        <div className="flex-1" />

        {/* History */}
        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo2 size={15} />
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo2 size={15} />
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
