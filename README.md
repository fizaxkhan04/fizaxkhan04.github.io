# Fiza Khan — Portfolio

Plain HTML/CSS/JS with no build step, so it loads fast and GitHub Pages serves it as-is.

```
index.html          page structure
css/style.css       all styling (colors at the top under :root)
js/content.js       ALL text, projects, experience, photos  ← edit this
js/main.js          interactions (filters, drawer, film strip, lightbox)
assets/             résumé PDF + photos
```

## Editing it yourself on GitHub (no coding)
All the words on the site live in one file: `js/content.js`.
1. On github.com, open your repo → `js` → `content.js`.
2. Click the **pencil icon** (Edit this file).
3. Change the text between the "quotes". Use the search box (Ctrl+F) to find what you want.
4. Click **Commit changes**. The live site updates in about a minute.
   Browsers can keep an old copy of `content.js` for up to 10 minutes. To see your change right away,
   press **Ctrl+Shift+R** on the site. To make every visitor get it at once, also open `index.html` and
   change the `?v=` number at the end of `js/content.js?v=...` (any new number works).

What you'll find there, from the top:
- **Hero:** `tagline` (under your name), `intro` (the sentence below the video, with other options listed), `status` (graduating line).
- **Projects:** each one has `summary` (the tile subtitle), `tagline` (the emoji line),
  and `overview`, `problem`, `solution`, `process`, `impact`, just like your Notion pages.
  Links work the Notion way: `[UN SDGs](https://...)`.
- **Experience**, **skills**, **honors** and **photos** follow.

**Adding a project:** scroll to the end of the projects list in `content.js`. There's a
**NEW PROJECT TEMPLATE**: copy the block from `{` to `},`, paste it above the template, fill it in.
**Deleting a project:** delete its whole block from `{` to `},`. If its id is also listed in
`featured` (top of the file) or as `project:` on an Experience entry, remove it there too.
**Reordering:** move whole blocks; tiles show in the order they're listed.

**If an edit breaks something**, the site shows a pink box saying which line or project to fix
(for example "content.js, line 212" or "featured: "sdg" isn't the id of any project").
Fix it, or open the file's **History** on GitHub and undo your last change.
One small change per commit makes this easy.

To add images or PDFs: in the repo open `assets/photos` (or `assets/docs`) → **Add file → Upload files**,
then use the file name (without `.jpg`) in `content.js`. A smaller copy in `assets/photos/sm/`
with the same name makes the tiles load faster, but it's optional.

## Editing content
Everything is in `js/content.js`. Search for `TODO` to find the spots that still need you.

- **Add a project:** copy one `{ ... }` block in `projects` and change the fields.
  `cat` controls the filters (`"data"`, `"marketing"`, `"video"`).
- **Add a video:** in that project, set
  `embed: { kind: "youtube", id: "VIDEO_ID" }` or `embed: { kind: "drive", id: "FILE_ID" }`.
  Drive files must be shared as "Anyone with the link".
- **Add photos:** put JPGs in `assets/photos/` (about 1600px wide max, ~80% quality),
  then add a line to `photos` with `src`, `caption`, `w`, `h`.
- **Add a clip to the film strip:** iPhone videos are HEVC, which many browsers can't play,
  so convert them to H.264 first (ffmpeg is installed). Run this in PowerShell from this folder:
  ```
  ffmpeg -i "C:\path\IMG_1234.MOV" -an -vf "scale=-2:854,fps=30" -c:v libx264 -pix_fmt yuv420p -crf 28 -preset slow -movflags +faststart assets\video\img_1234.mp4
  ffmpeg -ss 1 -i "C:\path\IMG_1234.MOV" -frames:v 1 -vf "scale=-2:1600" -q:v 4 assets\photos\img_1234.jpg
  ffmpeg -ss 1 -i "C:\path\IMG_1234.MOV" -frames:v 1 -vf "scale=-2:700"  -q:v 5 assets\photos\sm\img_1234.jpg
  ```
  Then add `{ file: "img_1234", shape: "v", caption: "...", video: "img_1234.mp4", film: true }` to `photos`.
  For a Live Photo, use its photo's entry and just add `video: "img_1234.mp4"` (no `film`).
  Aim for clips under ~4 MB each.
- **Update résumé:** replace `assets/Fiza-Khan-Resume.pdf`, keeping the same name.

Projects have shareable links: `yoursite/#p/emissions` opens that project directly.

## Publishing on GitHub Pages
1. A GitHub *user site* must live in a repo named exactly `<username>.github.io`.
   Your account is `fizaxkhan04`, so the address would be **fizaxkhan04.github.io**.
   For **fizakhan.github.io**, the account itself must be called `fizakhan`
   (rename it in GitHub → Settings → Account, if the name is free).
2. Create a public repo named `<username>.github.io`.
3. Click **uploading an existing file**, then drag in everything inside this folder
   (index.html, css, js, assets, .nojekyll) and commit.
4. Go to Settings → Pages and make sure the source is the `main` branch, root folder.
   The site goes live in a minute or two.
