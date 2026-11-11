# Website Photo Drop Folder (`public/images/`)

Drop any `.jpg`, `.jpeg`, `.png`, or `.webp` photos into this `public/images/` folder!

Because this folder is inside `public/`, any file you put here is automatically served at `/images/<filename>` on the website.

---

## Quick Reference: Homepage Main Photos

If you name your photos with these exact filenames and drop them into `public/images/`, you can reference them in `src/data/siteConfig.ts` under `SITE_CONFIG.images`:

1. **Main Page Hero Background Picture:**
   - Drop your photo here as: `public/images/hero-bg.jpg`
   - In `src/data/siteConfig.ts`, change `heroBarInterior` to `'/images/hero-bg.jpg'`

2. **"Welcome to Kirkwood Ice & Fuel" Section Picture:**
   - Drop your photo here as: `public/images/welcome-bar.jpg`
   - In `src/data/siteConfig.ts`, change `welcomeBarAtmosphere` to `'/images/welcome-bar.jpg'`

3. **"Enjoy the Patio" Section Picture:**
   - Drop your photo here as: `public/images/patio.jpg`
   - In `src/data/siteConfig.ts`, change `patioFeature` to `'/images/patio.jpg'`

---

## Subfolders Included for Organization
- `public/images/` — Main homepage hero, welcome section, and patio photos
- `public/images/menu/` — Photos for menu highlights (`/images/menu/your-photo.jpg`)
- `public/images/gallery/` — Photos for the Photo Gallery page (`/images/gallery/your-photo.jpg`)
