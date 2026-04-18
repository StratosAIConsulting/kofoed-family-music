# Kofoed Family Music — Website

Single-page responsive site. No framework, no build step. Three files + an `img/` folder.

---

## File Structure

```
/
├── index.html       — Full site structure (all sections)
├── styles.css       — Design system + responsive layout
├── script.js        — Nav, scroll reveal, mobile menu, form validation
├── img/             — Cropped assets from original site screenshots
│   ├── hero-bg.jpg
│   ├── when-i-pray.jpg
│   ├── connection-album.jpg
│   ├── kimberly-portrait.jpg
│   ├── single-*.jpg  (10 singles)
│   └── band-photo.jpg
└── README.md
```

---

## Swapping in Real Assets

Search the HTML for `<!-- REPLACE:` comments. Every placeholder is labelled.

### Images

| File to replace | What it is |
|---|---|
| `img/hero-bg.jpg` | Full-bleed hero background — swap for a high-res cinematic band/landscape photo (min 1920×1080) |
| `img/kimberly-portrait.jpg` | Portrait in the About section — swap for a clean editorial photo of Kimberly |
| `img/when-i-pray.jpg` | "When I Pray For You" single art |
| `img/single-*.jpg` | Individual single/album artwork (one file per song) |
| `img/connection-album.jpg` | Connection album cover |
| `img/favicon.ico` | Browser tab icon — create from brand mark |

All images are currently cropped from the original site screenshots (low-res). Replace with high-res originals before launch.

### Spotify

1. Find the Spotify track ID for "When I Pray For You" — it's the string after `/track/` in the Spotify URL.
2. In `index.html`, replace every occurrence of `PLACEHOLDER_TRACK_ID` with the real ID.
3. Replace `PLACEHOLDER_ARTIST_ID` in the Spotify artist links with the real Spotify artist ID.

### YouTube

1. Find the YouTube video ID for each video — it's the string after `?v=` or `/shorts/` in the URL.
2. Replace `VIDEO_ID_RESCUED_ME`, `VIDEO_ID_2`, `VIDEO_ID_3`, `VIDEO_ID_4` with real IDs.

### Email / Mailing List

The form currently uses a `mailto:` fallback. To connect to Mailchimp or ConvertKit:

**Mailchimp:**
1. Go to Audience → Signup forms → Embedded forms → Generate code.
2. Copy the `action` URL from the generated `<form>` tag (looks like `https://yourdomain.us21.list-manage.com/subscribe/post?u=XXX&id=YYY`).
3. Replace the form's `action` attribute in `index.html` and change `method` to `post`.
4. In `script.js`, replace the `mailto:` submit handler with a `fetch()` POST to that URL.

**ConvertKit:**
1. Go to Landing Pages & Forms → select form → Embed → HTML.
2. Copy the form action URL and field names, then update `index.html` and `script.js` similarly.

### Show Dates

Replace the three placeholder `<li class="show-row">` entries in the `#shows` section with real dates, venues, cities, and ticket URLs. If the show list is empty, remove the `<ul>` and uncomment the `.shows-empty` paragraph instead.

### Social URLs

Update every `href` marked `<!-- REPLACE -->` in the `<footer>` with real profile URLs for:
- Spotify (artist page)
- Apple Music (artist page)
- YouTube channel
- Instagram
- Facebook
- TikTok

---

## Recommended Next Steps

1. **Real photography** — The single highest-ROI upgrade. A moody, high-res hero photo transforms the whole site. Consider a professional shoot in an outdoor/natural setting.
2. **Smart link** — Set up [Linkfire](https://linkfire.com) or [Feature.fm](https://feature.fm) and replace the "Listen Everywhere" button href. These aggregate all streaming platforms in one link.
3. **Email platform** — Connect the signup form to Mailchimp or ConvertKit before launch so subscriber data is captured properly.
4. **Domain** — This is a static site — deploy to [Netlify](https://netlify.com) or [Vercel](https://vercel.com) with a drag-and-drop deploy, then point `kofoedfamilymusic.com` DNS to it.
5. **About page** — Build `/about/index.html` for the full story; the "Read our full story →" link is already wired.
6. **`/about` page** — The "Read our full story →" link points to `/about`. Build that page when ready.
7. **Analytics** — Add a `<script>` for Plausible or Fathom (privacy-first) before the closing `</body>` tag.
