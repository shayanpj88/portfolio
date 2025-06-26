
import SectionHeader from "@/components/layout/SectionHeader/SectionHeader";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  
  return (
    <div className="flex flex-col items-start mx-auto max-w-2xl mb-20 md:mb-28">
      <SectionHeader title="Sign in" />
      <section id="project-form" className="px-6 md:px-16 w-full">
        <LoginForm />
      </section>
    </div>
  );
}
