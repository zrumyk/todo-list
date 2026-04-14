# 📝 Fullstack Todo-List App

Сучасний вебзастосунок для управління завданнями, побудований за принципами чистої архітектури (3-Layer Architecture на бекенді) та методологією Bulletproof React на фронтенді.

## ✨ Основний функціонал

- **Безпека та Авторизація:** Реєстрація, вхід та підтримка сесії за допомогою JWT-токенів.
- **Управління завданнями:** Створення, перегляд, видалення та зміна статусу тасок (To Do / Completed).
- **Захищені маршрути:** Механізм `ProtectedRoute` та `PublicRoute` для розмежування доступу гостей та авторизованих користувачів.
- **Глобальна обробка помилок:** Централізований Error Middleware на бекенді та Axios Interceptors на фронтенді для зручного виводу повідомлень користувачу.

---

## 🛠 Стек технологій

### **Frontend (Клієнтська частина)**
- **Фреймворк:** React 18 (Vite)
- **Архітектура:** Bulletproof React (Feature-Driven Structure)
- **Менеджер стану:** Zustand (глобальний стейт авторизації)
- **Маршрутизація:** React Router v6 (Layouts & Outlets)
- **HTTP-клієнт:** Axios (з налаштованими Interceptors)
- **Стилізація:** CSS Modules + Глобальні змінні

### **Backend (Серверна частина)**
- **Платформа:** Node.js + Express.js
- **Архітектура:** 3-Layer Architecture (Controllers, Services, Repositories) + Dependency Injection
- **База даних:** PostgreSQL
- **ORM:** Prisma
- **Безпека:** JSON Web Tokens (JWT), bcrypt, Helmet, CORS
- **Валідація:** Joi / Zod (Middlewares)

---

## 📂 Структура проєкту (Монорепозиторій)

Проєкт розділений на дві незалежні частини:

```text
📦 todo-list
 ┣ 📂 client/               # Фронтенд (React / Vite)
 ┃  ┣ 📂 src/
 ┃  ┃  ┣ 📂 features/       # Ізольовані бізнес-домени (auth, tasks)
 ┃  ┃  ┣ 📂 components/     # Глобальні UI-компоненти
 ┃  ┃  ┣ 📂 stores/         # Zustand стейти
 ┃  ┃  ┗ 📂 routes/         # Налаштування React Router
 ┃
 ┗ 📂 server/               # Бекенд (Node.js / Express)
    ┣ 📂 prisma/            # Схема бази даних та міграції
    ┗ 📂 src/
       ┣ 📂 controllers/    # Обробка HTTP-запитів та відповідей
       ┣ 📂 services/       # Бізнес-логіка додатку
       ┣ 📂 repositories/   # Взаємодія з базою даних (Prisma)
       ┗ 📂 middlewares/    # Валідація, авторизація, обробка помилок
```

---

## 🚀 Інструкція з локального запуску (Development)

Щоб запустити проєкт на своєму комп'ютері, виконайте наступні кроки:

### 1. Клонування репозиторію
```bash
git clone https://github.com/[твій-юзернейм]/todo-list.git
cd todo-list
```

### 2. Налаштування Backend-частини
Перейдіть у папку сервера та встановіть залежності:
```bash
cd server
npm install
```

Створіть файл `.env` у папці `server` та додайте ваші налаштування:
```env
DATABASE_URL="postgresql://[користувач]:[пароль]@localhost:5432/todo_db?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"
```

Синхронізуйте схему бази даних (PostgreSQL має бути встановлений та запущений):
```bash
npx prisma db push
npx prisma generate
```

Запустіть сервер:
```bash
npm run dev
# Сервер запуститься на http://localhost:3000
```

### 3. Налаштування Frontend-частини
Відкрийте новий термінал, перейдіть у папку клієнта та встановіть залежності:
```bash
cd client
npm install
```

Запустіть клієнтський додаток:
```bash
npm run dev
# Додаток буде доступний за адресою http://localhost:5173
```
