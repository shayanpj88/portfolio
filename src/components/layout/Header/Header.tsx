import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import NavLinks from "../NavLinks/NavLinks";

export default async function Header() {
  // check if user is login
  const session = await getServerSession(authOptions);

  return (
    // header container
    <header className=" p-6  md:px-16 ">
      {/* Nav row flex */}
      <nav className="main-header relative flex justify-end gap-4 items-center md:flex-row-reverse md:justify-between">
        {/* Dark mode Button */}
        <ThemeToggle />

        {/* Mobile Modal Menu */}
        <MobileMenu />

        {/* Menu flex */}
        <ul className="absolute left-1/2 -translate-x-1/2 z-0 hidden md:flex md:h-auto rounded-full bg-white/90 px-4 text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 ">
          <NavLinks navMode="header"/>
          {session && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
