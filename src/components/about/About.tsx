import { AboutData } from "@/types/user";
import Image from "next/image";
import { icons } from "@/lib/icons";

interface Props {
  aboutData: AboutData;
}

export default function About({ aboutData }: Props) {
  const about = aboutData;

  const InstagarmIcon = icons["instagram"];
  const GithubIcon = icons["github"];
  const LinkedinIcon = icons["linkedin"];

  return (
    <div className="flex flex-col md:justify-between md:flex-row">
      <div className="flex gap-6 mb-16 flex-col md:w-1/2">
        <Image
          src={about.profileImage}
          alt={`${about?.firstName} ${about?.lastName} Profile Picture`}
          className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 md:hidden h-32 w-32"
          width={128}
          height={128}
          priority
        />
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          {about.bio}
        </p>
        <div className="flex flex-row gap-3 md:hidden">
          {about.social?.instagram && (
            <a
              href={about.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagarmIcon className="social-icon" />
            </a>
          )}
          {about.social?.github && (
            <a
              href={about.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="social-icon" />
            </a>
          )}
          {about.social?.linkedin && (
            <a
              href={about.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="social-icon" />
            </a>
          )}
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400 md:hidden">
          Email: {about.email}
        </p>
      </div>
      <div className="hidden md:flex md:flex-col md:gap-6 md:w-64  ">
      
        <Image
          src={about.profileImage}
          alt={`${about?.firstName} ${about?.lastName} Profile Picture`}
          className=" bg-zinc-100 object-cover dark:bg-zinc-80 black"
          width={256}
          height={256}
          priority
        />
        <div className="flex flex-row gap-6">
          {about.social?.instagram && (
            <a
              href={about.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagarmIcon className="social-icon" />
            </a>
          )}
          {about.social?.github && (
            <a
              href={about.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="social-icon" />
            </a>
          )}
          {about.social?.linkedin && (
            <a
              href={about.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="social-icon" />
            </a>
          )}
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Email: {about.email}
        </p>
      </div>
    </div>
  );
}
