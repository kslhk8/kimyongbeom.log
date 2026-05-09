import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-[60px] w-full max-w-[1280px] items-center justify-between px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[22px] font-bold tracking-tight text-zinc-950">
            kimyongbeom.log
          </Link>
          {/* <nav className="hidden items-center gap-5 text-sm text-zinc-600 md:flex">
            <Link href="/" className="transition hover:text-zinc-950">
              Home
            </Link>
          </nav> */}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:kslhk8@gmail.com"
            className="text-zinc-600 transition hover:text-zinc-950"
            aria-label="Email"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
          </a>
          <a
            href="https://github.com/kslhk8"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-600 transition hover:text-zinc-950"
            aria-label="GitHub"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
