import { events } from "@/content/events";
import { games } from "@/content/games";
import { TODO, type Game, type GameEvent, type Localized } from "@/content/types";
import type { Locale } from "@/i18n/config";

export function t(text: Localized, locale: Locale): string {
  return text[locale];
}

const gamesById = new Map(games.map((game) => [game.id, game]));

export function getGame(id: string): Game | undefined {
  return gamesById.get(id);
}

export function gamesForEvent(event: GameEvent): Game[] {
  return event.gameIds.map(getGame).filter((game): game is Game => Boolean(game));
}

const byDateAsc = (a: GameEvent, b: GameEvent) =>
  `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);

/** Upcoming = today or later (Yerevan date). Upcoming sorted soonest first, past newest first. */
export function splitEvents(today: string) {
  const sorted = [...events].sort(byDateAsc);
  return {
    upcoming: sorted.filter((event) => event.date >= today),
    past: sorted.filter((event) => event.date < today).reverse(),
  };
}

export function formatPlayers(game: Game, unknown: string): string {
  if (game.players === TODO) return unknown;
  const { min, max } = game.players;
  return min === max ? String(min) : `${min}–${max}`;
}

export function formatPlayTime(game: Game, unknown: string, minutes: string): string {
  return game.playTimeMin === TODO ? unknown : `${game.playTimeMin} ${minutes}`;
}

export function bggLink(game: Game): string {
  return (
    game.bggUrl ??
    `https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=${encodeURIComponent(game.name)}`
  );
}
