# 📝 Fullstack Todo List App

[![CI/CD Pipeline](https://github.com/zrumyk/todo-list/actions/workflows/ci-cd.yml/badge.svg?branch=main)](https://github.com/zrumyk/todo-list/actions/workflows/ci-cd.yml)

A full-stack task management web application. The backend follows a **3-layer architecture** (controllers, services, repositories) and the frontend is organized with the **Bulletproof React** feature-driven approach. The client, the API and PostgreSQL run in separate Docker containers, and every push to `main` is built, published to GitHub Container Registry and deployed to a VPS by a GitHub Actions pipeline.

<img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/f035c43c-bdbf-4948-a253-84251e0ccf87" />

## ✨ Features

- **Authentication:** registration, login and session persistence with JWT.
- **Task management:** create, view and delete tasks, and change their status (To Do / Completed).
- **Protected routes:** `ProtectedRoute` and `PublicRoute` separate guest pages from pages for signed-in users.
- **Centralized error handling:** an error-handling middleware on the server and Axios interceptors on the client show consistent error messages to the user.

## 🛠 Tech stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 18 (Vite), Zustand, React Router v6, Axios, CSS Modules |
| **Backend** | Node.js, Express.js, Prisma ORM |
| **Database** | PostgreSQL 15 |
| **Security** | JWT, bcrypt, Helmet, CORS |
| **Validation** | Joi / Zod middlewares |
| **DevOps** | Docker, Docker Compose, GitHub Actions, GitHub Container Registry (GHCR) |

## 🏗 Architecture

**Backend — 3-layer architecture with dependency injection**

- **Controllers** handle HTTP requests and responses.
- **Services** contain the business logic.
- **Repositories** are the only layer that talks to the database (through Prisma).

**Frontend — Bulletproof React (feature-driven structure)**

- Code is grouped by feature rather than by file type.
- Zustand holds the global auth state.
- React Router layouts and outlets, together with `ProtectedRoute` / `PublicRoute`, control access to pages.
- A configured Axios instance with interceptors handles API calls and errors.

## 📁 Project structure

```
todo-list/
├── client/                    # React (Vite) frontend
├── server/                    # Node.js + Express backend
├── .github/workflows/         # CI/CD pipeline
├── docker-compose.yml         # development setup (images are built locally)
└── docker-compose.prod.yml    # production setup (images are pulled from GHCR)
```

## 🚀 Getting started

### Option 1: Run with Docker (recommended)

Requirements: [Docker](https://www.docker.com/) with Docker Compose.

**1. Clone the repository**

```bash
git clone https://github.com/zrumyk/todo-list.git
cd todo-list
```

**2. Create a `.env` file in the project root**

Both the database and the backend containers read their settings from this file:

```env
# PostgreSQL container
POSTGRES_USER=todo_user
POSTGRES_PASSWORD=change_me
POSTGRES_DB=todo_db

# Backend (the database host is the Compose service name)
DATABASE_URL="postgresql://todo_user:change_me@postgres-db:5432/todo_db?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"
```

**3. Build and start the containers**

```bash
docker compose up --build
```

**4. Sync the database schema** (first run, in a second terminal)

```bash
docker compose exec backend npx prisma db push
```

| Service | URL |
| --- | --- |
| Client | http://localhost:5173 |
| API | http://localhost:3000 |
| PostgreSQL | localhost:5432 |

Stop everything with:

```bash
docker compose down
```

### Option 2: Run locally without Docker

Requirements: Node.js and a running PostgreSQL instance.

**1. Backend**

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/todo_db?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here"
```

Sync the database schema and start the server:

```bash
npx prisma db push
npx prisma generate
npm run dev
# Server runs on http://localhost:3000
```

**2. Frontend** (in a new terminal)

```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

## ⚙️ CI/CD

The pipeline is defined in `.github/workflows/ci-cd.yml` and runs on every push and pull request to `main` and `dev`. It consists of three jobs that run one after another:

1. **Test** — installs the backend and frontend dependencies on Node.js 20, generates the Prisma client, runs ESLint for both the backend and the frontend, and runs the backend test script when one is defined.
2. **Build and push** — builds the backend and frontend Docker images and publishes them to GitHub Container Registry (`ghcr.io/zrumyk/todo-list-backend` and `ghcr.io/zrumyk/todo-list-frontend`, tag `latest`). Runs only if the tests pass.
3. **Deploy** — connects to the VPS over SSH, pulls `docker-compose.prod.yml` from the repository, pulls the new images, restarts the containers with `docker compose up -d`, syncs the database schema with `prisma db push` and removes unused images.

### Production setup

On the server the pipeline keeps the compose file in `~/todo-app` and expects a `.env` file next to it (same variables as in the development setup). The production client is served on port 80.

All credentials used by the pipeline (server access, registry token, frontend build variables) are stored as GitHub repository secrets and are never committed to the repository.
