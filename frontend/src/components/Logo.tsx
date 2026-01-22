export default function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-sm opacity-50"></div>
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-2.5 shadow-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 6L8 9V15L12 18L16 15V9L12 6Z"
              fill="currentColor"
            />
            <path
              d="M12 8.5L9.5 10.5V13.5L12 15.5L14.5 13.5V10.5L12 8.5Z"
              fill="white"
              fillOpacity="0.3"
            />
            <circle cx="12" cy="12" r="1.5" fill="white" />
          </svg>
        </div>
      </div>
      {showText && (
        <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Carrier Connect
        </span>
      )}
    </div>
  )
}

