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
}

const MarkdownEditor = ({
  value,
  onChange,
  className,
}: MarkdownEditorProps) => {
  const [previewMode, setPreviewMode] = useState(false)

  return (
    <div className="space-y-2">
      {!previewMode ? (
        <textarea
          className={clsx(
            'w-full h-40 text-lg px-4 py-2 border border-dark-500 bg-dark-500/20 rounded-lg minimal-scrollbar outline-none',
            className
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
        className="rounded-lg sm:px-4 sm:py-2 bg-dark-500"
        textClassName="font-medium sm:text-sm"
        noGradient
        onClick={() => setPreviewMode(!previewMode)}
      />
    </div>
  )
}

export default MarkdownEditor
