export interface Project {
  title: string
  description: string
  stack: string[]
  url: string
  details: string
}

export const projects: Project[] = [
  {
    title: 'Проект один',
    description: 'Короткое описание проекта — что делает и зачем.',
    stack: ['TypeScript', 'React', 'Node.js'],
    url: 'https://github.com/sidan93/project-one',
    details: 'Подробное описание на обороте карточки. Какую задачу решает, что было интересно в реализации.',
  },
  {
    title: 'Проект два',
    description: 'Короткое описание проекта — что делает и зачем.',
    stack: ['Python', 'FastAPI', 'PostgreSQL'],
    url: 'https://github.com/sidan93/project-two',
    details: 'Подробное описание на обороте карточки.',
  },
]
