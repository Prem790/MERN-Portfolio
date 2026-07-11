# Local Setup & Run Guide

## Prerequisites (tools to install)

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 20 LTS or newer | includes `npm`. Check with `node -v` |
| **npm** | 10+ | comes with Node |
| **Git** | any recent | |
| **MongoDB** | — | a MongoDB Atlas cluster + connection string (no local install needed) |

Recommended VS Code extensions (optional but helpful):
`ESLint`, `Prettier`, `Tailwind CSS IntelliSense`.

No global npm packages or CLIs are required — everything runs through the local `npm` scripts.

---

## 1. Backend (server)

```bash
cd server

# install dependencies
npm install

# create your env file from the template, then fill in real values
cp .env.example .env
#   - mongo_url      : your MongoDB Atlas connection string
#   - JWT_SECRET     : run the command below to generate one
#   - ADMIN_USERNAME / ADMIN_PASSWORD : the admin login you want

# generate a strong JWT secret and paste it into .env
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

# create the hashed admin user in the database (run once)
npm run seed:admin

# start the server (with auto-reload)
npm run dev
#   -> Server running on port 5000

# or start without auto-reload
npm start
```

## 2. Frontend (client)

Open a second terminal:

```bash
cd client

# install dependencies
npm install

# start the Vite dev server
npm run dev
#   -> http://localhost:3000

# production build + local preview
npm run build
npm run preview
```

The client currently calls the deployed API URLs directly. For local
end-to-end testing against your local server, point the axios base URLs
at `http://localhost:5000` (or use the Vite dev proxy already configured
under `/api`).

---

## Deploying (Render)

Set these environment variables on the **server** service (do NOT commit them):
`mongo_url`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`, and (for the one-time
seed) `ADMIN_USERNAME` / `ADMIN_PASSWORD`.

Build command: `npm install` — Start command: `npm start`.
