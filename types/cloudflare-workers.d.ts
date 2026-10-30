// `cloudflare:workers` is provided by the workerd runtime, not by a package.
// vinext externalizes the import at build time; this declaration keeps
// TypeScript happy without pulling in @cloudflare/workers-types.
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>
}
