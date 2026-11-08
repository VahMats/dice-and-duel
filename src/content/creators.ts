import type { Creator } from "./types";

/** Team members, shown on the home page and the About page. */
export const creators: Creator[] = [
  {
    id: "creator-1",
    name: { ru: "[ИМЯ]", hy: "[ԱՆՈՒՆ]" },
    role: { ru: "[РОЛЬ]", hy: "[ԴԵՐ]" },
    bio: { ru: "[ТЕКСТ: пара слов о себе]", hy: "[ՏԵՔՍՏ: մի քանի խոսք իր մասին]" },
    photo: undefined, // TODO: "/creators/name.jpg"
    instagram: undefined, // TODO: "https://instagram.com/username"
    telegram: undefined, // TODO: "https://t.me/username"
  },
  {
    id: "creator-2",
    name: { ru: "[ИМЯ]", hy: "[ԱՆՈՒՆ]" },
    role: { ru: "[РОЛЬ]", hy: "[ԴԵՐ]" },
    bio: { ru: "[ТЕКСТ: пара слов о себе]", hy: "[ՏԵՔՍՏ: մի քանի խոսք իր մասին]" },
    photo: undefined, // TODO
    instagram: undefined, // TODO
    telegram: undefined, // TODO
  },
];
