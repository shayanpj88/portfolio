export function ArticleDateFormatter(date: string | Date | null): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}