import EditProfileForm from "@/components/profile/EditProfileForm";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    notFound();
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
    <>
      <div className="flex flex-col items-start mx-auto max-w-2xl mb-20 md:mb-28">
        <SectionHeader title="Profile" />
        <section id="project-form" className="px-6 md:px-16 w-full">
          <EditProfileForm user={userFormData} />{" "}
        </section>
      </div>
    </>
  );
}
