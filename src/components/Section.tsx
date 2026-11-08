import type { ReactNode } from "react";
import { Ornament } from "./BrandIcons";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  /** Use "h1" for the main heading of a sub-page. */
  titleAs?: "h1" | "h2";
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, titleAs = "h2", children, action, className = "" }: SectionProps) {
  const Heading = titleAs;
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-20 py-14 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-10 flex flex-col items-center text-center sm:mb-12">
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-copper-light uppercase">{eyebrow}</p>
          ) : null}
          <Heading
            id={headingId}
            className={
              titleAs === "h1"
                ? "text-4xl leading-tight font-bold sm:text-5xl"
                : "text-3xl leading-tight font-bold sm:text-4xl"
            }
          >
            {title}
          </Heading>
          <Ornament className="mt-4" />
        </header>
        {children}
        {action ? <div className="mt-10 flex justify-center">{action}</div> : null}
      </div>
    </section>
  );
}
