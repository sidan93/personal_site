import type { Metadata } from 'next'
import { Inter, Onest, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CookieBanner from '../components/CookieBanner'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const onest = Onest({ subsets: ['latin', 'cyrillic'], variable: '--font-onest', weight: ['400', '500', '600', '700'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', weight: ['400', '500'] })

export const metadata: Metadata = {
  title: 'Your Name — Developer',
  description: 'Personal portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var el = document.documentElement;
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) el.classList.add('dark');
                var valid = ['luxury','aurora','amber','terminal','mono'];
                var v = localStorage.getItem('designVariant');
                el.setAttribute('data-variant', valid.indexOf(v) !== -1 ? v : 'luxury');
                el.classList.add('cards-glass');
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${onest.variable} ${jetbrains.variable} font-[var(--font-inter)] bg-[var(--bg)] text-[var(--text)] min-h-screen transition-colors duration-300`}>
        {children}
        <CookieBanner />
        <footer className="text-center text-sm text-gray-400 py-6 mt-8">
          <a href="https://ai.absidorov.ru/Политика-конфиденциальности" className="hover:underline">
            Политика конфиденциальности
          </a>
        </footer>
      </body>
    </html>
  )
}
