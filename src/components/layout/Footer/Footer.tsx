import NavLinks from "../NavLinks/NavLinks";

export default function Footer() {
  return (
    <footer className="hidden md:block  border-t mt-18 border-zinc-100  pt-4 pb-28 md:pb-16 dark:border-zinc-700/40">
      <div className=" flex px-16 items-center md:justify-between">
        <div className="flex gap-x-6 pt-8  text-sm font-medium text-zinc-800 dark:text-zinc-200">
          <NavLinks navMode="footer" />
        </div>
        <div className="flex pt-8">
          <p className=" text-sm  text-zinc-400 dark:text-zinc-500">
            © 2025 Shayan Panjeh Alizadeh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
