/**
 * Intent-based prefetch system
 * Triggers:     mouseenter · focus · touchstart
 * Constraints:  same-origin only · max 2 concurrent · 65ms debounce · deduped via Set
 */

const prefetched  = new Set<string>();
const inFlight    = new Set<string>();
const MAX         = 2;

function shouldPrefetch(href: string): boolean {
  if (!href) return false;
  try {
    const url = new URL(href, location.origin);
    return (
      url.origin === location.origin &&
      !prefetched.has(url.pathname)  &&
      !inFlight.has(url.pathname)    &&
      inFlight.size < MAX
    );
  } catch { return false; }
}

function prefetch(href: string): void {
  const { pathname } = new URL(href, location.origin);
  inFlight.add(pathname);
  const link    = document.createElement('link');
  link.rel      = 'prefetch';
  link.as       = 'document';
  link.href     = href;
  link.onload   =
  link.onerror  = () => { inFlight.delete(pathname); prefetched.add(pathname); };
  document.head.appendChild(link);
}

function debounce<T extends (...a: unknown[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

const doPrefetch = debounce((href: string) => { if (shouldPrefetch(href)) prefetch(href); }, 65);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) doPrefetch((e.target as HTMLAnchorElement).href);
  });
}, { rootMargin: '0px 0px 200px 0px' });

function attach(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(a => {
    if (a.origin !== location.origin) return;
    const h = () => doPrefetch(a.href);
    a.addEventListener('mouseenter',  h, { passive: true });
    a.addEventListener('focus',       h, { passive: true });
    a.addEventListener('touchstart',  h, { passive: true });
    observer.observe(a);
  });
}

attach();
document.addEventListener('astro:page-load', attach);
