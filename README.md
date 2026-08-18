# Career Tracker

A full-stack MERN application that helps you stay consistent with your career goals by tracking what you accomplish every day — custom tasks, DSA problems solved, job applications sent, and interview preparation logged, all in one daily dashboard.

## Tech Stack

**Frontend:** React (Vite), React Router DOM, Tailwind CSS, Axios, Context API, Lucide React
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT auth, bcryptjs

## Project Structure

```
career-tracker/
├── backend/     # Express + MongoDB API
├── frontend/    # React + Vite client
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or an Atlas connection string)

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Edit `backend/.env` if needed (defaults work for a local MongoDB instance):

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/career_tracker
JWT_SECRET=change_this_to_a_long_random_secret_key
NODE_ENV=development
```

**Important:** change `JWT_SECRET` to a long random string before using this anywhere beyond local development.

Start the API (with auto-reload):

```bash
npm run dev
```

The API runs on `http://localhost:5000`. Health check: `GET http://localhost:5000/api/health`.

### 2. Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` and talks to the API at the URL set in `frontend/.env` (`VITE_API_URL=http://localhost:5000/api` by default).

### 3. Use it

1. Open `http://localhost:5173`
2. Register an account
3. You'll land on the dashboard — add a task, a DSA problem, a job application, or an interview prep session using Quick Actions
4. Visit the dedicated pages (Tasks, DSA, Jobs, Interview Prep) from the sidebar for full CRUD on each tracker

## API Overview

All routes below except `/api/auth/register` and `/api/auth/login` require:

```
Authorization: Bearer <token>
```

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/tasks` | List tasks (supports `?status=completed\|pending`, `?category=`) |
| GET | `/api/tasks/today` | Tasks due today |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/complete` | Toggle/set completion |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/dsa` | List DSA problems |
| GET | `/api/dsa/today` | Problems solved today |
| POST | `/api/dsa` | Log a solved problem |
| PUT | `/api/dsa/:id` | Update a problem |
| DELETE | `/api/dsa/:id` | Delete a problem |
| GET | `/api/jobs` | List job applications |
| POST | `/api/jobs` | Add an application |
| PUT | `/api/jobs/:id` | Update an application |
| DELETE | `/api/jobs/:id` | Delete an application |
| GET | `/api/interview` | List interview prep sessions |
| POST | `/api/interview` | Log a prep session |
| PUT | `/api/interview/:id` | Update a session |
| DELETE | `/api/interview/:id` | Delete a session |
| GET | `/api/dashboard` | Today's aggregated stats + recent activity |

Every query is scoped to the authenticated user via the JWT — no endpoint accepts a client-supplied `userId`.

## Notes on the MVP

This build intentionally excludes AI features, notifications, gamification, calendar integration, social features, and advanced analytics, per the product spec. See "Future Version" ideas (streaks, goals, spaced repetition, etc.) for what could come after the MVP is validated.

## Security Notes

- Passwords are hashed with bcrypt before storage and never returned in API responses.
- JWTs expire after 7 days and are sent via the `Authorization` header — no cookies are used.
- All CRUD endpoints filter by the authenticated user's ID extracted from the verified JWT.
