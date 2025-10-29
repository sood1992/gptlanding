# NeoFox Media Landing Page

A Node.js + vanilla JavaScript implementation of a NeuroID-inspired landing page that mirrors the design language from [neofoxmedia.webflow.io](http://neofoxmedia.webflow.io). The page is powered by JSON content with an accompanying admin panel for managing copy, media and CTAs.

## Features

- Responsive, Webflow-style landing page with hero video, client logos, services, case studies, testimonials, approach, CTA, and contact sections.
- Content-driven architecture backed by `data/content.json` so updates instantly reflect on the public site.
- Admin dashboard (`/admin`) for editing SEO metadata, navigation links, hero copy, case studies, testimonials, contact form fields, and footer links.
- Simple Express API (`GET /api/content`, `PUT /api/content`) that persists changes to disk without a database dependency.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the server:

   ```bash
   npm start
   ```

3. Open the landing page at [http://localhost:3000](http://localhost:3000) or visit [http://localhost:3000/admin](http://localhost:3000/admin) to manage content.

All content edits are saved to `data/content.json`. Commit this file to preserve updates across environments.

## Customisation tips

- Replace image and video URLs in the admin panel with your own hosted assets.
- Update `contact.formAction` to point to your preferred form handler (Formspree, Webflow, Make, etc.).
- Extend the Express server with authentication or file uploads if you need richer admin capabilities.
