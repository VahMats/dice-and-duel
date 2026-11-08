"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { href: string; label: string };

type HeaderNavProps = {
  items: NavItem[];
  homeHref: string;
  labels: { menu: string; closeMenu: string; mainNav: string };
  /** Language switcher, rendered inside the mobile panel too. */
  languageSwitcher: ReactNode;
};

export function HeaderNav({ items, homeHref, labels, languageSwitcher }: HeaderNavProps) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const panelId = useId();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === homeHref ? pathname === homeHref : pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    `relative inline-flex min-h-11 items-center px-3 font-heading text-lg font-bold tracking-wide transition-colors ${
      isActive(href)
        ? "text-cream after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:bg-copper"
        : "text-parchment hover:text-cream"
    }`;

  return (
    <>
      {/* Desktop */}
      <nav aria-label={labels.mainNav} className="hidden items-center gap-4 md:flex">
        <ul className="flex items-center gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={linkClass(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {languageSwitcher}
      </nav>

      {/* Mobile */}
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md border-2 border-copper text-cream hover:bg-walnut-800 md:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        <span className="sr-only">{open ? labels.closeMenu : labels.menu}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y-[3px] border-copper bg-walnut-950 shadow-[0_12px_24px_rgb(0_0_0/0.45)] md:hidden"
      >
        <nav aria-label={labels.mainNav} className="mx-auto max-w-6xl px-4 py-4">
          <ul className="flex flex-col divide-y divide-copper/30">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${linkClass(item.href)} w-full py-3 text-xl`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpenPath(null)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex">{languageSwitcher}</div>
        </nav>
      </div>
    </>
  );
}
