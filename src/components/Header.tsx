import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { HeaderNav } from "./HeaderNav";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = `/${locale}`;
  const items = [
    { href: home, label: dict.nav.home },
    { href: `${home}/events`, label: dict.nav.events },
    { href: `${home}/games`, label: dict.nav.games },
    { href: `${home}/about`, label: dict.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-copper bg-walnut-950 after:absolute after:inset-x-0 after:-bottom-[7px] after:h-px after:bg-copper-light/50">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href={home} className="flex shrink-0 items-center gap-3" aria-label={dict.nav.homeLink}>
          <Image src="/logo.png" alt="" width={299} height={273} className="h-12 w-auto sm:h-14" preload />
          <span className="hidden font-brand text-lg leading-none font-bold tracking-wider text-cream lg:block">
            Dice and Duel
          </span>
        </Link>
        <HeaderNav
          items={items}
          homeHref={home}
          labels={{ menu: dict.nav.menu, closeMenu: dict.nav.closeMenu, mainNav: dict.nav.mainNav }}
          languageSwitcher={<LanguageSwitcher current={locale} label={dict.nav.language} />}
        />
      </div>
    </header>
  );
}
