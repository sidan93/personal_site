export interface Article {
  title: string
  source: string
  url: string
  date: string
}

export const articles: Article[] = [
  {
    title: 'Заголовок статьи — сюда вставить реальный',
    source: 'Habr',
    url: 'https://habr.com/your-article',
    date: '2025-01',
  },
  {
    title: 'Заголовок второй статьи',
    source: 'Medium',
    url: 'https://medium.com/your-article',
    date: '2024-11',
  },
]
