Замени весь `README.md` на это:

````md
# FinGramota Frontend MVP

Frontend MVP для платформы FinGramota — проекта по финансовой грамотности, финансовой безопасности и экстренной помощи пользователям.

## Стек проекта

- React
- Vite
- React Router DOM
- Material Design Icons
- CSS
- Google Fonts

## Установленные библиотеки

Перед запуском нужно установить зависимости:

```bash
npm install
````

Если проект запускается с нуля и зависимостей нет, установите основные библиотеки:

```bash
npm install react react-dom react-router-dom @mdi/js
```

## Для корректного отображения иконок

Проект использует MDI Icons:

```bash
npm install @mdi/js
```

Иконки подключаются через:

```js
import { mdiAccountOutline } from "@mdi/js";
```

Отображение иконок происходит через компонент:

```txt
src/components/MdiIcon.jsx
```

## Для корректного отображения шрифтов

В проекте используются Google Fonts. Они подключены в:

```txt
src/styles/global.css
```

Основные шрифты:

* Unbounded
* Golos Text

Если шрифты не отображаются, проверьте импорт в `global.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700&family=Golos+Text:wght@400;500;600&display=swap');
```

## Структура проекта

```txt
src/
 ├── assets/
 ├── components/
 │   ├── Header.jsx
 │   ├── Header.css
 │   ├── Footer.jsx
 │   ├── Footer.css
 │   └── MdiIcon.jsx
 │
 ├── constants/
 │   └── navigation.js
 │
 ├── data/
 │   └── mockData.js
 │
 ├── layouts/
 │   └── MainLayout.jsx
 │
 ├── pages/
 │   ├── HomePage.jsx
 │   ├── FaqPage.jsx
 │   ├── InstrumentsPage.jsx
 │   ├── InstrumentsPage.css
 │   ├── SosPage.jsx
 │   └── SosPage.css
 │
 ├── services/
 │   ├── api.js
 │   └── fingramotaApi.js
 │
 ├── styles/
 │   ├── global.css
 │   └── variables.css
 │
 ├── App.jsx
 ├── App.css
 ├── index.css
 └── main.jsx
```

## Страницы проекта

* `/` — главная страница
* `/instruments` — инструменты
* `/faq` — FAQ
* `/sos` — SOS страница
* `/check` — временная страница центра проверки
* `/marketplace` — временная страница маркетплейса
* `/education` — временная страница обучения

## Запуск проекта

```bash
npm run dev
```

После запуска откройте:

```txt
http://localhost:5173
```

## Production build

Для проверки production-сборки:

```bash
npm run build
```

Если сборка прошла успешно, проект готов к деплою.

## Preview production build

```bash
npm run preview
```

## Важные файлы

### Роутинг

```txt
src/App.jsx
```

### Общий layout

```txt
src/layouts/MainLayout.jsx
```

### Header

```txt
src/components/Header.jsx
src/components/Header.css
```

### Footer

```txt
src/components/Footer.jsx
src/components/Footer.css
```

### Глобальные стили

```txt
src/styles/global.css
src/styles/variables.css
```

## Git

Перед отправкой изменений:

```bash
npm run build
git status
git add .
git commit -m "Update frontend"
git push
```

## Что не нужно добавлять в Git

Эти папки не должны попадать в репозиторий:

```txt
node_modules
dist
.vite
.env
```

Они должны быть указаны в `.gitignore`.

## Статус проекта

Готов frontend MVP:

* главная страница
* страница инструментов
* FAQ
* SOS страница
* общий Header/Footer
* роутинг
* анимации
* адаптивные блоки
* карточки сервисов
* MDI иконки
* Google Fonts