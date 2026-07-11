# Portfolio Audit & Modernization Plan

_MERN portfolio (React 18 / CRA + Express + Mongoose). Audited July 2026._

---

## 🔴 Critical security issues (fix first)

1. **All admin API endpoints are completely unprotected.** `add-project`, `update-project`, `delete-project`, `update-intro`, etc. have **no auth check** on the server. Anyone who knows your Render URL can add, edit, or wipe your entire portfolio with a single curl command. The login is purely cosmetic.
2. **Passwords stored and compared in plaintext.** `userModel` has no hashing; `admin-login` queries `{ username, password }` directly. Your admin password sits readable in the DB. Needs bcrypt.
3. **Fake auth / trivially bypassable.** "Login" just saves the server response to `localStorage.token`. The `/admin` page only checks that *some* token exists — open dev tools, run `localStorage.setItem("token","x")`, and you're in. There's no JWT, no signature, no expiry, and the server never verifies anything.
4. **`server/.env` (your Mongo connection string) is committed to git.** It's in the repo history, so the credential is exposed to anyone with repo access, forever. **Rotate the DB password immediately**, remove `.env` from tracking, and add a `.gitignore`.
5. **NoSQL injection + mass assignment.** `req.body` is passed straight into Mongoose queries and into `findOneAndUpdate`/`create`. An attacker can inject query operators or set arbitrary fields. No validation or sanitization anywhere.
6. **No `helmet`, no rate limiting, no input validation.** Login is brute-forceable. Raw error objects are sent to clients (`res.send(error)`), leaking internals.

## 🟠 Bugs causing the lag / "doesn't add correctly"

- **Render free-tier cold starts.** Your server spins down when idle; the first request after that takes 30–60s. This is almost certainly the main "lag" you feel when adding projects.
- **Full data refetch after every change.** Each add/edit/delete triggers `SetReloadData(true)`, which re-downloads the *entire* portfolio. Slow and flickery. Should update state locally (optimistic update).
- **`admin-login` crashes on wrong credentials.** `user.password=""` runs *before* the `if(user)` null check — when login fails, `user` is null and it throws, falling into the 500 handler instead of returning a clean "invalid credentials".
- **`Login.js` shows a literal bug string:** `message.error("error.message")` (quoted) instead of the real error.
- **`Projects.js` crashes if there are zero projects** — `projects[selectedItemIndex].image` on an empty array.
- **Missing React `key` props** in project/experience `.map()` loops → warnings + reconciliation bugs.
- **`Header.js` uses `class=` instead of `className`** and relies on a CDN icon font.

## 🟡 Outdated / dead tech

- **Create React App (`react-scripts`) is deprecated and unmaintained.** Migrate to **Vite** — dramatically faster builds and dev server, actively maintained.
- **React 18 → React 19** available.
- **`antd` `Tabs.TabPane` is deprecated** (v5) — you even left a comment noting the new `items` API. Should migrate.
- **`redux` + `combineReducers` legacy boilerplate** — you already use Redux Toolkit, so drop the extra `redux` dependency and `combineReducers`.
- **Junk dependencies:** `i` and `npm` are listed in `client/package.json` `dependencies` — accidental installs. Remove them.
- **No animation library** — nothing driving motion currently.

## 🟢 Database

- **Singleton hack:** intro/about/contact are fetched as `array[0]`. Fragile — should be single config documents or a settings collection.
- **Untyped arrays** (`type: Array`), **no timestamps, no indexes.**
- **Typo'd collection/field names baked into the schema:** `expreiences`, `exprience`. Worth cleaning up with a migration while modernizing.

## ✨ UI / UX & "make it stand out"

- Admin forms use bare native `<input>`/`<textarea>` (unstyled) instead of antd `Input` — looks rough and is the other half of the "clunky admin" feeling.
- Full-screen blocking spinner on every load → replace with **skeleton loaders**.
- Generic teal-on-navy theme, no motion, hotlinked unoptimized images, no lazy loading, no code splitting.

**Suggestions to make it pop:** Framer Motion scroll/entrance animations, animated hero, project cards with hover states and lazy-loaded/optimized images, a proper responsive nav (current header is just 3 letters), refined typography and spacing, dark/light toggle, and micro-interactions on buttons.

---

## Recommended plan (phased)

**Phase 1 — Security (do now, ~half a day):** rotate Mongo credentials; remove `.env` from git + add `.gitignore`; hash passwords with bcrypt; add JWT auth + an `authMiddleware` guarding every write endpoint; add `helmet`, `express-rate-limit`, and input validation (Zod/Joi); stop sending raw errors.

**Phase 2 — Stability & tooling:** migrate CRA → Vite; remove junk deps; upgrade antd Tabs; fix the login crash, empty-projects crash, and missing keys; switch mutations to optimistic local updates (no full refetch). Consider a paid/always-on host or a keep-alive ping to kill cold starts.

**Phase 3 — UI redesign:** Framer Motion, redesigned hero + project cards, skeleton loaders, image optimization/lazy loading, responsive nav, code splitting.

**Phase 4 — Content:** update projects, experience, skills, and tech stack to current.
