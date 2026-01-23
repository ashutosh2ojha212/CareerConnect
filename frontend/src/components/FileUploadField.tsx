import { useRef, useState } from 'react'

interface FileUploadFieldProps {
  label: string
  required?: boolean
  accept?: string
  onFileSelect: (file: File | null) => void
  value?: File | null
}

export default function FileUploadField({
  label,
  required = false,
  accept = '.pdf',
  onFileSelect,
  value,
}: FileUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(value || null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onFileSelect(null)
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Dropbox-like UI */}
      <div
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-200 bg-gray-50/50"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200 w-full max-w-md">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600">Click to change file</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {accept === '.pdf' ? 'PDF files only' : 'Select a file'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
