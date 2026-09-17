/**
 * Tracks whether the visitor has moved between pages inside this site during
 * the current page load, so "Close" can go back to the page they came from
 * instead of a fixed URL. The navbar reports every pathname; only real changes
 * count (React dev mode runs effects twice), and the first is the landing page.
 */
let pagesVisited = 0;
let lastPathname: string | null = null;

export function markPageVisit(pathname: string): void {
  if (pathname === lastPathname) return;
  lastPathname = pathname;
  pagesVisited += 1;
}

/** True when there is an earlier page from this site to go back to. */
export function hasInAppHistory(): boolean {
  return pagesVisited > 1;
}
