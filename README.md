# Dice and Duel — website

Website of **Dice and Duel**, a board game club in Yerevan.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · no backend.

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /ru
npm run build    # production build (run before pushing)
npm run lint
```

Deploy: import the repo in Vercel and set `NEXT_PUBLIC_SITE_URL` to the real domain
(used for Open Graph and canonical links).

## Where things live

| What | File |
|---|---|
| Events | `src/content/events.ts` |
| Games | `src/content/games.ts` |
| Team | `src/content/creators.ts` |
| Socials, venue, "What we do" blocks, About story | `src/content/site.ts` |
| Interface text (buttons, headings) | `src/i18n/ru.ts`, `src/i18n/hy.ts` |
| Images | `public/games/`, `public/creators/`, `public/posters/` |
| Logo | `public/logo.png` (badge), `public/logo-round.png` (round) |
| Favicon / Open Graph image | `src/app/[locale]/icon.png`, `apple-icon.png`, `opengraph-image.png` |

All text in content files is written in both languages: `{ ru: "…", hy: "…" }`.
TypeScript will refuse to build if one language is missing — that's intentional.

To see everything that still needs real content:

```bash
grep -rn "TODO\|\[ТЕКСТ\|\[ИМЯ\|\[РОЛЬ\|\[ЦЕНА\|\[АДРЕС" src/content
```

## Add an event

Open `src/content/events.ts` and add an object to the `events` array:

```ts
{
  id: "2026-11-17",              // unique, usually the date
  date: "2026-11-17",            // YYYY-MM-DD, Yerevan time
  time: "21:00",                 // HH:MM, 24-hour
  title: { ru: "Вечер пати-игр", hy: "Փարթի խաղերի երեկո" },
  gameIds: ["bang", "spicy"],    // ids from games.ts
  venue: { ru: "BARDAK PUB", hy: "BARDAK PUB" },
  entry: { ru: "…", hy: "…" },   // optional
  posterImage: "/posters/2026-11-17.jpg", // optional, put the file in public/posters/
},
```

Order doesn't matter. The site sorts by date and moves an event to "Past"
the day after it happens (checked about once an hour, Yerevan time — no redeploy needed).
The home page shows the next 3.

## Add a game

Open `src/content/games.ts` and add an object to `games` (the array order is the display order;
the first 8 appear on the home page):

```ts
{
  id: "codenames",               // lowercase, dashes; used in links /ru/games#codenames
  name: "Codenames",
  nameRu: "Кодовые имена",       // optional
  players: { min: 2, max: 8 },
  playTimeMin: 15,
  age: 14,                       // optional
  types: ["party", "card"],      // party | card | strategy | family | deckbuilding | bluff
  description: { ru: "…", hy: "…" },
  image: "/games/codenames.jpg", // optional, put the file in public/games/
  bggUrl: "https://boardgamegeek.com/boardgame/178900/codenames", // optional
},
```

Without `image` the card shows a parchment placeholder; without `bggUrl` the
BoardGameGeek link opens a search for the game name.
If you don't know `players` or `playTimeMin` yet, write `TODO` — the card shows "—".

To add a new game type, add it to `GAME_TYPES` in `src/content/types.ts`, give it a colour in
`src/components/Tags.tsx` and a name in `games.typeNames` in both `src/i18n/*.ts`.

## Add a creator

Open `src/content/creators.ts` and add:

```ts
{
  id: "anna",
  name: { ru: "Анна", hy: "Աննա" },
  role: { ru: "Ведущая", hy: "Վարող" },
  bio: { ru: "…", hy: "…" },
  photo: "/creators/anna.jpg",            // optional, square works best
  instagram: "https://instagram.com/…",  // optional
  telegram: "https://t.me/…",            // optional
},
```

## Adding English later

1. `src/i18n/config.ts`: add `"en"` to `locales`, `intlLocales`, `localeLabels`.
2. Create `src/i18n/en.ts` (copy `hy.ts`, type it as `Dictionary`) and register it in `src/i18n/index.ts`.
3. `src/content/types.ts`: change `Localized` to `{ ru: string; hy: string; en: string }` —
   the build will then list every content entry that needs an English translation.

## Design notes

- Colours, fonts and the copper double frame are defined in `src/app/globals.css` (`@theme`).
- Fonts: Cinzel is Latin-only and used **only** for the "Dice and Duel" wordmark.
  Headings use Cormorant SC (Cyrillic) + Noto Serif Armenian; body uses Noto Sans + Noto Sans Armenian.
- Copper `#C0662B` is for lines only; text uses light copper or parchment to keep contrast ≥ 4.5:1.
