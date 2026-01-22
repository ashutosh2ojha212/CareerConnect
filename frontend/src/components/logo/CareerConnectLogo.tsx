export default function CareerConnectLogo({ className = '', size = 48 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Gradient background circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-sm opacity-60"></div>
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full p-3 shadow-lg">
          <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            {/* Briefcase body */}
            <rect
              x="12"
              y="18"
              width="24"
              height="18"
              rx="2"
              fill="white"
              fillOpacity="0.95"
            />
            {/* Briefcase handle */}
            <path
              d="M18 18V14C18 11.7909 19.7909 10 22 10H26C28.2091 10 30 11.7909 30 14V18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Briefcase lock/clasp */}
            <circle
              cx="24"
              cy="27"
              r="2"
              fill="currentColor"
            />
            {/* Connection lines (representing networking) */}
            <path
              d="M8 24L12 24M36 24L40 24M24 8L24 12M24 36L24 40"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

