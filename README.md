# NeoFox Media Landing Page (PHP Edition)

A PHP-powered landing page and content admin inspired by [neofoxmedia.webflow.io](http://neofoxmedia.webflow.io) with section structure and storytelling based on [neuroidmedia.com](https://www.neuroidmedia.com). The site reads content from `data/content.json` on every request, so updates you make through the admin immediately appear on the public page.

## Project layout

```
├── index.php          # Public landing page rendered from data/content.json
├── admin.php          # Browser-based content editor
├── api/
│   └── content.php    # JSON API for loading and saving content
├── assets/
│   ├── styles.css     # Shared styles for landing + admin views
│   └── admin.js       # Dynamic admin form builder
└── data/
    └── content.json   # Editable content store (keep write permissions enabled)
```

## Running locally

1. Ensure you have PHP 8.0+ installed.
2. From the project root, launch the built-in PHP server:

   ```bash
   php -S localhost:8000
   ```

3. Visit [http://localhost:8000/index.php](http://localhost:8000/index.php) to view the landing page and [http://localhost:8000/admin.php](http://localhost:8000/admin.php) to edit content. All changes are persisted to `data/content.json`.

## Deploying to shared hosting (e.g. Bluehost cPanel)

1. Upload the entire project folder to your hosting account (typically inside the `public_html` directory).
2. Make sure the `data` directory and `data/content.json` are writable by PHP (set permissions to `755` for the folder and `644` or `664` for the file as required by your host).
3. Access the landing page at `https://yourdomain.com/index.php` and the editor at `https://yourdomain.com/admin.php`.
4. Optionally add password protection to `admin.php` via cPanel's Directory Privacy or a custom authentication layer.

## Customisation tips

- Use the admin interface to swap hero copy, services, case studies, testimonials, CTA details, and contact fields.
- Update media URLs to point at assets hosted on your CDN or within your Bluehost file manager.
- Adjust typography, colours, or layout inside `assets/styles.css` to further align with your brand.
