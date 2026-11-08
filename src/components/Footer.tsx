import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import type { Dictionary, Locale } from "@/i18n";
import { getTodayInYerevan } from "@/lib/dates";
import { InstagramIcon, Ornament, TelegramIcon } from "./BrandIcons";

export async function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = (await getTodayInYerevan()).slice(0, 4);
  const home = `/${locale}`;
  const links = [
    { href: `${home}/events`, label: dict.nav.events },
    { href: `${home}/games`, label: dict.nav.games },
    { href: `${home}/about`, label: dict.nav.about },
  ];

  return (
    <footer className="mt-auto border-t-[3px] border-copper bg-walnut-950 before:block before:h-px before:translate-y-1 before:bg-copper-light/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6">
        <Link href={home} aria-label={dict.nav.homeLink}>
          <Image src="/logo.png" alt="" width={299} height={273} className="h-24 w-auto" />
        </Link>
        <p className="text-parchment-muted">{dict.footer.tagline}</p>
        <Ornament />
        <nav aria-label={dict.nav.mainNav}>
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center px-2 font-heading text-lg font-bold text-parchment hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-3">
          <li>
            <a
              href={site.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full border-2 border-copper text-parchment hover:bg-walnut-800 hover:text-cream"
            >
              <TelegramIcon />
              <span className="sr-only">Telegram {dict.common.opensInNewTab}</span>
            </a>
          </li>
          <li>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full border-2 border-copper text-parchment hover:bg-walnut-800 hover:text-cream"
            >
              <InstagramIcon />
              <span className="sr-only">Instagram {dict.common.opensInNewTab}</span>
            </a>
          </li>
        </ul>
        <p className="font-brand text-xs tracking-widest text-parchment-muted">© {year} Dice and Duel</p>
      </div>
    </footer>
  );
}
