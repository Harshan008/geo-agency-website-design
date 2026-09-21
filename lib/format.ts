export function formatDate(iso: string) {
  const date = new Date(iso)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
