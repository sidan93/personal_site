export default function AboutCard() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
        About Me
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Placeholder bio text. Describe yourself, what you do, what you&apos;re interested in.
        Keep it short &mdash; 2-3 sentences is enough.
      </p>
      <ul className="space-y-2">
        {[
          'What you build or work on',
          'Your main tech stack or specialization',
          'Something personal or interesting',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="text-green-500 mt-0.5">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
