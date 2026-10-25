import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const root = resolve('public');
const htmlFiles = [];
const visit = (folder) => {
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    const path = join(folder, item.name);
    if (item.isDirectory()) visit(path);
    else if (item.name.endsWith('.html')) htmlFiles.push(path);
  }
};
visit(root);

const errors = [];
const pairs = [
  ['index.html', 'public/index.html'],
  ...['products', 'projects', 'factory', 'about', 'contact', 'privacy'].map((page) => [`pages/${page}.html`, `public/${page}/index.html`]),
  ['pages/lp/decorative-screens/index.html', 'public/lp/decorative-screens/index.html'],
  ['ar/lp/decorative-screens/index.html', 'public/ar/lp/decorative-screens/index.html'],
  ['ar/privacy/index.html', 'public/ar/privacy/index.html'],
  ['ar/index.html', 'public/ar/index.html'],
  ...['products', 'projects', 'factory', 'about', 'contact'].map((page) => [`ar/${page}/index.html`, `public/ar/${page}/index.html`]),
  ...readdirSync('pages/products/screens', { withFileTypes: true }).filter((item) => item.isDirectory()).map((item) => [`ar/products/screens/${item.name}/index.html`, `public/ar/products/screens/${item.name}/index.html`]),
  ...readdirSync('pages/products/screens', { withFileTypes: true }).filter((item) => item.isDirectory()).map((item) => [`pages/products/screens/${item.name}/index.html`, `public/products/screens/${item.name}/index.html`]),
  ...['components.css', 'arabic.css', 'lp-decorative-screens.css', 'lp-decorative-screens-ar.css', 'consent.css'].map((name) => [`assets/css/${name}`, `public/assets/css/${name}`]),
  ['assets/js/consent.js', 'public/assets/js/consent.js'],
  ['assets/js/lp-decorative-screens-ar.js', 'public/assets/js/lp-decorative-screens-ar.js'],
  ['assets/js/lp-decorative-screens.js', 'public/assets/js/lp-decorative-screens.js'],
  ['assets/js/contact.js', 'public/assets/js/contact.js'],
  ['assets/js/navigation.js', 'public/assets/js/navigation.js'],
  ['assets/icons/globe.svg', 'public/assets/icons/globe.svg']
];
for (const [source, deployed] of pairs) {
  if (readFileSync(source).compare(readFileSync(deployed)) !== 0) errors.push(`${source}: differs from ${deployed}`);
}
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  if (/\/assets\/(?:js\/consent\.js|css\/consent\.css)/.test(html)) errors.push(`${file}: deferred consent UI is still active`);
  if (/googletagmanager\.com\/(?:gtm\.js|ns\.html)|google-analytics\.com|googleads\.g\.doubleclick\.net|gtag\/js\?id=/.test(html)) errors.push(`${file}: optional Google tag entry point`);
  if (!/<html lang="en" dir="ltr">|<html lang="ar" dir="rtl">/.test(html)) errors.push(`${file}: language/direction`);
  for (const stale of [
    'installation guidance one-to-one',
    '<li>Screen installation guidance</li>',
    'our engineers develop the structure',
    'The PVD route is suitable for champagne gold',
    'صفحات تفاصيل الفئات متاحة حالياً بالإنجليزية'
  ]) if (html.includes(stale)) errors.push(`${file}: outdated business or language claim`);
  for (const [, path] of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
    if (path.startsWith('//')) continue;
    const clean = path.split(/[?#]/)[0];
    const target = resolve(root, `.${clean}`);
    if (!target.startsWith(root) || !existsSync(target)) errors.push(`${file}: missing ${path}`);
  }
  for (const [, attribute, value] of html.matchAll(/\b(src|poster|srcset|data-src)="([^"]+)"/g)) {
    const candidates = attribute === 'srcset' ? value.split(',').map((entry) => entry.trim().split(/\s+/)[0]) : [value];
    for (const candidate of candidates) {
      if (/^(?:https?:|data:)/.test(candidate)) continue;
      const clean = candidate.split(/[?#]/)[0];
      const target = clean.startsWith('/') ? resolve(root, `.${clean}`) : resolve(file, '..', clean);
      if (!target.startsWith(root) || !existsSync(target)) errors.push(`${file}: missing media ${candidate}`);
    }
  }
}

const en = readFileSync(join(root, 'lp/decorative-screens/index.html'), 'utf8');
const ar = readFileSync(join(root, 'ar/lp/decorative-screens/index.html'), 'utf8');
if (!/meta name="robots" content="noindex, follow"/.test(en)) errors.push('English LP noindex');
if (!/meta name="robots" content="noindex, follow"/.test(ar)) errors.push('Arabic LP noindex');
if (/rel="alternate" hreflang=/.test(en) || /rel="alternate" hreflang=/.test(ar)) errors.push('LP search alternates should be absent');
if (!en.includes('rel="canonical" href="https://steellcx.com/lp/decorative-screens/"')) errors.push('English LP canonical');
if (!ar.includes('rel="canonical" href="https://steellcx.com/ar/lp/decorative-screens/"')) errors.push('Arabic canonical');
if (!readFileSync(join(root, 'factory/index.html'), 'utf8').includes('PVD coating is performed by qualified external processing partners.')) errors.push('English PVD ownership wording');
if (!readFileSync(join(root, 'ar/factory/index.html'), 'utf8').includes('ينفّذ طلاء PVD شركاء معالجة خارجيون مؤهلون.')) errors.push('Arabic PVD ownership wording');
for (const screen of readdirSync(join(root, 'ar/products/screens'), { withFileTypes: true }).filter((item) => item.isDirectory())) {
  if (!ar.includes(`href="/ar/products/screens/${screen.name}/"`)) errors.push(`Arabic LP category link: ${screen.name}`);
}
if (readFileSync(join(root, 'sitemap.xml'), 'utf8').includes('<loc>https://steellcx.com/ar/lp/decorative-screens/</loc>')) errors.push('Arabic LP in sitemap');
if (!readFileSync(join(root, 'ar/privacy/index.html'), 'utf8').includes('content="noindex, follow"')) errors.push('Arabic privacy noindex');
if (readFileSync(join(root, 'sitemap.xml'), 'utf8').includes('<loc>https://steellcx.com/ar/privacy/</loc>')) errors.push('Arabic privacy in sitemap');
const englishLpJs = readFileSync(join(root, 'assets/js/lp-decorative-screens.js'), 'utf8');
if ((englishLpJs.match(/dataLayer\.push\(\{ event: "rfq_submit", site_language: "en" \}\)/g) || []).length !== 1) errors.push('English LP RFQ event count');
const testEnglishLpRfq = async (valid, httpOk, serverSuccess, consentAllowed = true) => {
  const handlers = {};
  const submit = { disabled: false, textContent: 'Send' };
  const status = { textContent: '' };
  const fields = [{ reportValidity() { return valid; } }];
  const form = {
    querySelector(selector) { return selector.includes('button') ? submit : status; },
    querySelectorAll() { return fields; },
    addEventListener(type, handler) { handlers[type] = handler; },
    reset() {}
  };
  const window = { dataLayer: [], ...(consentAllowed === null ? {} : { steellcxConsent: { allowed: () => consentAllowed } }) };
  const data = new Map([['name', 'Test'], ['company', 'Company'], ['email', 'test@example.com'], ['whatsapp', '123'], ['country', 'UK'], ['project-type', 'Stainless Steel Decorative Screen'], ['dimensions', '1200 mm'], ['message', 'Test project']]);
  runInNewContext(englishLpJs, {
    document: { readyState: 'complete', querySelector() { return form; } },
    window,
    FormData: class { get(key) { return data.get(key); } },
    fetch: async () => ({ ok: httpOk, json: async () => ({ success: serverSuccess }) })
  });
  await handlers.submit({ preventDefault() {} });
  return window.dataLayer.filter((event) => event.event === 'rfq_submit' && event.site_language === 'en').length;
};
if (await testEnglishLpRfq(true, true, true) !== 1) errors.push('English LP RFQ success event');
if (await testEnglishLpRfq(true, true, false) !== 0) errors.push('English LP RFQ server-declined event');
if (await testEnglishLpRfq(true, false, false) !== 0) errors.push('English LP RFQ HTTP-failure event');
if (await testEnglishLpRfq(false, true, true) !== 0) errors.push('English LP RFQ validation event');
if (await testEnglishLpRfq(true, true, true, false) !== 0) errors.push('English LP RFQ denied-consent event');
if (await testEnglishLpRfq(true, true, true, null) !== 0) errors.push('English LP RFQ deferred-consent event');
const js = readFileSync(join(root, 'assets/js/lp-decorative-screens-ar.js'), 'utf8');
if ((js.match(/dataLayer\.push\(\{ event: "rfq_submit", site_language: "ar" \}\)/g) || []).length !== 1) errors.push('RFQ event count');

const testRfq = async (serverSuccess, valid, consentAllowed = true) => {
  const handlers = {};
  const submit = { disabled: false, textContent: 'اطلب عرض سعر' };
  const status = { textContent: '' };
  const fields = ['name', 'country', 'email', 'message'].map((name) => ({
    dataset: { requiredLabel: name },
    validity: { valueMissing: !valid, typeMismatch: false },
    setCustomValidity() {},
    checkValidity() { return valid; },
    reportValidity() { return valid; },
    addEventListener() {}
  }));
  const form = {
    querySelector(selector) { return selector.includes('button') ? submit : status; },
    querySelectorAll() { return fields; },
    addEventListener(type, handler) { handlers[type] = handler; },
    reset() {}
  };
  const window = { dataLayer: [], ...(consentAllowed === null ? {} : { steellcxConsent: { allowed: () => consentAllowed } }) };
  const data = new Map([['name', 'Test'], ['company', 'Company'], ['email', 'test@example.com'], ['whatsapp', '123'], ['country', 'UK'], ['project-type', 'Stainless Steel Decorative Screen'], ['dimensions', '1200 mm'], ['message', 'Test project']]);
  runInNewContext(js, {
    document: { readyState: 'complete', querySelector() { return form; } },
    window,
    FormData: class { get(key) { return data.get(key); } },
    fetch: async () => ({ ok: serverSuccess, json: async () => ({ success: serverSuccess }) })
  });
  await handlers.submit({ preventDefault() {} });
  return window.dataLayer.filter((event) => event.event === 'rfq_submit' && event.site_language === 'ar').length;
};
if (await testRfq(true, true) !== 1) errors.push('RFQ success event');
if (await testRfq(false, true) !== 0) errors.push('RFQ failure event');
if (await testRfq(true, false) !== 0) errors.push('RFQ validation event');
if (await testRfq(true, true, false) !== 0) errors.push('Arabic LP RFQ denied-consent event');
if (await testRfq(true, true, null) !== 0) errors.push('Arabic LP RFQ deferred-consent event');

const routePairs = [
  ['/', '/ar/'],
  ...['products', 'projects', 'factory', 'about', 'contact'].map((name) => [`/${name}/`, `/ar/${name}/`]),
  ...readdirSync('pages/products/screens', { withFileTypes: true }).filter((item) => item.isDirectory()).map((item) => [`/products/screens/${item.name}/`, `/ar/products/screens/${item.name}/`])
];
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const titles = new Map();
const descriptions = new Map();
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const route = new URL(url).pathname;
  const file = join(root, route, 'index.html');
  if (!existsSync(file)) { errors.push(`Sitemap target missing: ${route}`); continue; }
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  if (!title || titles.has(title)) errors.push(`${route}: missing or duplicate title`);
  if (!description || descriptions.has(description)) errors.push(`${route}: missing or duplicate description`);
  if (title) titles.set(title, route);
  if (description) descriptions.set(description, route);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) errors.push(`${route}: noindex in sitemap`);
  if (!html.includes(`rel="canonical" href="${url}"`)) errors.push(`${route}: sitemap/canonical mismatch`);
}
for (const [englishRoute, arabicRoute] of routePairs) {
  const enFile = join(root, englishRoute, 'index.html');
  const arFile = join(root, arabicRoute, 'index.html');
  const english = readFileSync(enFile, 'utf8');
  const arabic = readFileSync(arFile, 'utf8');
  const enUrl = `https://steellcx.com${englishRoute}`;
  const arUrl = `https://steellcx.com${arabicRoute}`;
  if (!english.includes(`rel="alternate" hreflang="ar" href="${arUrl}"`)) errors.push(`${enFile}: Arabic alternate`);
  if (!arabic.includes(`rel="alternate" hreflang="en" href="${enUrl}"`)) errors.push(`${arFile}: English alternate`);
  if (!arabic.includes(`rel="canonical" href="${arUrl}"`)) errors.push(`${arFile}: canonical`);
  if (!english.includes(`href="${arabicRoute}" lang="ar"`)) errors.push(`${enFile}: language link`);
  if (!arabic.includes(`href="${englishRoute}" lang="en"`)) errors.push(`${arFile}: language link`);
  if (!sitemap.includes(`<loc>${arUrl}</loc>`)) errors.push(`${arFile}: sitemap`);
  if ((arabic.match(/<h1\b/g) || []).length !== 1) errors.push(`${arFile}: H1 count`);
  if (!/<title>[\s\S]*?[\u0600-\u06ff]/.test(arabic)) errors.push(`${arFile}: Arabic title`);
  if (arabic.includes('steellcx.com//assets/')) errors.push(`${arFile}: invalid OG asset URL`);
}
if (!/noindex,\s*follow/.test(en) || sitemap.includes('<loc>https://steellcx.com/lp/decorative-screens/</loc>')) errors.push('English LP indexing changed');

const contactJs = readFileSync(join(root, 'assets/js/contact.js'), 'utf8');
const testContact = async (language, valid, httpOk, serverSuccess, consentAllowed = true) => {
  const handlers = {};
  const submit = { disabled: false, textContent: 'Send', type: 'submit' };
  const status = { textContent: '' };
  const fields = ['name', 'email', 'country', 'message'].map((id) => ({
    id, validity: { valid }, getAttribute() { return valid ? 'false' : 'true'; },
    setAttribute() {}, addEventListener() {}, focus() {}
  }));
  const form = {
    querySelector() { return submit; }, querySelectorAll() { return fields; },
    addEventListener(type, handler) { handlers[type] = handler; }, reset() {}
  };
  const window = { dataLayer: [], ...(consentAllowed === null ? {} : { steellcxConsent: { allowed: () => consentAllowed } }) };
  const values = new Map([['name', 'Test'], ['email', 'test@example.com'], ['country', 'UK'], ['message', 'Project']]);
  runInNewContext(contactJs, {
    document: { documentElement: { lang: language }, addEventListener(type, handler) { handlers[type] = handler; }, querySelector(selector) { return selector === '#contact-form' ? form : selector === '#form-status' ? status : { textContent: '' }; } },
    window, FormData: class { get(key) { return values.get(key) ?? ''; } },
    fetch: async () => ({ ok: httpOk, json: async () => ({ success: serverSuccess }) })
  });
  handlers.DOMContentLoaded();
  await handlers.submit({ preventDefault() {} });
  return window.dataLayer.filter((event) => event.event === 'rfq_submit' && event.site_language === language).length;
};
for (const language of ['en', 'ar']) {
  if (await testContact(language, true, true, true) !== 1) errors.push(`${language} Contact RFQ success event`);
  if (await testContact(language, true, true, false) !== 0) errors.push(`${language} Contact RFQ server-declined event`);
  if (await testContact(language, true, false, false) !== 0) errors.push(`${language} Contact RFQ HTTP-failure event`);
  if (await testContact(language, false, true, true) !== 0) errors.push(`${language} Contact RFQ validation event`);
  if (await testContact(language, true, true, true, false) !== 0) errors.push(`${language} Contact RFQ denied-consent event`);
  if (await testContact(language, true, true, true, null) !== 0) errors.push(`${language} Contact RFQ deferred-consent event`);
}

console.log(`Checked ${htmlFiles.length} deployed HTML files`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log('Language, GTM, internal assets, SEO and RFQ event checks passed');
