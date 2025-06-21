import { icons } from "@/lib/icons";
export default function StayUpdateSection() {
  const EmailIcon = icons["email"];
  return (
    <form className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="flex space-x-3 text-sm items-center font-semibold text-zinc-900 dark:text-zinc-100">
        <EmailIcon className="text-zinc-500" /> <h2>Stay up to date</h2>
      </div>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="flex space-x-3 mt-4">
        <input className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-fuchsia-500/10 focus:outline-fuchsia-800 sm:text-sm dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-fuchsia-400/10 dark:focus:outline-fuchsia-800" />
        <button className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none">
          Join
        </button>
      </div>
    </form>
  );
}
