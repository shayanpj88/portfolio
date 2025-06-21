interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return (
    <header className="py-16">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {title}
      </h1>
    </header>
  );
}
