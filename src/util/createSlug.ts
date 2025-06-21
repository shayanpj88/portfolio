export default function createSlug(str:string) {
  return str
    .toString()
    .normalize('NFD') // Normalize Unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks (accents)
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // Remove non-alphanumeric, non-space, non-hyphen characters
    .trim() // Trim leading/trailing whitespace
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}