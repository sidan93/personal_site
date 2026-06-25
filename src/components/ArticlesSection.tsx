import { articles } from '@/data/articles'

export default function ArticlesSection() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-elevated">
      <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
        Articles
      </h2>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.url}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <div>
                <span className="font-heading text-sm font-medium transition-colors text-[var(--text)] group-hover:text-[var(--accent)]">
                  {article.title}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-code text-xs" style={{ color: 'var(--text-muted)' }}>{article.source}</span>
                  <span style={{ color: 'var(--border)' }}>·</span>
                  <span className="font-code text-xs" style={{ color: 'var(--text-muted)' }}>{article.date}</span>
                </div>
              </div>
              <span className="ml-4 transition-colors" style={{ color: 'var(--text-muted)' }}>→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
