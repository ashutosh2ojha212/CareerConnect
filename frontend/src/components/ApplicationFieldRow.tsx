import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import ResumePreviewModal from './ResumePreviewModal'

interface ApplicationFieldRowProps {
  label: string
  value: string | null | undefined
  type: 'text' | 'file' | 'email' | 'tel' | 'number' | 'textarea'
  fileUrl?: string
  applicationId?: string
  fieldId?: string
  /** Original filename when uploaded (e.g. from formData.resumeOriginalFilename) — used for download name */
  fileOriginalName?: string | null
}

export default function ApplicationFieldRow({
  label,
  value,
  type,
  fileUrl,
  applicationId,
  fieldId,
  fileOriginalName,
}: ApplicationFieldRowProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
      toast.error('Clipboard not accessible')
    }
  }

  const handleDownload = async () => {
    if (!fileUrl && !applicationId) {
      toast.error('File not available')
      return
    }

    setIsDownloading(true)
    try {
      let downloadUrl = fileUrl

      // If we have applicationId and fieldId, use the secure download endpoint
      if (applicationId && fieldId) {
        try {
          const response = await api.get(`/applications/${applicationId}/files/${fieldId}`, {
            responseType: 'blob',
          })

          if (response.data.type !== 'application/pdf' && !response.data.type.includes('pdf')) {
            toast.error('Invalid file format')
            return
          }

          // Prefer prop from API (formData.resumeOriginalFilename), then Content-Disposition header
          let downloadFilename = `${label.replace(/\s+/g, '_')}.pdf`
          if (fileOriginalName && typeof fileOriginalName === 'string') {
            const name = fileOriginalName.trim()
            downloadFilename = name.toLowerCase().endsWith('.pdf') ? name : name + '.pdf'
          } else {
            const contentDisposition = response.headers?.['content-disposition']
            if (contentDisposition) {
              const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?"?([^";\n]+)"?/i)
              if (match?.[1]) {
                downloadFilename = decodeURIComponent(match[1].trim().replace(/^"|"$/g, ''))
                if (!downloadFilename.toLowerCase().endsWith('.pdf')) downloadFilename += '.pdf'
              }
            }
          }

          const url = window.URL.createObjectURL(response.data)
          const link = document.createElement('a')
          link.href = url
          link.download = downloadFilename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)

          toast.success('Download started')
          return
        } catch (error: any) {
          if (error.response?.status === 404) {
            toast.error('File not available')
          } else {
            throw error
          }
          return
        }
      }

      // Fallback to direct file URL
      if (!downloadUrl) {
        toast.error('File not available')
        return
      }

      // Handle relative URLs (uploads)
      if (downloadUrl.startsWith('/uploads/')) {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001'
        downloadUrl = `${baseUrl}${downloadUrl}`
      }

      // Direct URL: use label-based name (original filename only available via secure endpoint)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${label.replace(/\s+/g, '_')}.pdf`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success('Download started')
    } catch (error: any) {
      console.error('Download error:', error)
      toast.error(error.message || 'Failed to download file')
    } finally {
      setIsDownloading(false)
    }
  }

  // Handle empty or missing values
  if (value === undefined || value === null || value === '') {
    if (type === 'file') {
      return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">{label}</p>
            <p className="text-sm text-gray-400 italic">Not provided</p>
          </div>
          <button
            disabled
            className="ml-4 p-2.5 text-gray-300 cursor-not-allowed rounded-xl"
            title="No file available"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      )
    }
    return null // Hide empty text fields
  }

  const displayValue = String(value)

  return (
    <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">{label}</p>
        {type === 'file' ? (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">PDF Document</span>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl px-5 py-3.5 border border-gray-200">
            <p className="text-sm text-gray-900 break-words whitespace-pre-wrap font-medium">
              {displayValue}
            </p>
          </div>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center gap-1">
        {type === 'file' ? (
          <>
            {applicationId && fieldId && (
              <>
                <button
                  onClick={() => setShowPreview(true)}
                  className="ml-4 p-2.5 text-[#4A4CF0] hover:text-[#6366F1] hover:bg-[#4A4CF0]/10 rounded-xl transition-all duration-200"
                  title="Preview"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <ResumePreviewModal
                  open={showPreview}
                  onClose={() => setShowPreview(false)}
                  applicationId={applicationId}
                  fieldId={fieldId}
                  title={label}
                />
              </>
            )}
            <button
              onClick={handleDownload}
              disabled={isDownloading || (!fileUrl && !applicationId)}
              className="p-2.5 text-[#4A4CF0] hover:text-[#6366F1] hover:bg-[#4A4CF0]/10 rounded-xl transition-all duration-200 disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              title="Download file"
            >
              {isDownloading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#4A4CF0]"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </button>
          </>
        ) : (
          <button
            onClick={() => copyToClipboard(displayValue)}
            className="ml-4 p-2.5 text-gray-600 hover:text-[#4A4CF0] hover:bg-[#4A4CF0]/10 rounded-xl transition-all duration-200"
            title="Copy to clipboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
