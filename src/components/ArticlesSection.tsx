import { articles } from '@/data/articles'

export default function ArticlesSection() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
        Articles
      </h2>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.url}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{article.source}</span>
                  <span className="text-xs text-gray-300 dark:text-gray-600">·</span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
