'use client'

import { useRef, useState } from 'react'
import { CV_ACCEPT, validateCvFile } from '@/lib/applications/schema'
import { cx } from './cx'

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`

function UploadDocumentIcon({ attached = false }: { attached?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className="size-[36px]"
    >
      <path
        d="M10.5 4.5h12l7 7v24h-19z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M22.5 4.5v7h7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      {attached ? (
        <path
          d="m15 23 3.5 3.5L25.5 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <path d="M20 28V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="m15.75 21.25 4.25-4.5 4.25 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  )
}

/**
 * CV field — see CLAUDE.md "CV field". The whole solid drop zone opens the
 * native file picker, while also accepting a dropped PDF or Word file. The
 * file is checked here (size, extension, leading bytes) before the form sends
 * it, and again on the server.
 */
export function CvField({ error }: { error?: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ name: string; size: number } | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const clear = () => {
    if (inputRef.current) inputRef.current.value = ''
    setFile(null)
  }

  const accept = async (picked: File | undefined) => {
    setFileError(null)
    if (!picked) {
      clear()
      return
    }
    const head = new Uint8Array(await picked.slice(0, 8).arrayBuffer())
    const check = validateCvFile({ name: picked.name, size: picked.size }, head)
    if (!check.ok) {
      clear()
      setFileError(check.error)
      return
    }
    // A dropped file is not in the input yet; put it there so FormData sends it.
    if (inputRef.current && inputRef.current.files?.[0] !== picked) {
      const transfer = new DataTransfer()
      transfer.items.add(picked)
      inputRef.current.files = transfer.files
    }
    setFile({ name: picked.name, size: picked.size })
  }

  const shown = fileError ?? error

  return (
    <fieldset className="flex flex-col gap-tight">
      <legend className="mb-tight text-label font-medium uppercase text-muted">CV or resume</legend>
      <div
        onDragEnter={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={(event) => {
          const nextTarget = event.relatedTarget as Node | null
          if (!nextTarget || !event.currentTarget.contains(nextTarget)) setDragging(false)
        }}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          void accept(event.dataTransfer.files?.[0])
        }}
        className={cx(
          'rounded border transition-colors duration-ui ease-ui focus-within:border-accent',
          dragging ? 'border-accent bg-accent-wash' : 'border-line bg-surface hover:border-muted',
        )}
      >
        <input
          ref={inputRef}
          id="cvFile"
          name="cvFile"
          type="file"
          accept={CV_ACCEPT}
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          onChange={(event) => void accept(event.target.files?.[0])}
        />
        {file ? (
          <div className="flex min-h-[104px] items-center gap-tight px-[18px] py-tight">
            <div className="flex size-[52px] shrink-0 items-center justify-center rounded border border-line bg-sunken text-accent">
              <UploadDocumentIcon attached />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-s font-medium text-ink">{file.name}</p>
              <p className="text-caption tabular-nums text-muted">{formatSize(file.size)} · Ready to attach</p>
            </div>
            <button
              type="button"
              onClick={clear}
              className="min-h-[44px] shrink-0 px-1 text-s font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            id="cv-choose"
            type="button"
            aria-describedby={shown ? 'cv-error' : 'cv-help'}
            aria-invalid={shown ? true : undefined}
            onClick={() => inputRef.current?.click()}
            className="group flex min-h-[168px] w-full flex-col items-center justify-center gap-[6px] px-[18px] py-[20px] text-center focus-visible:outline-none"
          >
            <span className="mb-[4px] flex size-[52px] items-center justify-center rounded border border-line bg-sunken text-accent transition-transform duration-ui-slow ease-ui group-hover:-translate-y-[2px]">
              <UploadDocumentIcon />
            </span>
            <span className="text-base font-medium text-ink">
              {dragging ? 'Drop to attach your CV' : 'Drag & drop your CV here'}
            </span>
            <span className="text-s text-body">
              or <span className="font-medium text-accent underline underline-offset-4">choose a file</span>
            </span>
            <span id="cv-help" className="text-caption text-muted">PDF or Word · up to 10 MB</span>
          </button>
        )}
      </div>
      {shown && (
        <p id="cv-error" className="text-caption text-accent" role="alert">
          {shown}
        </p>
      )}
    </fieldset>
  )
}
