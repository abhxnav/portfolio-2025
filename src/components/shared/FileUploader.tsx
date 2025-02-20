'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from 'react-icons/io5'

interface FileUploaderProps {
  file: File | string | null
  onChange: (file: File) => void
}

const FileUploader = ({ file, onChange }: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (file && typeof file !== 'string') {
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreview(null)
    }
  }, [file])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        onChange(file) // Directly pass the File object to the parent
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className="file-upload flex flex-col gap-2 items-center justify-center p-4 rounded-lg border-2 border-dark-500 border-dashed bg-dark-500/20 cursor-pointer"
    >
      <input {...getInputProps()} />
      {preview ? (
        <Image
          src={preview}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-40 overflow-hidden object-contain"
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <IoCloudUploadOutline className="h-8 w-8 text-white" />
          <p className="text-sm text-white">
            <span className="underline font-semibold">Click to upload</span> or
            drag and drop
          </p>
        </div>
      )}
    </div>
  )
}

export default FileUploader
