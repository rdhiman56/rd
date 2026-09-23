/**
 * Resolve public/ assets so paths work in local Vite and on GitHub Pages.
 * Vite injects import.meta.env.BASE_URL (e.g. "/" or "/rd/").
 */
export function publicAsset(relativePath: string): string {
  const base = import.meta.env.BASE_URL
  const clean = relativePath.replace(/^\/+/, '')
  return `${base}${clean}`
}

/** Authoritative resume document in public/resume.pdf */
export function getResumeUrl(): string {
  return publicAsset('resume.pdf')
}
