import type { JSX } from "react";

/** Splits text into words that rise in one after another (CSS .split). Server-safe: just spans with a delay index. */
export default function SplitText({ text, as: Tag = "span", className = "", start = 0, step = 55 }: { text: string; as?: keyof JSX.IntrinsicElements; className?: string; start?: number; step?: number }) {
  const words = text.split(" ");
  const T = Tag as "span";
  return (
    <T className={`split ${className}`} aria-label={text}>
      {words.map((w, i) => (
        // The space sits between the inline-blocks (not inside), otherwise it collapses and the words run together.
        <span key={i}>
          <span className="split-w" aria-hidden="true">
            <span className="split-in" style={{ animationDelay: `${start + i * step}ms` }}>{w}</span>
          </span>{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </T>
  );
}
