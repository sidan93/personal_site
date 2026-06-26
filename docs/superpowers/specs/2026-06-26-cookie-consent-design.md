# Cookie Consent Banner — Design Spec
Date: 2026-06-26

## Problem

Яндекс Метрика (включая вебвизор) инициализируется безусловно в `layout.tsx` при каждом посещении сайта, без уведомления пользователя и получения его согласия. Это нарушает требования 152-ФЗ. В анонимных вкладках (incognito) баннер должен появляться при каждом визите, но его не существует.

## Goals

- Показывать cookie-баннер при отсутствии сохранённого согласия (в т.ч. в incognito)
- Не загружать `tag.js` Яндекс Метрики без явного согласия пользователя
- После согласия — инициализировать Метрику на месте, без перезагрузки страницы
- Соответствовать требованиям 152-ФЗ: упоминание cookie, цель обработки, ссылка на политику

## Architecture

### Изменения в существующих файлах

**`src/app/layout.tsx`**
- Удалить блок `<script>` Яндекс Метрики из `<head>`
- Удалить `<noscript>` пиксель Метрики
- Добавить `<CookieBanner />` в `<body>` после `{children}`

### Новый компонент

**`src/components/CookieBanner.tsx`** — `"use client"` компонент

**Состояние:**
- `visible: boolean` — показывать ли баннер

**Логика при монтировании (`useEffect`):**
```
const consent = localStorage.getItem('cookieConsent')
if (consent === 'accepted') → initMetrica(), не показывать баннер
if (consent === 'declined') → ничего не делать
if (consent === null)       → показать баннер
```

**Обработчики:**
- `handleAccept()`: `localStorage.setItem('cookieConsent', 'accepted')` → `initMetrica()` → `setVisible(false)`
- `handleDecline()`: `localStorage.setItem('cookieConsent', 'declined')` → `setVisible(false)`

**Функция `initMetrica()`:**
```
1. window.ym = window.ym || function(...) { (window.ym.a = window.ym.a || []).push(arguments) }
2. window.ym.l = +new Date()
3. Создать <script async src="https://mc.yandex.ru/metrika/tag.js">
4. Добавить в document.head
5. onload → ym(110162866, "init", { clickmap, trackLinks, accurateTrackBounce, webvisor, trackHash })
```

## UI

**Позиция:** `fixed bottom-0 left-0 right-0`, `z-50`

**Стиль:** backdrop-blur + полупрозрачный фон через CSS-переменные `--bg` / `--text` (согласован с текущим дизайном glass-card)

**Содержимое:**
```
🍪  Я использую cookie-файлы для сбора анонимной статистики.
    Подробнее в [Политике конфиденциальности].
                                    [Отказать]  [Принять]
```

- Ссылка ведёт на `https://ai.absidorov.ru/Политика-конфиденциальности`
- «Отказать» — outlined кнопка
- «Принять» — акцентная кнопка
- Анимация: `translate-y-full` → `translate-y-0` при появлении (CSS transition)

## Data Flow

```
Пользователь открывает сайт
  └─ CookieBanner монтируется
       ├─ localStorage === 'accepted' → initMetrica() (без баннера)
       ├─ localStorage === 'declined' → ничего
       └─ localStorage === null → показать баннер
            ├─ Принять → localStorage='accepted' + initMetrica() + скрыть
            └─ Отказать → localStorage='declined' + скрыть
```

## Out of Scope

- Гранулярное управление категориями cookie (только один тогл: принять/отказать)
- Повторный показ баннера на других страницах (решается раз на весь визит/сессию через localStorage)
- Серверная запись согласия
