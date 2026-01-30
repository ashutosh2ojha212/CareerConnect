import { Link } from 'react-router-dom'

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Access denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          to="/signin"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}
