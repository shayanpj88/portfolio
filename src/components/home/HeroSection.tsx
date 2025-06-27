import { getUser } from "@/lib/prisma/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { icons } from "@/lib/icons";
import { UserForm } from "@/types/user";

export default async function HeroSection() {
  const session = await getServerSession(authOptions);
  const user = await getUser();

  const profileImageUrl = user?.profileImage ?? "/images/avatar.jpg";
  const social = (user?.social ?? {}) as UserForm["social"];

  const InstagarmIcon = icons["instagram"];
  const GithubIcon = icons["github"];
  const LinkedinIcon = icons["linkedin"];

  return (
    <div className="container flex flex-col gap-6 p-6 md:px-16 md:py-12 md:max-w-4/6">
      <div className="flex justify-between items-center">
        <Image
          src={profileImageUrl}
          alt={`${user?.firstName} ${user?.lastName} Profile Picture`}
          className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-16 w-16"
          width={64}
          height={64}
          priority
        />
        {session && (
          <a href="/profile" className="text-zinc-600 dark:text-zinc-400">
            Edit profile
          </a>
        )}
      </div>

      <h1 className="text-4xl font-bold text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {user?.introductionTitle}
      </h1>

      <p className="text-base -mt-1 text-zinc-600 dark:text-zinc-400">
        {user?.introductionSummary}
      </p>

      <div className="flex gap-6">
        {social?.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <InstagarmIcon className="social-icon" />
          </a>
        )}
        {social?.github && (
          <a href={social.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="social-icon" />
          </a>
        )}
        {social?.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon className="social-icon" />
          </a>
        )}
      </div>
    </div>
  );
}
