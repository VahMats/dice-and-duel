import Link from "next/link";
import { Dices } from "lucide-react";
import type { GameType } from "@/content/types";

/** Each game type gets a game-piece colour. Text colours keep contrast ≥ 4.5:1. */
export const typeStyles: Record<GameType, { chip: string; stripe: string }> = {
  party: { chip: "bg-piece-orange text-walnut-950", stripe: "bg-piece-orange" },
  card: { chip: "bg-piece-yellow text-walnut-950", stripe: "bg-piece-yellow" },
  strategy: { chip: "bg-piece-blue text-cream", stripe: "bg-piece-blue" },
  family: { chip: "bg-piece-green text-walnut-950", stripe: "bg-piece-green" },
  deckbuilding: { chip: "bg-piece-red text-cream", stripe: "bg-piece-red" },
  bluff: { chip: "bg-piece-cream text-walnut-950", stripe: "bg-piece-cream" },
};

export function TypeBadge({ type, label }: { type: GameType; label: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeStyles[type].chip}`}
    >
      {label}
    </span>
  );
}

/** A game on an event, linking to its card in the collection. */
export function GameTag({ href, name }: { href: string; name: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-copper/70 bg-walnut-950 px-3 py-1 text-sm text-parchment transition-colors hover:border-copper-light hover:bg-walnut-800 hover:text-cream"
    >
      <Dices size={14} aria-hidden="true" className="text-copper-light" />
      {name}
    </Link>
  );
}
