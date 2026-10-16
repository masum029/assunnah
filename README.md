# Madrasatu Sunnah — Next.js frontend recreation

## Run locally
1. Install Node.js LTS. 2. Extract/open in VS Code. 3. Run `npm install`. 4. Run `npm run dev`. 5. Open http://localhost:3000.

## Included
- Refined homepage based on publicly indexed source content
- Responsive shared header, dropdown navigation and footer
- JSON-driven homepage, navigation, notices, branch details and content pages
- Public route renderer driven by `src/data/pages.json`
- Contact form UI (not connected to a backend)

## Data files
- `src/data/homepage.json`: site details, navigation, homepage sections, announcements, branches and footer links
- `src/data/pages.json`: page routes and content
- `src/data/assets.json`: identified image URLs and verification status

## Images
The original page identifies `https://madrasatussunnah.org/images/ins_bg.webp`, `https://madrasatussunnah.org/images/Shaykh%20Ahmadullah.webp`, and `https://madrasatussunnah.org/assets/madrasatus-sunnah-logo.svg`. Direct image requests in the inspection environment returned an anti-bot verification page. The URL references are identified, but successful image download/display is not confirmed. If unavailable in your browser, use authorized local files in `public/assets/images/`.

## Route coverage and limits
The route inventory includes about, chairman message, goals, campus, syllabus, academic calendar, teachers, admission pages, gallery, video, career, FAQ, contact, branch listing and branch details, notices and feature detail pages. This is not a guarantee that every possible original URL has been discovered. Several long-form pages are summarized where complete text was not verified. The original backend and working form submission are not included. No production build or pixel-perfect screenshot comparison has been executed in this environment.
