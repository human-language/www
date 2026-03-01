/**
 * Soft navigation: fetch → DOMParser → swap content regions → update title + URL
 * Fallback:  full navigation on any error
 * Cache:     Map<href, html> for instant back/forward via popstate
 */

const cache  = new Map<string, string>();
const parser = new DOMParser();

const isModified = (e: MouseEvent) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

const DEBUG = new URLSearchParams(location.search).has('perf');
const log   = (...a: unknown[]) => DEBUG && console.log('[perf]', ...a);

function swapElement(selector: string, doc: Document): void {
  const incoming = doc.querySelector(selector);
  const current = document.querySelector(selector);
  if (incoming && current) {
    current.replaceWith(incoming.cloneNode(true));
  }
}

async function navigate(href: string, push = true): Promise<void> {
  const t0 = performance.now();
  try {
    let html = cache.get(href);
    if (!html) {
      const res = await fetch(href, { headers: { Accept: 'text/html' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      html = await res.text();
      cache.set(href, html);
    }

    const doc = parser.parseFromString(html, 'text/html');

    swapElement('.main-pane', doc);
    swapElement('.right-sidebar-container', doc);

    const title = doc.querySelector('title')?.textContent;
    if (title) document.title = title;

    document.querySelectorAll('[aria-current="page"]')
      .forEach(el => el.removeAttribute('aria-current'));
    const pathname = new URL(href).pathname;
    document
      .querySelectorAll(`a[href="${pathname}"]`)
      .forEach(el => {
        if (el.closest('nav')) el.setAttribute('aria-current', 'page');
      });

    if (push) history.pushState({ href }, '', href);
    window.scrollTo({ top: 0 });
    document.dispatchEvent(new Event('astro:page-load'));
    log(`navigate ${href} in ${(performance.now() - t0).toFixed(1)}ms`);

  } catch (err) {
    log('fallback:', err);
    location.href = href;
  }
}

document.addEventListener('click', (e: MouseEvent) => {
  if (isModified(e)) return;
  const a = (e.target as Element).closest<HTMLAnchorElement>('a');
  if (!a?.href) return;
  try {
    const url = new URL(a.href, location.origin);
    if (url.origin !== location.origin) return;
    if (url.hash && url.pathname === location.pathname) {
      const target = document.getElementById(url.hash.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', url.href);
      }
      return;
    }
    if (url.pathname === location.pathname) return;
    e.preventDefault();
    navigate(url.href);
  } catch { /* let it go */ }
});

window.addEventListener('popstate', e => navigate(e.state?.href ?? location.href, false));
