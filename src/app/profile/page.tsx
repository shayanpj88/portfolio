import EditProfileForm from "@/components/profile/EditProfileForm";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login"); // secure redirect if not logged in
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <div>User not found.</div>;
  }

  const userFormData = {
    id: user.id,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    username: user.username ?? "",
    email: user.email,
    bio: user.bio ?? "",
    introductionTitle: user.introductionTitle ?? "",
    introductionSummary: user.introductionSummary ?? "",
    profileImage: user.profileImage ?? "",
    social: user.social ?? {}, 
  };

  return (
      <section
      id="profile"
      className="max-w-2xl px-6 md:px-16 md:py-16 lg:max-w-5xl"
    >
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Profile
        </h1>
      </header>
      <EditProfileForm user={userFormData} />
    </section>
  
  );
}

