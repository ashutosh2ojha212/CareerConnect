import { useState, useEffect, useRef } from 'react'
import api from '../lib/api'

interface ResumePreviewModalProps {
  open: boolean
  onClose: () => void
  applicationId: string
  fieldId: string
  title?: string
}

export default function ResumePreviewModal({
  open,
  onClose,
  applicationId,
  fieldId,
  title = 'Resume Preview',
}: ResumePreviewModalProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const blobUrlRef = useRef<string | null>(null)

  useEffect(() => {
    if (!open || !applicationId || !fieldId) {
      setBlobUrl(null)
      setError(null)
      return
    }

    const fetchFile = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.get(`/applications/${applicationId}/files/${fieldId}`, {
          responseType: 'blob',
        })
        const blob = response.data as Blob
        if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
          setError('This file cannot be previewed. Please download to view.')
          return
        }
        const objectUrl = URL.createObjectURL(blob)
        blobUrlRef.current = objectUrl
        setBlobUrl(objectUrl)
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError('File not available.')
        } else {
          setError(err.response?.data?.message || 'Failed to load preview.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchFile()

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
        blobUrlRef.current = null
      }
      setBlobUrl(null)
    }
  }, [open, applicationId, fieldId])

  const handleClose = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }
    setBlobUrl(null)
    setError(null)
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-preview-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#faf9f7] to-white">
          <h2 id="resume-preview-title" className="text-lg font-bold text-gray-900 truncate pr-4">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Close preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col bg-gray-100">
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#4A4CF0] border-t-transparent mb-4" />
              <p className="text-gray-600 font-medium">Loading resume...</p>
            </div>
          )}
          {error && (
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-gray-700 text-center font-medium mb-2">{error}</p>
              <button
                onClick={handleClose}
                className="mt-4 px-5 py-2.5 bg-[#4A4CF0] text-white rounded-xl font-semibold hover:bg-[#6366F1] transition-colors"
              >
                Close
              </button>
            </div>
          )}
          {blobUrl && !loading && (
            <iframe
              src={blobUrl}
              title={title}
              className="w-full flex-1 min-h-[70vh] border-0"
            />
          )}
        </div>
      </div>
    </div>
  )
}
