# Fiza Khan portfolio — notes for Claude

Static site for GitHub Pages (no build step, no frameworks). Fiza edits content herself on GitHub,
so keep everything data-driven and forgiving.

- `js/content.js` — all text and data (hero, projects, experience, skills, photos). Fiza edits this.
  Projects use her Notion format: summary (tile subtitle), tagline (emoji line), org/timeline/role,
  overview, problem, solution, process [label, text], impact. `[label](url)` links render via `rich()`.
- `js/main.js` — rendering + interactions: filters, look book/index views, project drawer,
  featured stack, experience accordion with per-role photos, film strip with Live Photo clips,
  lightbox, camera cursor + shutter flash, hero reel timecode. Validates content on load and reports
  slips through `window.siteProblem()` (defined inline in index.html, also catches syntax errors).
- `css/style.css` — palette tokens at top (white, forest green, rose, sky, sage). Later blocks override
  earlier ones (v2 camera hero is appended near the end).
- `assets/photos` full size, `assets/photos/sm` ~700px thumbs (optional, falls back to full),
  `assets/video` H.264 mp4s, `assets/docs` PDFs.

Media prep (Windows): HEIC/JPG → JPG via WPF imaging in PowerShell; video via ffmpeg (installed with winget);
iPhone video is HEVC and must be re-encoded to H.264. Keep each file under 15 MB (share-link limit).

Share links: `../versions/v1-editorial` and `../versions/v2-viewfinder` hold copies published as claude.ai
artifacts (`share.html` = index.html minus doc tags, with `SITE.embeds = false` and no download attrs).

Open TODOs are marked `// TODO` in content.js.
