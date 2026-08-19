"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FileText, UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function CvDropzone({
  onFileSelected,
}: {
  onFileSelected: (file: File | null) => void
}) {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (accepted: File[]) => {
      const f = accepted[0] ?? null
      setFile(f)
      onFileSelected(f)
    },
    [onFileSelected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
  })

  if (file) {
    return (
      <div className="flex items-center justify-between rounded-md border border-border bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{file.name}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(0)} KB
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setFile(null)
            onFileSelected(null)
          }}
          className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Quitar archivo"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border px-6 py-10 text-center transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "hover:border-primary/60"
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm">
        Arrastra tu CV aquí o{" "}
        <span className="font-medium text-primary underline underline-offset-4">
          selecciona un archivo
        </span>
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        PDF, DOCX o TXT · máx. 5MB
      </p>
    </div>
  )
}
