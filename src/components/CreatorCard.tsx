import Image from "next/image";
import { UserRound } from "lucide-react";
import type { Creator } from "@/content/types";
import type { Locale } from "@/i18n";
import { t } from "@/lib/content";
import { InstagramIcon, TelegramIcon } from "./BrandIcons";
import { CopperFrame } from "./CopperFrame";

type CreatorCardProps = {
  creator: Creator;
  locale: Locale;
  newTabLabel: string;
};

export function CreatorCard({ creator, locale, newTabLabel }: CreatorCardProps) {
  const name = t(creator.name, locale);
  const socials = [
    creator.telegram ? { href: creator.telegram, label: "Telegram", Icon: TelegramIcon } : null,
    creator.instagram ? { href: creator.instagram, label: "Instagram", Icon: InstagramIcon } : null,
  ].filter((item) => item !== null);

  return (
    <CopperFrame as="article" rounded className="flex h-full flex-col items-center px-6 pt-8 pb-6 text-center">
      <div className="relative mb-5 size-32 overflow-hidden rounded-full border-[3px] border-copper shadow-[0_0_0_4px_var(--color-walnut-900),0_0_0_5px_var(--color-copper-light)]">
        {creator.photo ? (
          <Image src={creator.photo} alt={name} fill sizes="128px" className="object-cover" />
        ) : (
          <div className="parchment-surface flex h-full items-center justify-center" aria-hidden="true">
            <UserRound size={56} strokeWidth={1.25} />
          </div>
        )}
      </div>
      <h3 className="text-2xl leading-tight font-bold">{name}</h3>
      <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-copper-light uppercase">
        {t(creator.role, locale)}
      </p>
      <p className="mt-3 text-sm leading-relaxed">{t(creator.bio, locale)}</p>
      {socials.length > 0 ? (
        <ul className="mt-auto flex gap-2 pt-4">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-full border-2 border-copper text-parchment hover:bg-walnut-800 hover:text-cream"
              >
                <Icon size={18} />
                <span className="sr-only">
                  {name} — {label} {newTabLabel}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </CopperFrame>
  );
}
