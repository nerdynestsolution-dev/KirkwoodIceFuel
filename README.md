# Kirkwood Ice & Fuel — Official Website & Owner Admin Portal

A modern, mobile-first, SEO-optimized website and content management portal for **Kirkwood Ice & Fuel** (`215 N Kirkwood Rd, Kirkwood, MO 63122`), built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Lucide Icons**, ready for **Cloudflare Pages** deployment.

> *"Our Goal is the same as yours - We want you to have a good meal at a fair price, while sharing time."*

---

## 1. Key Features & Architecture

- **6 Public Destinations + Direct Online Ordering:**
  1. **Home (`/`)**: Hero with direct 569Dine ordering & menu CTAs, Welcome story & official brand statement, Menu Highlights, Weekly Specials preview, Upcoming Events preview, Outdoor Patio spotlight, Photo Gallery preview, and Visit Us section with interactive map.
  2. **Menu & Drinks (`/menu`)**: Complete, verified food menu and prices from the official 569Dine ordering menu, organized into sticky category tabs (`Appetizers & Wings`, `Charbroiled Burgers`, `Sandwiches & Melts`, `Tacos, Quesadillas & Wraps`, `Soups & Salads`, `Entrees, Kids & Sides`, and `Beer, Cocktails & Full Bar`) with instant search.
  3. **Specials (`/specials`)**: Recurring weekly food & drink specials manageable via `/admin`, with day-of-the-week filters (`Monday`–`Sunday`, `Featured`). Uses clearly labeled placeholder entries until the owner inputs live specials.
  4. **Events (`/events`)**: Chronological upcoming events and watch parties, automatic past-event archiving, and an interactive sample card format preview.
  5. **Photo Gallery (`/gallery`)**: Category-filtered responsive photo grid (`Food & Drinks`, `Bar & Atmosphere`, `Outdoor Patio`, `Events`) with a keyboard-accessible full-screen lightbox.
  6. **Hours & Location (`/hours-location`)**: Published bar hours, clearly labeled kitchen hours placeholder, phone verification flag, outdoor patio & payment details, and embedded Google Maps directions.
- **Secure Owner Admin Dashboard (`/admin`)**:
  - Powered by **Supabase Auth**, **Supabase PostgreSQL**, **Row Level Security (RLS)**, and **Supabase Storage**.
  - Full CRUD for **Weekly Specials** (day of week, title, description, price, details, display order, active toggle, featured toggle) and **Events** (title, date, start time, category, description, image upload/preset selector, publish/unpublish toggle, featured toggle).
- **Local SEO & Structured Data**:
  - Dynamic per-page `<title>`, `<meta name="description">`, canonical URLs, Open Graph tags, `public/sitemap.xml`, `public/robots.txt`, and `BarOrPub` + `Restaurant` JSON-LD schema targeting Kirkwood, MO and St. Louis County.

---

## 2. Local Development Setup

### Prerequisites
- Node.js 18+ and npm

### Install & Run
```bash
# 1. Install dependencies
npm install

# 2. Copy the example environment variables file
cp .env.example .env

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

---

## 3. Environment Variables

Create a `.env` file in the project root (or configure in Cloudflare Pages):

| Variable | Required | Description |
| :--- | :---: | :--- |
| `VITE_SUPABASE_URL` | Yes (for live Admin/DB) | Your Supabase Project URL (e.g. `https://xyzcompany.supabase.co`), found via the top **Connect** button or under **Project Settings &rarr; Data API** |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes (for live Admin/DB) | Your Supabase **Publishable Key** (`sb_publishable_...`), found under **Project Settings &rarr; API Keys** *(legacy `VITE_SUPABASE_ANON_KEY` is also supported as a fallback)* |
| `VITE_SITE_URL` | Optional | Canonical production domain (defaults to `https://kirkwood-ice-and-fuel.pages.dev`) |

> **Security Note:** Never expose a Supabase **Secret Key** (`sb_secret_...`) or legacy `service_role` key in `.env` or any client-side code. Access control is enforced on the database via PostgreSQL Row Level Security (RLS).

---

## 4. Supabase Database & Auth Setup

1. Create a new project at [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor** in your Supabase dashboard, paste the contents of [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql), and click **Run**.
   - This creates the `specials`, `events`, and `admin_profiles` tables, configures Row Level Security (RLS) policies, sets up the `site-media` public Storage bucket for event images, and seeds clearly labeled placeholder specials.
3. Go to **Authentication &rarr; Users &rarr; Add User &rarr; Create New User** and enter the restaurant owner's email address and password (check *Auto Confirm User*).
4. *(Optional Strict Whitelist)*: Insert the owner's user UUID and email into `public.admin_profiles` so only whitelisted accounts can modify data even if other users authenticate.
5. Copy your **Project URL** and **Publishable Key**:
   - **Project URL (`VITE_SUPABASE_URL`):** Click the **Connect** button in the top header bar of your Supabase Dashboard (or go to **Project Settings &rarr; Data API**).
   - **Publishable Key (`VITE_SUPABASE_PUBLISHABLE_KEY`):** Go to **Project Settings &rarr; API Keys** and copy the **Publishable key** (`sb_publishable_...`).

---

## 5. Cloudflare Pages Deployment Instructions

This repository is pre-configured for **Cloudflare Pages** with SPA routing support via [`public/_redirects`](./public/_redirects).

### Option A: Git Integration (Recommended)
1. Push this project to a GitHub or GitLab repository.
2. Log in to the **Cloudflare Dashboard &rarr; Workers & Pages &rarr; Create Application &rarr; Pages &rarr; Connect to Git**.
3. Use the following build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `18` or `20`
4. Under **Environment variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SITE_URL` (your production URL)
5. Click **Save and Deploy**.

### Option B: Direct Wrangler CLI Upload
```bash
npm run build
npx wrangler pages deploy dist --project-name=kirkwood-ice-and-fuel
```

---

## 6. Owner Maintenance Guide (Updating Photos, Menu Prices & Hours)

- **Updating Weekly Specials & Events (No Code Required):**
  Visit `/admin`, sign in with your owner credentials, and use the visual forms to add, edit, reorder, enable/disable, or delete recurring specials and events.
- **Updating Business Hours, Kitchen Hours, Phone Number, or Placeholder Photos:**
  Edit [`src/data/siteConfig.ts`](./src/data/siteConfig.ts). All pages, headers, footers, and SEO structured data read from this single file.
- **Updating Menu Items & Prices:**
  Edit [`src/data/menuData.ts`](./src/data/menuData.ts), which mirrors the verified 569Dine menu categories and items.
