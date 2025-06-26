import NavLinks from "../NavLinks/NavLinks";

export default function Footer() {
  return (
    <footer className=" border-t mt-auto border-zinc-100  pt-4 pb-12 dark:border-zinc-700/40 ">
      <div className="flex flex-col md:flex-row px-16 items-center justify-center md:justify-between">
        <div className="flex gap-x-6 pt-8  text-sm font-medium text-zinc-800 dark:text-zinc-200">
          <NavLinks navMode="footer" />
        </div>
        <div className="flex pt-8">
          <p className=" text-sm  text-zinc-400 dark:text-zinc-500">
            © 2025 Shayanpj. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
