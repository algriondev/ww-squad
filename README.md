# WW SQUAD — Setup & Deployment Guide

Everything you need to go from the files in this folder to a live site on Vercel, start to finish.

---

## What you need before you start

| Tool               | Why                               | Install                                                     |
| ------------------ | --------------------------------- | ----------------------------------------------------------- |
| **Node.js 18+**    | Next.js 15 requires it            | [nodejs.org](https://nodejs.org) — download the **LTS** row |
| **npm** (or pnpm)  | Ships with Node; runs the scripts | Already included with Node                                  |
| **VS Code**        | Editor we're working in           | [code.visualstudio.com](https://code.visualstudio.com)      |
| **Git**            | Vercel deploys from a Git repo    | [git-scm.com](https://git-scm.com)                          |
| **GitHub account** | Free — Vercel connects to it      | [github.com](https://github.com)                            |
| **Vercel account** | Free tier is fine                 | [vercel.com](https://vercel.com) — sign up with your GitHub |

---

## 1. Put the files on your machine

Download or clone this folder. Your directory should look exactly like this:

```
ww-squad/
├── app/
│   ├── components/
│   │   └── WWSquad.tsx          ← the full site (single component)
│   ├── layout.tsx               ← root layout, fonts, meta
│   └── page.tsx                 ← mounts WWSquad on the "/" route
├── .env.local                   ← env placeholder (never committed)
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md                    ← this file
```

---

## 2. Open in VS Code

1. Open **VS Code**.
2. Press **Ctrl + O** (Windows / Linux) or **Cmd + O** (Mac).
3. Navigate to the `ww-squad` folder and click **Open**.
4. VS Code will show you the file tree on the left.

**Recommended extensions** — VS Code may prompt you automatically. Accept them, or install manually from the Extensions tab (Ctrl + Shift + X):

- **ES7+ React/Redux/React-Native snippets** — autocomplete for JSX
- **Prettier** — keeps the code formatted
- **TypeScript** — already bundled, but make sure it's active

---

## 3. Install dependencies

Open the **integrated terminal** in VS Code:

> **Ctrl + \`** (backtick) on Windows/Linux  
> **Cmd + \`** on Mac

Then run, one line at a time:

```bash
cd ww-squad
npm install
```

This downloads Next.js, React 19, and TypeScript into `node_modules/`. It takes 20–40 seconds depending on your connection. You'll see a `package-lock.json` file appear — that's normal, leave it alone.

---

## 4. Run locally and see the site

```bash
npm run dev
```

You'll see something like:

```
▶ Next.js 15.3.0
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
```

Open **http://localhost:3000** in your browser. The full WW SQUAD site — hero, ticker, vibe grid, coaches, join flow, everything — should be live and interactive.

**Hot reload is on by default.** Save any change to `WWSquad.tsx` and the browser updates instantly, no refresh needed.

To stop the server when you're done, click back into the terminal and press **Ctrl + C**.

---

## 5. Push to GitHub (required before Vercel can see it)

```bash
# Initialise a git repo inside the project folder
git init

# Stage everything (node_modules and .env.local are blocked by .gitignore)
git add .

# Commit
git commit -m "Initial commit — WW SQUAD"
```

Now create a repo on GitHub:

1. Go to [github.com/repo/create](https://github.com/repo/create).
2. Name it `ww-squad` (or anything you like).
3. Leave all the checkboxes **unchecked** — we already have a README and .gitignore.
4. Click **Create repository**.
5. GitHub will show you a page with commands. Run the two lines under _"…or push an existing repository from the command line"_:

```bash
git remote add origin https://github.com/YOUR-USERNAME/ww-squad.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username. If it asks for a password, use a **Personal Access Token** (GitHub Settings → Developer Settings → Tokens).

---

## 6. Deploy to Vercel (the actual "go live" step)

1. Go to [vercel.com](https://vercel.com) and log in (use your GitHub account).
2. Click the big **"Add New → Project"** button on your dashboard.
3. Under _"Import Git Repository"_ you'll see your `ww-squad` repo. Click **Import**.
4. Vercel's next screen is the project config:
   - **Framework Preset** → should auto-detect **Next.js**. If it doesn't, open the dropdown and select it.
   - **Root Directory** → leave as `/` (default).
   - **Build Command** → leave as `next build` (default).
   - **Install Command** → leave as `npm install` (default).
   - **Environment Variables** → nothing needed right now.
5. Click **Deploy**.
6. Wait 15–45 seconds. Vercel builds the site.
7. You'll land on a success page with a live URL like:

   **https://ww-squad-YOUR-USERNAME.vercel.app**

   Click it. WW SQUAD is live on the internet.

---

## 7. Every future change auto-deploys

From this point on, the workflow is just:

```bash
git add .
git commit -m "describe what you changed"
git push
```

Vercel watches your `main` branch. Every push triggers a new production deploy automatically — usually under 30 seconds.

**Preview branches:** If you create a new branch and push to it, Vercel creates a _preview_ URL for that branch. Useful for testing changes before they go live.

---

## 8. Custom domain (optional but recommended)

If you have a domain (e.g. `wwsquad.com`):

1. Go to your Vercel project dashboard → **Settings → Domains**.
2. Type your domain and click **Add**.
3. Vercel gives you a DNS record (usually a CNAME). Go to your domain registrar (e.g. Namecheap, Cloudflare) and add that record.
4. Within a few minutes HTTPS is auto-enabled and your domain is live.

---

## 9. Troubleshooting

| Problem                                 | Fix                                                                                                                         |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `npm install` hangs                     | Delete `node_modules/` and `package-lock.json`, then run `npm install` again                                                |
| Port 3000 already in use                | Run `npm run dev -- -p 3001` to use a different port                                                                        |
| Vercel says "Framework not detected"    | In the Vercel config screen, manually set **Framework Preset → Next.js**                                                    |
| White flash before the dark theme loads | Already handled — `layout.tsx` sets `background: #0c0c0c` on the body before hydration                                      |
| Google Fonts not loading                | Check your network. The fonts load from `fonts.googleapis.com`. If blocked, the fallback system sans-serif will still work. |
| TypeScript errors in VS Code            | Run `npm install` first — the types download with the packages. Then restart VS Code.                                       |

---

## Project structure at a glance

```
app/
├── layout.tsx          Root shell: <html>, <head>, fonts, OG meta, dynamic title
├── page.tsx            "/" route — mounts the client component
└── components/
    └── WWSquad.tsx     The entire site in one file:
                          Nav · Hero · Ticker · Vibe Grid · Why Section
                          Coaches · Testimonials · CTA · Footer · FAB
                          Join Flow Modal (intro → base → level → addons → confirm)
```

That's it. No database, no API routes, no environment secrets needed to get started. The site is fully static and edge-cacheable out of the box.
