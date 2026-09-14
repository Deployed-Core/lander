# Blog Handoff Process

When a new blog is handed off, the user provides files inside `blog-handoff/blog-N/`:

1. **An HTML file** — the full blog content with all text, figures, and structure
2. **A preview image** (`.png`) — used as the hero banner and OG/social preview

The user may upload these and simply say something like "added a new blog" or "new blog handoff". That is the trigger to run this entire process end-to-end without asking questions.

---

## Automated workflow — run all steps in order

### Step 1: Discover the handoff files

```bash
find blog-handoff/ -type d -name "blog-*" | sort | tail -1
```

Inside that folder, find:
- The `.html` file (the blog content)
- The `.png` / `.jpg` image file (the preview/banner)

Read both. If multiple image files exist, use the most recently modified one.

### Step 2: Extract content from the HTML

Read every element in the HTML body. Preserve ALL content — do not skip, summarise, or reword anything. Extract:

- **Title** — from `<h1>` or `<title>`
- **Description** — from `<meta name="description">` or the hero/deck paragraph
- **Author** — from the byline. Use `deployedTeam` (with `avatarImage: "/icon.jpeg"`) for "Deployed team" / "The Deployed team" posts. For named individuals, create a new author constant.
- **All body content** — every heading, paragraph, figure, table, diagram, list, quote, CTA, and closing section, in order

### Step 3: Copy the preview image to public assets

```bash
cp blog-handoff/blog-N/<image-file> public/assets/blog-<slug>-preview.png
```

If a preview image already exists at that path (e.g. the user uploaded a replacement), overwrite it. No code changes needed — the path stays the same.

### Step 4: Add the post to `src/data/posts.ts`

Insert the new post as the **first item** in the `posts` array so it becomes the featured post on `/blog`.

Required fields:

| Field | How to derive |
|---|---|
| `slug` | Kebab-case from title |
| `date` | Today's date, human-readable: `"14 Sept 2026"` |
| `isoDate` | Today's date, ISO 8601: `"2026-09-14"` |
| `title` | From the HTML `<h1>` |
| `tag` | `"Industry"` or `"Technology"` — match the content focus |
| `description` | From HTML meta description or hero deck text |
| `readingTime` | Word count ÷ 250, rounded |
| `author` | `deployedTeam` for team posts, or a new author constant |
| `gradient` | CSS linear-gradient as visual fallback (match blog's tone) |
| `coverImage` | `"/assets/blog-<slug>-preview.png"` |
| `content` | Array of `ContentBlock` — every element from the HTML |

### Step 5: Map HTML elements to ContentBlock types

**Every element in the handoff HTML must appear in the content array.** Use this mapping:

| HTML element | ContentBlock type |
|---|---|
| Section heading (`<h2>`) | `heading` — include `id` (kebab-case) for ToC/anchor linking |
| Sub-heading (`<h3>`) | `subheading` — include `id` |
| Body paragraph | `paragraph` — set `lead: true` for the first intro/deck paragraph |
| Blockquote with attribution | `quote` |
| Bulleted or ordered list | `list` |
| Pull-quote (border-left styled) | `pull-quote` |
| Small note/disclaimer | `example-note` |
| State transition / flow diagram | `figure-transition` |
| Numbered step sequence | `figure-strategy` |
| Before/after panel comparison | `figure-workflow` |
| Phase/journey timeline | `figure-journey` — with optional `checkpoint` |
| Data table | `figure-metrics` — with optional `valueRule` |
| Grid of items (2×2 etc.) | `figure-ownership` |
| Closing section with quote | `closing-block` |
| Final invitation/CTA | `invitation` |

**If the HTML contains a structure not covered above:**
1. Add a new variant to the `ContentBlock` union type in `src/data/posts.ts`
2. Add a `case` to the switch in `src/components/BlogPostClient.tsx`
3. Style it using ONLY the site's design tokens (see Step 6)
4. Add responsive CSS in the `<style>` block for the new block type

### Step 6: Styling rules

**Use ONLY the site's CSS custom properties.** Never carry over inline styles or CSS from the handoff HTML. Key tokens:

- Colors: `var(--blue-050)` through `var(--blue-950)`, `var(--paper-000)`, `var(--paper-050)`
- Surfaces: `var(--surface-page)`, `var(--surface-card)`, `var(--surface-accent-soft)`
- Text: `var(--text-strong)`, `var(--text-body)`, `var(--text-muted)`, `var(--text-faint)`
- Typography: `var(--display-1/2/3)`, `var(--heading-1/2/3)`, `var(--body-lg/md/sm)`, `var(--eyebrow)`, `var(--label)`, `var(--font-display)`, `var(--font-ui)`
- Spacing: `var(--space-1)` through `var(--space-32)`, `var(--gutter)`
- Borders: `var(--border-hairline)`, `var(--border-subtle)`
- Radii: `var(--radius-sm/md/lg/pill)`

### Step 7: Formatting rules

- **Strip figure numbers** — remove "Fig. 01 /", "Fig. 02 /", etc. from labels. Keep only the descriptive text.
- **Author avatar** — if author has `avatarImage`, the renderer shows the image; otherwise shows `avatar` initials.
- **No content rewording** — text must match the handoff HTML exactly.

### Step 8: Start the dev server and verify

Run all of the following checks. Do not report done until every check passes.

```bash
# 1. Type-check
npx tsc --noEmit

# 2. Start dev server (note the port)
npm run dev &
# Wait for "Ready" message, note the PORT

# 3. HTTP status checks
curl -s -o /dev/null -w "%{http_code}" http://localhost:PORT/blog
curl -s -o /dev/null -w "%{http_code}" http://localhost:PORT/blog/<slug>
# Both must return 200

# 4. Screenshot — blog listing (featured card shows cover image)
npx playwright screenshot --full-page --viewport-size="1280,900" http://localhost:PORT/blog /tmp/blog-listing.png

# 5. Screenshot — blog post hero (cover image banner)
npx playwright screenshot --viewport-size="1280,900" http://localhost:PORT/blog/<slug> /tmp/blog-post-top.png

# 6. Screenshot — full blog post (verify ALL elements present)
npx playwright screenshot --full-page --viewport-size="1280,900" http://localhost:PORT/blog/<slug> /tmp/blog-post-full.png

# 7. Screenshot — mobile responsiveness
npx playwright screenshot --full-page --viewport-size="375,812" http://localhost:PORT/blog/<slug> /tmp/blog-post-mobile.png

# 8. Verify OG / social meta tags
curl -s http://localhost:PORT/blog/<slug> | grep -oP '<meta[^>]*(og:|twitter:|article:)[^>]*>'
# Must have: og:title, og:description, og:url, og:image (cover image path),
#            og:type=article, og:image:width=1200, og:image:height=630,
#            twitter:card=summary_large_image, twitter:title, twitter:description, twitter:image,
#            article:published_time, article:author, article:tag

# 9. Verify share links
curl -s http://localhost:PORT/blog/<slug> | grep -oP '(linkedin\.com/sharing|twitter\.com/intent)[^"]*'
# Must contain https://deployed.md/blog/<slug> (not localhost)
```

**View every screenshot** to confirm:
- Blog listing: new post is the featured card with cover image; also appears in the grid
- Blog post: hero banner shows the uploaded preview image (not a gradient fallback)
- Full page: every heading, paragraph, figure, table, diagram, quote, list, CTA from the handoff HTML is rendered
- Mobile: all figures collapse/stack properly, no horizontal overflow, text is readable

### Step 9: If the user uploads a replacement image

Just overwrite the file at `public/assets/blog-<slug>-preview.png` and re-screenshot to confirm. No code changes needed.

---

## Project structure

| Path | Purpose |
|---|---|
| `src/data/posts.ts` | `ContentBlock` type, `BlogPost` interface, author constants, posts array, helper functions |
| `src/components/BlogPostClient.tsx` | Blog post renderer — switch over block types + responsive CSS |
| `src/app/blog/page.tsx` | Blog listing — featured card + scrolling grid (uses `coverImage` for thumbnails) |
| `src/app/blog/[slug]/page.tsx` | Blog post route — SEO metadata, OG tags, JSON-LD (uses `coverImage` for og:image) |
| `public/assets/` | Static images — cover images, icons, logos, textures |
| `src/app/layout.tsx` | `metadataBase` set to `https://deployed.md` (resolves relative OG image URLs in production) |
| `blog-handoff/` | Staging area for handoff files (not deployed) |
