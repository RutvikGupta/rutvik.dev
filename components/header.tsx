import Link from "next/link";

export function Header() {
  return (
    <header className="relative z-40">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10 md:py-7">
        <Link
          href="/"
          aria-label="Rutvik Gupta — home"
          className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-white/92"
        >
          <span className="text-white/88">✽</span>
          <span>RUTVIK–GUPTA</span>
          <span className="text-white/52">™</span>
        </Link>

        <nav className="flex items-center gap-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/64 md:gap-8">
          <a href="#journey" className="hidden items-center gap-2 transition-colors hover:text-white sm:inline-flex">
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/40 text-[8px]">
              +
            </span>
            WORK
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 transition-colors hover:text-white sm:inline-flex"
          >
            RESUME
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/40 text-[8px]">
              →
            </span>
            LET&apos;S CONNECT
          </a>
        </nav>
      </div>
    </header>
  );
}
