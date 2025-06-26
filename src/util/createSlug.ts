export default function createSlug(input: string): string {
  return input
    .toString()                           // Ensure input is string
    .toLowerCase()                        // Convert to lowercase
    .trim()                               // Trim whitespace
    .replace(/\s+/g, '-')                 // Replace spaces with -
    .replace(/[^\w\-]+/g, '')             // Remove all non-word chars except -
    .replace(/\-\-+/g, '-')               // Replace multiple - with single -
    .replace(/^-+/, '')                   // Trim - from start
    .replace(/-+$/, '');                  // Trim - from end
}