"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/nav-links";
import { NavModes } from "@/types/navModes";
import { Dispatch, SetStateAction } from "react";


interface Props {
  navMode: NavModes;
  setMobileMenuIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function NavLinks({ navMode, setMobileMenuIsOpen }: Props) {
  const pathname = usePathname();

  if (navMode === "desktop") {
    return (
      <>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                pathname === link.href && pathname !== "/"
                  ? "relative active block px-3 py-2 transition text-fuchsia-800"
                  : "relative block px-3 py-2 transition"
              } // Apply active class
            >
              {link.title}
              {pathname === link.href && pathname !== "/" ? (
                <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-fuchsia-500/0 via-fuchsia-500/40 to-fuchsia-500/0 dark:from-fuchsia-400/0 dark:via-fuchsia-400/40 dark:to-fuchsia-400/0"></span>
              ) : null}
            </Link>
          </li>
        ))}
      </>
    );
  } else if (navMode === "footer") {
    return (
      <>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className=" hover:text-fuchsia-800 dark:hover:text-fuchsia-800"
          >
            {link.title}
          </Link>
        ))}
      </>
    );
  } else if (navMode === "mobile") {
    return (
      <>
        {navLinks.map((link) => (
          <li key={link.href} className="mobile">
            <Link
              href={link.href}
              onClick={() => setMobileMenuIsOpen!(false)}
              className="block pb-2" 
            >
              {link.title}
            </Link>
          </li>
        ))}
      </>
    );
  }
}
