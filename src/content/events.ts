import type { GameEvent, Localized } from "./types";

const bardak: Localized = { ru: "BARDAK PUB", hy: "BARDAK PUB" };

/**
 * Game evenings. Order doesn't matter: the site sorts by date and splits
 * them into upcoming and past automatically (Yerevan time).
 */
export const events: GameEvent[] = [
  // ПРИМЕР — замените на реальный вечер или удалите.
  {
    id: "2026-11-10",
    date: "2026-11-10",
    time: "21:00",
    title: { ru: "[ТЕКСТ: название вечера]", hy: "[ՏԵՔՍՏ: երեկոյի անվանումը]" },
    gameIds: ["catan", "bang", "skyjo"], // TODO: real games for this evening
    venue: bardak,
    entry: { ru: "[ЦЕНА: стоимость входа]", hy: "[ԳԻՆ: մուտքի արժեքը]" },
    posterImage: undefined, // TODO: "/posters/2026-11-10.jpg"
  },
  // ПРИМЕР прошедшего вечера — замените или удалите.
  {
    id: "2026-11-03",
    date: "2026-11-03",
    time: "21:00",
    title: { ru: "[ТЕКСТ: название вечера]", hy: "[ՏԵՔՍՏ: երեկոյի անվանումը]" },
    gameIds: ["flip-7", "trio", "spicy"], // TODO
    venue: bardak,
    entry: { ru: "[ЦЕНА: стоимость входа]", hy: "[ԳԻՆ: մուտքի արժեքը]" },
  },
];
