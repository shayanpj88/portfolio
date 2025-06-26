"use client";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import NavLinks from "../NavLinks/NavLinks";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

interface Props {
  session: Session | null;
}

export default function DesktopMenu({ session }: Props) {
  const pathname = usePathname();

  return (
    <ul className="absolute left-1/2 -translate-x-1/2 z-0 hidden md:flex md:h-auto rounded-full bg-white/90 px-4 text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 ">
      <NavLinks navMode="desktop" />
      {session ? (
        <li>
          <LogoutButton />
        </li>
      ) : (
        <li>
          <Link
            href="/auth/login"
            className={
              pathname === "/auth/login"
                ? "relative active block px-3 py-2 transition text-fuchsia-800"
                : "relative block px-3 py-2 transition"
            } // Apply active class
          >
            Sign in
            {pathname === "/auth/login" ? (
              <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-fuchsia-500/0 via-fuchsia-500/40 to-fuchsia-500/0 dark:from-fuchsia-400/0 dark:via-fuchsia-400/40 dark:to-fuchsia-400/0"></span>
            ) : null}
          </Link>
        </li>
      )}
    </ul>
  );
}
