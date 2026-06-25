export interface Project {
  title: string
  description: string
  stack: string[]
  url: string
  details: string
}

export const projects: Project[] = [
  {
    title: 'Project One',
    description: 'Short description of the project.',
    stack: ['TypeScript', 'React', 'Node.js'],
    url: 'https://github.com/yourusername/project-one',
    details: 'Longer description shown on card flip. What problem it solves, what you learned.',
  },
  {
    title: 'Project Two',
    description: 'Short description of the project.',
    stack: ['Python', 'FastAPI', 'PostgreSQL'],
    url: 'https://github.com/yourusername/project-two',
    details: 'Longer description shown on card flip.',
  },
]
