# Prem Jadwani — Portfolio

A full-stack personal portfolio built on the **MERN** stack with a modern glassmorphism UI and a **dynamic admin panel** — so all content (intro, about, experience, projects, contact) is managed from a UI and stored in the database, with **no code changes or redeploys** needed to update it.

**Live:** https://mern-portfolio-client-yaps.onrender.com

---

## Features

- **Dynamic content** — every section is served from MongoDB and editable through a protected admin dashboard (add / edit / delete projects and experiences; update intro, about, and contact).
- **Secure admin** — JWT authentication, bcrypt-hashed passwords, protected write routes, request validation, rate limiting, and security headers.
- **Modern UI** — glassmorphism design, animated hero with a typewriter effect, scroll-reveal animations (Framer Motion), skeleton loading states, and a responsive layout.
- **Featured projects + GitHub** — curated project cards with tech tags and links, plus a "View all on GitHub" call-to-action.
- **Resume download** and quick contact links (email, LinkedIn, GitHub).
- **Fast tooling** — built with Vite for near-instant dev startup and optimized production builds, with the admin bundle code-split away from the public page.

---

## Tech stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | React 18, Vite, Tailwind CSS, Framer Motion, Redux Toolkit, Ant Design (admin), Axios |
| Backend   | Node.js, Express, Mongoose |
| Database  | MongoDB (Atlas) |
| Security  | JWT, bcryptjs, Helmet, express-rate-limit, Zod validation |
| Hosting   | Render (static site + web service) |

---

## Architecture

```
Public site (React)  ──GET /get-portfolio-data──►  Express API  ──►  MongoDB
Admin panel (React)  ──POST /update-* /add-* ...─►  (JWT-protected)   (Atlas)
```

Both the public site and the admin panel read/write the **same database**, so any edit made in the admin appears live on the site immediately.

---

## Project structure

```
MERN-Portfolio/
├── client/                 # React + Vite frontend
│   ├── public/             # static assets (favicon, resume.pdf, project banners)
│   └── src/
│       ├── components/     # Reveal, GlassCard, Skeleton, Stats, Typewriter, Header, ...
│       ├── pages/
│       │   ├── Home/       # public sections (Intro, About, Experiences, Projects, Contact, ...)
│       │   └── Admin/      # login + admin dashboard (Intro/About/Experiences/Projects/Contact)
│       ├── redux/          # Redux Toolkit store & slice
│       ├── api.js          # axios + API base URL config
│       └── siteConfig.js   # roles, availability, stats, links
└── server/                 # Express + Mongoose backend
    ├── config/             # MongoDB connection
    ├── middleware/         # auth (JWT) + request validation (Zod)
    ├── models/             # portfolio + user schemas
    ├── routes/             # portfolio API routes
    └── scripts/            # seedAdmin, seedContent
```

---

## Getting started

See **[SETUP.md](./SETUP.md)** for full local setup. Quick version:

**Backend**
```bash
cd server
npm install
cp .env.example .env      # fill in values (see below)
npm run seed:admin        # create the admin login (one time)
npm run dev               # starts on http://localhost:5001
```

**Frontend**
```bash
cd client
npm install
npm run dev               # starts on http://localhost:3000
```

### Environment variables (`server/.env`)

| Variable | Description |
|----------|-------------|
| `mongo_url` | MongoDB connection string |
| `PORT` | Server port (defaults to 5000) |
| `JWT_SECRET` | Secret used to sign auth tokens |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `2h`) |
| `CLIENT_URL` | Allowed frontend origin(s) for CORS |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Used once by `seed:admin` to create the admin user |

The client reads `VITE_API_URL` (in `client/.env`) for the API base, falling back to the deployed server URL.

### Useful scripts

**Server** — `npm run dev`, `npm start`, `npm run seed:admin`, `npm run seed:content`
**Client** — `npm run dev`, `npm run build`, `npm run preview`

---

## Managing content

1. Go to `/admin-login` and sign in.
2. Edit any section and click **Save** — changes persist to MongoDB and show on the live site instantly.

`seed:content` is a one-time bulk loader for the initial content; after that, use the admin panel (re-running it overwrites existing content).

---

## Author

**Prem Jadwani** — Full-Stack & Backend Engineer
[GitHub](https://github.com/Prem790) · [LinkedIn](https://linkedin.com/in/prem-jadwani-5b8748221)
