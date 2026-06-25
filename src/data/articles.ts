export interface Article {
  title: string
  source: string
  url: string
  date: string
}

export const articles: Article[] = [
  {
    title: 'Article Title One',
    source: 'Habr',
    url: 'https://habr.com/your-article',
    date: '2025-01',
  },
  {
    title: 'Article Title Two',
    source: 'Medium',
    url: 'https://medium.com/your-article',
    date: '2024-11',
  },
]
