# Paul Rojas — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and Motion.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app` — routes: home (`/`) and blog (`/blog`, `/blog/[slug]`)
- `src/components` — page sections (hero, selected work, capabilities, principles, about, blog preview, contact, footer)
- `src/lib/data.ts` — projects, capabilities, principles, tech stack, social links
- `src/lib/blog-posts.ts` — blog article content

## To do before shipping

- Add project screenshots to `public/images/projects/` (see the README there) and wire them into `selected-work.tsx`.
- Replace the placeholder email in `src/components/contact.tsx`.
- Add real LinkedIn / GitHub URLs in `src/lib/data.ts` (`SOCIAL_LINKS`).
- Optionally add a real portrait in the About section.
