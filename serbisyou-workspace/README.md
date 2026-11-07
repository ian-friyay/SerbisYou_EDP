# SerbisYou 🎓💼
> **Campus Skill Marketplace** — A student-to-student platform facilitating creative, event support, and digital service transactions within the campus community.

---

## 📌 Project Overview

**SerbisYou** connects talented students offering services (graphic design, event photography, tutoring, videography, tech support, etc.) with campus peers and student organizations needing reliable and accessible assistance. The platform fosters a trusted campus gig economy with real-time communication, service listings, order management, and administrative governance.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, React-Bootstrap, Bootstrap 5, React Router DOM, Axios |
| **Mobile & Offline** | Progressive Web App (PWA) with Background Online Sync |
| **Backend API** | Node.js, Express.js, Socket.io (Real-time WebSocket chat) |
| **Database** | Supabase (PostgreSQL) — `Users`, `Services`, `Service Transactions`, `Service Requests` |
| **Admin Panel & CMS**| Directus CMS |

---

## 📁 Repository Structure

```text
serbisyou-workspace/
├── .gitignore                     # Monorepo-level git ignore
├── README.md                      # Project documentation and team onboarding guide
├── frontend/                      # Client-side React + Vite application
│   ├── .env.example               # Frontend environment template
│   ├── index.html                 # Main HTML entry point
│   ├── package.json               # Frontend dependencies and scripts
│   ├── vite.config.js             # Vite configuration with PWA integration
│   ├── public/                    # Static assets (icons, manifest assets)
│   └── src/
│       ├── assets/                # Logos, illustrations, styles
│       ├── components/            # Reusable UI components (Navbar, Footer, Cards)
│       ├── context/               # Global state (Auth, Socket contexts)
│       ├── pages/                 # Route views (Home, Services, Chat, NotFound)
│       ├── services/              # API and HTTP client services (Axios)
│       ├── App.jsx                # Main application component & routing
│       ├── App.css
│       ├── main.jsx               # React DOM entry point
│       └── index.css
└── backend/                       # Server-side Node.js + Express API
    ├── .env.example               # Backend environment template
    ├── package.json               # Backend dependencies and scripts
    ├── server.js                  # Main server entry point (Express + Socket.io)
    ├── config/
    │   └── db.js                  # Supabase client database connection
    ├── controllers/               # Route controller logic
    ├── middlewares/               # Authentication & error handling middlewares
    ├── models/                    # Data models / Supabase schema helpers
    └── routes/                    # API route definitions
```

---

## 🚀 Getting Started (Team Onboarding Guide)

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js**: `v18.x` or higher (Recommended: LTS)
- **Git**: Installed and configured
- **Package Manager**: `npm` (comes bundled with Node.js)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/<your-username-or-org>/serbisyou-workspace.git
cd serbisyou-workspace
```

---

### Step 2: Configure Environment Variables

Both the frontend and backend require local `.env` files. Copy the provided `.env.example` templates:

#### Backend Setup:
```bash
cd backend
cp .env.example .env
```
*On Windows PowerShell:*
```powershell
cd backend
Copy-Item .env.example .env
```
Edit `backend/.env` with your actual Supabase credentials and Directus endpoints.

#### Frontend Setup:
```bash
cd ../frontend
cp .env.example .env
```
*On Windows PowerShell:*
```powershell
cd ../frontend
Copy-Item .env.example .env
```
Review `frontend/.env` (default API URL is `http://localhost:5000/api`).

---

### Step 3: Install Dependencies

Install dependencies for both projects:

#### Install Backend Dependencies:
```bash
cd ../backend
npm install
```

#### Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

---

### Step 4: Run Development Servers

Run the backend and frontend in separate terminal windows:

#### Terminal 1 — Backend API & WebSocket Server:
```bash
cd backend
npm run dev
```
*Server will start on: `http://localhost:5000` (Health check: `http://localhost:5000/health`)*

#### Terminal 2 — Frontend Application:
```bash
cd frontend
npm run dev
```
*Vite client will start on: `http://localhost:5173`*

---

## 👥 Team Contribution & Collaboration Guidelines

> [!IMPORTANT]
> **Strict Grading Requirements for Group Members:**
> - **Major Pushes**: Minimum of **2 Major Pushes** per member (significant features, modules, or architectural setups).
> - **Minor Pushes**: Minimum of **5 Minor Pushes** per member (bug fixes, UI polish, tests, small refactors, documentation updates).
> - **Instructor Access**: You **MUST** add the instructor as a collaborator on GitHub:
>   - **Instructor GitHub Username:** `noeldimailig`
>   - Grant `Write` access to ensure repository inspection and grade verification.

### Recommended Git Workflow

1. **Pull the latest `main` branch before starting work**:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a descriptive feature branch**:
   ```bash
   git checkout -b feature/auth-login
   # or
   git checkout -b feature/service-catalog
   ```
3. **Commit often with clear commit messages**:
   ```bash
   git add .
   git commit -m "feat(auth): implement student login with Supabase session"
   ```
4. **Push branch and open a Pull Request (PR)**:
   ```bash
   git push origin feature/auth-login
   ```

---

## 🗄️ Database & CMS Architecture

- **Supabase (PostgreSQL)**:
  - `Users` — Student profiles, roles (client/service provider), student ID, contact info.
  - `Services` — Gigs and skill offerings (category, price rate, portfolio links, availability).
  - `Service Transactions` — Bookings, order status (pending, in progress, completed, cancelled), payment confirmation.
  - `Service Requests` — Custom student requests / gig inquiries posted on the board.
- **Directus CMS**:
  - Headless CMS connected to Supabase for admin review, dispute resolution, service verification, and platform oversight.

---

## 📱 Progressive Web App (PWA) Capabilities

The frontend is configured with `@vite-pwa/plugin` / Workbox capabilities to ensure:
- Installable on mobile devices and desktop.
- Offline view of previously loaded service listings.
- Background sync readiness to queue chat messages or service requests when internet connectivity is intermittent.
