/** Text in every site language. Add `en: string` here when English is added. */
export type Localized = { ru: string; hy: string };

/**
 * Marker for values we don't know yet. Search the project for `TODO`
 * to find everything that still needs real data.
 */
export const TODO = "TODO" as const;
export type Todo = typeof TODO;

export const GAME_TYPES = ["party", "card", "strategy", "family", "deckbuilding", "bluff"] as const;
export type GameType = (typeof GAME_TYPES)[number];

export type Game = {
  /** URL-safe id, used in links: /ru/games#catan */
  id: string;
  /** Original (Latin) name. */
  name: string;
  /** Russian edition name, shown under the original name on Russian pages. */
  nameRu?: string;
  players: { min: number; max: number } | Todo;
  /** Typical play time in minutes. */
  playTimeMin: number | Todo;
  /** Minimum recommended age. */
  age?: number;
  types: GameType[];
  description: Localized;
  /** Path inside /public, e.g. "/games/catan.jpg". */
  image?: string;
  bggUrl?: string;
};

export type GameEvent = {
  id: string;
  /** "YYYY-MM-DD", Yerevan time. */
  date: string;
  /** "HH:MM", 24-hour, Yerevan time. */
  time: string;
  title: Localized;
  /** Ids from games.ts. */
  gameIds: string[];
  venue: Localized;
  entry?: Localized;
  /** Path inside /public, e.g. "/posters/2026-11-10.jpg". */
  posterImage?: string;
};

export type Creator = {
  id: string;
  name: Localized;
  role: Localized;
  bio: Localized;
  /** Path inside /public, e.g. "/creators/anna.jpg". */
  photo?: string;
  /** Full URL, e.g. "https://instagram.com/username". */
  instagram?: string;
  /** Full URL, e.g. "https://t.me/username". */
  telegram?: string;
};

export type FeatureIcon = "dices" | "swords" | "users" | "beer" | "trophy" | "puzzle";

export type Feature = {
  icon: FeatureIcon;
  title: Localized;
  text: Localized;
};
