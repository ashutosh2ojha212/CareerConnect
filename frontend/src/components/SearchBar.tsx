import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'

interface SearchBarProps {
  mode: 'candidate' | 'jobpost' | 'hidden'
  placeholder: string
  onSearch: (query: string) => void
  debounce?: number
  initialValue?: string
}

export default function SearchBar({
  mode,
  placeholder,
  onSearch,
  debounce = 300,
  initialValue = '',
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue)
  const debouncedSearch = useDebounce(searchQuery, debounce)

  // Call onSearch when debounced value changes
  useEffect(() => {
    onSearch(debouncedSearch)
  }, [debouncedSearch, onSearch])

  // Sync with initialValue when it changes externally (e.g., when tab switches)
  useEffect(() => {
    if (initialValue !== searchQuery) {
      setSearchQuery(initialValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  if (mode === 'hidden') {
    return null
  }

  return (
    <div className="flex-1 max-w-2xl mx-8">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 px-4 pl-10 pr-4 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-sm"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
}
