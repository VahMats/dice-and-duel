import type { Feature, Localized } from "./types";

export const site = {
  /** Production URL, used for Open Graph and canonical links. TODO: replace with the real domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dice-and-duel.vercel.app",

  socials: {
    // TODO: replace with the real Telegram channel link.
    telegram: "https://t.me/TODO",
    // TODO: replace with the real Instagram profile link.
    instagram: "https://instagram.com/TODO",
    // TODO: handles shown on the Contacts cards, e.g. "@diceandduel".
    telegramHandle: "[TODO: @telegram]",
    instagramHandle: "[TODO: @instagram]",
  },

  venue: {
    name: { ru: "BARDAK PUB", hy: "BARDAK PUB" } satisfies Localized,
    address: {
      ru: "[АДРЕС: улица, дом, Ереван]",
      hy: "[ՀԱՍՑԵ: փողոց, շենք, Երևան]",
    } satisfies Localized,
    // TODO: replace with a link to the exact pin (Google Maps or Yandex Maps "Share" link).
    mapUrl: "https://www.google.com/maps/search/?api=1&query=BARDAK+PUB+Yerevan",
  },

  /** "What we do" blocks on the home page (3–4 items). */
  features: [
    {
      icon: "dices",
      title: { ru: "[ТЕКСТ: заголовок блока 1]", hy: "[ՏԵՔՍՏ: բլոկ 1-ի վերնագիր]" },
      text: { ru: "[ТЕКСТ: описание блока 1]", hy: "[ՏԵՔՍՏ: բլոկ 1-ի նկարագրություն]" },
    },
    {
      icon: "users",
      title: { ru: "[ТЕКСТ: заголовок блока 2]", hy: "[ՏԵՔՍՏ: բլոկ 2-ի վերնագիր]" },
      text: { ru: "[ТЕКСТ: описание блока 2]", hy: "[ՏԵՔՍՏ: բլոկ 2-ի նկարագրություն]" },
    },
    {
      icon: "swords",
      title: { ru: "[ТЕКСТ: заголовок блока 3]", hy: "[ՏԵՔՍՏ: բլոկ 3-ի վերնագիր]" },
      text: { ru: "[ТЕКСТ: описание блока 3]", hy: "[ՏԵՔՍՏ: բլոկ 3-ի նկարագրություն]" },
    },
    {
      icon: "beer",
      title: { ru: "[ТЕКСТ: заголовок блока 4]", hy: "[ՏԵՔՍՏ: բլոկ 4-ի վերնագիր]" },
      text: { ru: "[ТЕКСТ: описание блока 4]", hy: "[ՏԵՔՍՏ: բլոկ 4-ի նկարագրություն]" },
    },
  ] satisfies Feature[],

  /** About page story, one entry per paragraph. */
  story: [
    {
      ru: "[ТЕКСТ: история клуба — как всё началось]",
      hy: "[ՏԵՔՍՏ: ակումբի պատմությունը — ինչպես ամեն ինչ սկսվեց]",
    },
    {
      ru: "[ТЕКСТ: чем мы занимаемся сейчас и для кого наши вечера]",
      hy: "[ՏԵՔՍՏ: ինչով ենք զբաղվում հիմա և ում համար են մեր երեկոները]",
    },
  ] satisfies Localized[],
};
