import type { Metadata } from 'next'
import { Inter, Onest, JetBrains_Mono } from 'next/font/google'
import './globals.css'

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
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Yandex Metrica */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              var metricaId = 110162866;
              if (metricaId) {
                ym(metricaId, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true
                });
              }
            `,
          }}
        />
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://mc.yandex.ru/watch/110162866" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </head>
      <body className={`${inter.variable} ${onest.variable} ${jetbrains.variable} font-[var(--font-inter)] bg-[var(--bg)] text-[var(--text)] min-h-screen transition-colors duration-300`}>
        {children}
        <footer className="text-center text-sm text-gray-400 py-6 mt-8">
          <a href="https://ai.absidorov.ru/Политика-конфиденциальности" className="hover:underline">
            Политика конфиденциальности
          </a>
        </footer>
      </body>
    </html>
  )
}
