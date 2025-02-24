'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components'
import clsx from 'clsx'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

const MarkdownEditor = ({
  value,
  onChange,
  className,
  placeholder,
}: MarkdownEditorProps) => {
  const [previewMode, setPreviewMode] = useState(false)

  return (
    <div className="space-y-2">
      {!previewMode ? (
        <textarea
          className={clsx(
            'w-full h-40 text-lg px-4 py-2 border border-dark-500 bg-dark-500/20 rounded-lg minimal-scrollbar outline-none md:placeholder:text-sm placeholder:text-base placeholder:text-muted-foreground',
            className
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <div
          className={clsx(
            'prose max-w-none px-4 py-2 border rounded-lg min-h-40 max-h-80 border-dark-500 bg-dark-500/20 text-lg overflow-auto minimal-scrollbar mb-2',
            className
          )}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      )}

      <Button
        text={previewMode ? 'Edit' : 'Preview'}
        className="rounded-lg !py-1.5 !px-8 bg-dark-500"
        textClassName="font-medium !text-sm"
        noGradient
        onClick={() => setPreviewMode(!previewMode)}
      />
    </div>
  )
}

export default MarkdownEditor
