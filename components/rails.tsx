import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/rutvikgupta", label: "GitHub", icon: Github },
  {
    href: "https://www.linkedin.com/in/rutvikrgupta/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "mailto:hello@rutvik.dev", label: "Email", icon: Mail },
];

/**
 * Fixed left rail with vertical socials + a thin vertical line dropping from them.
 * Hidden on small screens.
 */
export function LeftRail() {
  return (
    <aside
      aria-label="Social links"
      className="fixed bottom-0 left-6 z-20 hidden flex-col items-center gap-6 text-muted md:flex xl:left-10"
    >
      <ul className="flex flex-col items-center gap-5">
        {socials.map(({ href, label, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-block text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          </li>
        ))}
      </ul>
      <div className="h-24 w-px bg-line" />
    </aside>
  );
}

/**
 * Fixed right rail with rotated email + line drop.
 * Hidden on small screens.
 */
export function RightRail() {
  return (
    <aside
      aria-label="Contact"
      className="fixed bottom-0 right-6 z-20 hidden flex-col items-center gap-6 text-muted md:flex xl:right-10"
    >
      <a
        href="mailto:hello@rutvik.dev"
        className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
        style={{ writingMode: "vertical-rl" }}
      >
        hello@rutvik.dev
      </a>
      <div className="h-24 w-px bg-line" />
    </aside>
  );
}
