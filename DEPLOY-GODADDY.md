# Deploy to GoDaddy cPanel

## Quick deploy (recommended)

From the project root, run:

```bash
npm run deploy
```

This will:

1. Run `npm run build` (create the `dist` folder).
2. Create **godaddy-deploy.zip** in the project root with the contents of `dist`.

Then in cPanel:

1. Go to **File Manager** → **public_html**.
2. Upload **godaddy-deploy.zip** into `public_html`.
3. Right‑click the zip → **Extract**.
4. Delete **godaddy-deploy.zip** from `public_html` after extraction.

Your site and contact form will be live at your domain.

---

## Manual deploy (without zip)

1. **Build:**
   ```bash
   npm run build
   ```
2. In cPanel **File Manager**, open **public_html**.
3. Upload **everything inside** the `dist` folder (not the `dist` folder itself):
   - **index.html**
   - **.htaccess**
   - **send-inquiry.php**
   - **assets/** (folder)
   - **Logo.png**, **IMG/**, **Team/**, **portfolio/**, **services/** (and any other files/folders from `dist`).

Or use **FTP** (e.g. FileZilla): connect to your hosting account and upload the contents of `dist` into `public_html`.

---

## Critical files

| File / folder      | Purpose |
|--------------------|--------|
| **.htaccess**      | SPA routing: `/about`, `/asan`, `/contact`, etc. load `index.html`. Without it, direct links or refresh on those URLs return 404. |
| **send-inquiry.php** | Contact form: sends submissions to **info@seedrix.co**. Must be in the same directory as `index.html`. |
| **index.html**     | Entry point. |
| **assets/**        | JS and CSS bundles. |

---

## After deployment

- **Site:** Open `https://yourdomain.com` — home page should load.
- **Routes:** Open `https://yourdomain.com/about` or `https://yourdomain.com/contact` — same app, no 404.
- **Contact form:** Fill and submit the “Let’s Work Together” form — check **info@seedrix.co** for the email.

---

## Re-deploy after changes

Run `npm run deploy` again, then upload the new **godaddy-deploy.zip** to `public_html`, extract (overwrite when prompted), and remove the zip file.

---

## Subfolder or subdomain

If the site should run in a subfolder (e.g. `yourdomain.com/site`) or you use a different document root, set the `base` option in `vite.config.ts` to that path, then run `npm run build` (or `npm run deploy`) again before uploading.
