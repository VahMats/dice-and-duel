"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import { RotateCcw, Search } from "lucide-react";
import { GAME_TYPES, TODO, type Game, type GameType } from "@/content/types";
import type { Dictionary, Locale } from "@/i18n";
import { buttonClasses } from "./Button";
import { GameCard } from "./GameCard";
import { typeStyles } from "./Tags";

type PlayersFilter = "" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
type TimeFilter = "" | "short" | "medium" | "long";

const PLAYER_OPTIONS: Exclude<PlayersFilter, "">[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

function matchesPlayers(game: Game, filter: PlayersFilter) {
  if (!filter) return true;
  if (game.players === TODO) return false;
  const n = Number(filter);
  // "8" means 8 or more
  return n === 8 ? game.players.max >= 8 : game.players.min <= n && n <= game.players.max;
}

function matchesTime(game: Game, filter: TimeFilter) {
  if (!filter) return true;
  if (game.playTimeMin === TODO) return false;
  if (filter === "short") return game.playTimeMin <= 30;
  if (filter === "medium") return game.playTimeMin > 30 && game.playTimeMin <= 60;
  return game.playTimeMin > 60;
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

type GamesExplorerProps = {
  games: Game[];
  locale: Locale;
  labels: Dictionary["games"];
  newTabLabel: string;
};

export function GamesExplorer({ games, locale, labels, newTabLabel }: GamesExplorerProps) {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState<PlayersFilter>("");
  const [time, setTime] = useState<TimeFilter>("");
  const [types, setTypes] = useState<GameType[]>([]);
  const ids = { search: useId(), players: useId(), time: useId(), types: useId() };

  // Highlight the game linked from an event (/games#catan), also after client-side navigation.
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => decodeURIComponent(window.location.hash.slice(1)),
    () => "",
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale);
    return games.filter((game) => {
      const names = [game.name, game.nameRu ?? ""].join(" ").toLocaleLowerCase(locale);
      return (
        (!q || names.includes(q)) &&
        matchesPlayers(game, players) &&
        matchesTime(game, time) &&
        (types.length === 0 || game.types.some((type) => types.includes(type)))
      );
    });
  }, [games, query, players, time, types, locale]);

  const hasFilters = Boolean(query || players || time || types.length);
  const reset = () => {
    setQuery("");
    setPlayers("");
    setTime("");
    setTypes([]);
  };
  const toggleType = (type: GameType) =>
    setTypes((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));

  const fieldClass =
    "min-h-12 w-full rounded-md border-2 border-copper bg-walnut-950 px-3 text-base text-cream placeholder:text-parchment-muted/80 hover:border-copper-light";
  const labelClass = "mb-1.5 block text-xs font-semibold tracking-[0.15em] text-copper-light uppercase";

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="copper-frame mb-8 grid gap-4 rounded-xl p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-[2fr_1fr_1fr]"
      >
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor={ids.search} className={labelClass}>
            {labels.search}
          </label>
          <div className="relative">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-copper-light"
            />
            <input
              id={ids.search}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.searchPlaceholder}
              autoComplete="off"
              className={`${fieldClass} pl-10`}
            />
          </div>
        </div>

        <div>
          <label htmlFor={ids.players} className={labelClass}>
            {labels.players}
          </label>
          <select
            id={ids.players}
            value={players}
            onChange={(event) => setPlayers(event.target.value as PlayersFilter)}
            className={fieldClass}
          >
            <option value="">{labels.playersAny}</option>
            {PLAYER_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n === "8" ? "8+" : n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={ids.time} className={labelClass}>
            {labels.time}
          </label>
          <select
            id={ids.time}
            value={time}
            onChange={(event) => setTime(event.target.value as TimeFilter)}
            className={fieldClass}
          >
            <option value="">{labels.timeAny}</option>
            <option value="short">{labels.timeShort}</option>
            <option value="medium">{labels.timeMedium}</option>
            <option value="long">{labels.timeLong}</option>
          </select>
        </div>

        <fieldset className="sm:col-span-2 lg:col-span-3">
          <legend id={ids.types} className={labelClass}>
            {labels.types}
          </legend>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={types.length === 0}
              onClick={() => setTypes([])}
              className={`min-h-10 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${
                types.length === 0
                  ? "border-copper-light bg-rust text-cream"
                  : "border-copper/70 bg-walnut-950 text-parchment hover:border-copper-light"
              }`}
            >
              {labels.typesAll}
            </button>
            {GAME_TYPES.map((type) => {
              const active = types.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleType(type)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${
                    active
                      ? `border-cream ${typeStyles[type].chip}`
                      : "border-copper/70 bg-walnut-950 text-parchment hover:border-copper-light"
                  }`}
                >
                  {!active ? (
                    <span aria-hidden="true" className={`size-2.5 rounded-full ${typeStyles[type].stripe}`} />
                  ) : null}
                  {labels.typeNames[type]}
                </button>
              );
            })}
          </div>
        </fieldset>
      </form>

      <div className="mb-6 flex min-h-11 flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-parchment-muted">
          {labels.results.replace("{n}", String(filtered.length))}
        </p>
        {hasFilters ? (
          <button type="button" onClick={reset} className={buttonClasses("secondary", "md")}>
            <RotateCcw size={16} aria-hidden="true" />
            {labels.reset}
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((game) => (
            <li key={game.id}>
              <GameCard
                game={game}
                locale={locale}
                labels={labels}
                newTabLabel={newTabLabel}
                highlighted={hash === game.id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="copper-frame rounded-xl p-8 text-center">{labels.empty}</p>
      )}
    </div>
  );
}
