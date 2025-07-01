
# WordRecall 🧠

**WordRecall** — це мінімалістичний вебдодаток, який допомагає згадати забуте слово за описом, прикладом речення, початковою літерою або кількістю складів. Використовує штучний інтелект (OpenRouter API) для генерації 8 можливих варіантів українських слів.

---

## 🔧 Технології

- 🖥 Frontend: HTML, CSS, JavaScript (Vanilla)
- ⚙ Backend: Node.js (Express)
- 🧠 AI: [OpenRouter API](https://openrouter.ai)
- 🗂 База даних: SQLite
- 🌐 Локалізація: Українська / Англійська (перемикач мови)

---

## 🚀 Як запустити локально

### 1. Клонування репозиторію

```bash
git clone https://github.com/your-username/wordrecall.git
cd wordrecall
```

### 2. Встановлення залежностей

```bash
cd server
npm install
```

### 3. Створення `.env`

```env
# server/.env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3000
```

### 4. Запуск сервера

```bash
npm start
```

### 5. Перейдіть у браузер

```
http://localhost:3000
```

---

## 📦 Структура проєкту

```
wordrecall/
├── client/              # HTML/CSS/JS
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server/              # Express API + SQLite
│   ├── db/
│   │   └── queries.js
│   ├── server.js
│   └── .env
└── README.md
```

---

## 🌐 Деплой

### 🔹 Frontend

Можна розгорнути як static site на:

- Netlify
- Vercel
- GitHub Pages

### 🔹 Backend

Node.js сервер готовий для розгортання на:

- Render.com ✅
- Railway.app
- Cyclic.sh
- VPS (з nginx)

---

## 💡 Автор

Максим Харенко — [GitHub](https://github.com/mkharenko)

---

## 📜 Ліцензія

MIT
