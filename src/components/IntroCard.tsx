import ThemeToggle from './ThemeToggle'

export default function IntroCard() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">HI, WELCOME!</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Name</h1>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Role tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['Backend Developer', 'Python', 'TypeScript'].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Social links */}
      <div className="flex gap-3">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-80 transition-opacity"
        >
          GitHub
        </a>
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Telegram
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  )
}
