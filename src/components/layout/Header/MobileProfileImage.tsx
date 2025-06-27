"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User } from "@prisma/client";

interface Props {
  user: User | null;
}

export default function MobileMenuProfileImage({ user }: Props) {
  const pathname = usePathname();

  if (pathname !== "/")
    return (
      <Link href="/" className="md:hidden h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10">
        <Image
          src={user?.profileImage ?? "/images/avatar.jpg"}
          alt={`${user?.firstName} ${user?.lastName} Profile Picture`}
          className=" rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
          width={40}
          height={40}
          priority
        />
      </Link>
    );
}
