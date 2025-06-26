import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import MobileMenuProfileImage from "./MobileProfileImage";
import { getUser } from "@/lib/prisma/user";
import DesktopMenu from "./DesktopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DesktopMenuProfileImage from "./DesktopProfileImage";

export default async function Header() {
  // user info
  const user = await getUser();

  // check if user is login
  const session = await getServerSession(authOptions);

  return (
    // header container
    <header className=" p-6  md:px-16 ">
      {/* Nav row flex */}
      <nav className="main-header relative flex flex-row-reverse justify-between gap-4 items-center md:flex-row-reverse md:justify-between ">
        {/* Mobile Menu Buttons */}
        <div className="flex gap-4">
          {/* Dark mode Button */}
          <ThemeToggle />

          {/* Mobile Modal Menu */}
          <MobileMenu session={session} />
        </div>

        {/* Mobile menu image */}
        <MobileMenuProfileImage user={user} />

        {/* Desktop Menu */}
        <DesktopMenu session={session} />

        {/* Desktop Profile Image */}
        <DesktopMenuProfileImage user={user} />
      </nav>
    </header>
  );
}
