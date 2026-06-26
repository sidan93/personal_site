export interface Experience {
  company: string
  url: string
  role: string
  period: string
  duration: string
  description: string
  stack?: string[]
}

export const experience: Experience[] = [
  {
    company: 'VK',
    url: 'https://vk.company',
    role: 'CTO / Lead Architect / Team Leader',
    period: 'Апрель 2020 — настоящее время',
    duration: '6 лет',
    description:
      'Создал и развиваю People Hub — внутреннюю HR-платформу VK. Собрал команду с нуля до 35+ специалистов (backend, frontend, QA, DevOps). Отвечаю за архитектуру, roadmap, найм и инженерную культуру. Внедрил CI/CD и мониторинг — количество инцидентов снизилось, скорость релизов выросла на 30%.',
    stack: ['Python', 'PostgreSQL', 'TypeScript', 'React', 'CI/CD'],
  },
  {
    company: 'Тензор',
    url: 'https://tensor.ru',
    role: 'Руководитель команды разработки',
    period: 'Январь 2018 — Апрель 2020',
    duration: '2 года 4 месяца',
    description:
      'Проектировал и запускал сервис транспорта маркированных товаров для ЭДО с государством. Развил команду с 2 до 6 человек. Реализовал мониторинг, администрирование и интеграцию с ЕГАИС/УТМ.',
    stack: ['Python', 'PostgreSQL', 'JavaScript', 'C#', 'C++', 'Zabbix'],
  },
  {
    company: 'Тензор',
    url: 'https://tensor.ru',
    role: 'Инженер-программист',
    period: 'Август 2013 — Январь 2018',
    duration: '4 года 6 месяцев',
    description:
      'Fullstack-разработка. Реализовал сервис транспорта документов ЕГАИС, бизнес-логику для прайс-листов и дисконтных карт, синхронизацию данных в офлайн-приложение.',
    stack: ['Python', 'PostgreSQL', 'JavaScript', 'C#', 'C++'],
  },
]
