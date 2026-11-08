import type { ReactNode } from "react";

type CopperFrameProps = {
  children: ReactNode;
  as?: "div" | "article" | "section" | "li" | "aside";
  /** Copper diamonds in the corners, like the event posters. */
  corners?: boolean;
  rounded?: boolean;
  className?: string;
  id?: string;
  /** id of the heading that names this frame (for article/section). */
  labelledBy?: string;
};

/** Thick copper outer line + thin light-copper inner line. */
export function CopperFrame({
  children,
  as: Tag = "div",
  corners = false,
  rounded = false,
  className = "",
  id,
  labelledBy,
}: CopperFrameProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={[
        "copper-frame",
        corners ? "frame-corners" : "",
        rounded ? "rounded-xl" : "rounded-[3px]",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
