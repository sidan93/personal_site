export default function ResumeSection() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
          Resume
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Updated 2025
        </p>
      </div>
      <a
        href="/resume.pdf"
        download
        className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity"
      >
        Download PDF
      </a>
    </div>
  )
}
