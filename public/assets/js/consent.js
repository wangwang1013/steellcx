/* Basic Consent Mode: do not request Google Tag Manager until the visitor opts in. */
(() => {
  'use strict';

  const KEY = 'steellcx_consent_v1';
  const LIFETIME = 180 * 24 * 60 * 60 * 1000;
  const isArabic = document.documentElement.lang === 'ar';
  const globalPrivacyControl = navigator.globalPrivacyControl === true;
  const copy = isArabic ? {
    title: 'الخصوصية',
    summary: 'التحليلات والإعلانات بموافقتك فقط. الرفض لا يؤثر في الموقع أو طلب السعر.',
    accept: 'قبول', reject: 'رفض', manage: 'إدارة التفضيلات',
    details: 'التحليلات والإعلانات',
    purpose: 'تسمح هذه الفئة مجتمعةً بتحميل Google Tag Manager وقياس استخدام الموقع وفعالية الإعلانات. لا نحمّل هذه الأدوات قبل الموافقة.',
    save: 'حفظ الاختيار', close: 'إغلاق',
    policy: 'إشعار الخصوصية', preference: 'إعدادات الخصوصية',
    gpc: 'إشارة الخصوصية العامة مفعّلة؛ أدوات Google الاختيارية متوقفة.'
  } : {
    title: 'Privacy',
    summary: 'Analytics and ads run only with consent. Rejecting will not affect the site or RFQ.',
    accept: 'Accept', reject: 'Reject', manage: 'Manage preferences',
    details: 'Analytics and advertising',
    purpose: 'This combined optional category enables Google Tag Manager, site analytics and advertising measurement. These tools do not load before you opt in.',
    save: 'Save choice', close: 'Close',
    policy: 'Privacy notice', preference: 'Privacy settings',
    gpc: 'Global Privacy Control is on; optional Google tools stay off.'
  };
  const privacyUrl = isArabic ? '/ar/privacy/' : '/privacy/';

  const readChoice = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (stored?.version !== 1 || typeof stored?.allowed !== 'boolean' || !Number.isFinite(stored?.time)) return null;
      if (Date.now() - stored.time > LIFETIME || stored.time > Date.now()) return null;
      return stored.allowed;
    } catch { return null; }
  };
  const storedChoice = readChoice();
  const showGpcNotice = globalPrivacyControl && storedChoice !== false;
  let choice = globalPrivacyControl ? false : storedChoice;
  if (showGpcNotice) {
    try { localStorage.setItem(KEY, JSON.stringify({ version: 1, allowed: false, time: Date.now() })); }
    catch { /* Global Privacy Control still blocks optional tags for this page. */ }
  }
  let gtmLoaded = false;

  const loadGtm = () => {
    if (gtmLoaded || choice !== true || globalPrivacyControl) return;
    gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', {
      analytics_storage: 'granted', ad_storage: 'granted',
      ad_user_data: 'granted', ad_personalization: 'granted'
    });
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PRR39HDN';
    document.head.appendChild(script);
  };
  window.steellcxConsent = {
    allowed: () => choice === true && !globalPrivacyControl,
    openPreferences: () => document.getElementById('steellcx-consent-dialog')?.showModal()
  };
  if (choice === true) loadGtm();

  const clearGoogleCookies = () => {
    const hostname = location.hostname;
    const domains = ['', hostname, `.${hostname}`, '.steellcx.com'];
    for (const match of document.cookie.matchAll(/(?:^|;\s*)(_ga(?:_[^=;]+)?|_gid|_gat(?:_[^=;]+)?|_gcl_[^=;]+)=/g)) {
      for (const domain of domains) {
        document.cookie = `${match[1]}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
      }
    }
  };
  const saveChoice = (allowed) => {
    if (globalPrivacyControl) allowed = false;
    const wasAllowed = choice === true;
    choice = allowed;
    try { localStorage.setItem(KEY, JSON.stringify({ version: 1, allowed, time: Date.now() })); }
    catch { /* Choice still applies for this page; ask again on a future visit. */ }
    document.getElementById('steellcx-consent-banner')?.remove();
    document.getElementById('steellcx-consent-dialog')?.close();
    document.getElementById('steellcx-consent-reopen')?.removeAttribute('hidden');
    if (allowed) loadGtm();
    else if (wasAllowed) {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'
      });
      clearGoogleCookies();
      location.reload();
    }
  };

  const render = () => {
    const banner = document.createElement('section');
    banner.id = 'steellcx-consent-banner';
    banner.className = 'consent-banner';
    banner.setAttribute('aria-label', copy.title);
    banner.innerHTML = `<div class="consent-banner__text"><strong>${copy.title}</strong><p>${copy.summary} <a href="${privacyUrl}">${copy.policy}</a>.</p>${globalPrivacyControl ? `<p>${copy.gpc}</p>` : ''}</div><div class="consent-banner__actions"><button type="button" data-consent="accept" ${globalPrivacyControl ? 'disabled' : ''}>${copy.accept}</button><button type="button" data-consent="reject">${copy.reject}</button><button type="button" data-consent="manage">${copy.manage}</button></div>`;
    const reopen = document.createElement('button');
    reopen.id = 'steellcx-consent-reopen';
    reopen.className = 'consent-reopen';
    reopen.type = 'button';
    reopen.textContent = copy.preference;
    if (choice === null) reopen.hidden = true;
    const dialog = document.createElement('dialog');
    dialog.id = 'steellcx-consent-dialog';
    dialog.className = 'consent-dialog';
    dialog.setAttribute('aria-labelledby', 'steellcx-consent-heading');
    dialog.innerHTML = `<h2 id="steellcx-consent-heading">${copy.title}</h2><p>${copy.summary}</p>${globalPrivacyControl ? `<p>${copy.gpc}</p>` : ''}<label class="consent-dialog__option"><input type="checkbox" id="steellcx-consent-optional" ${globalPrivacyControl ? 'disabled' : ''}><span><strong>${copy.details}</strong><small>${copy.purpose}</small></span></label><p><a href="${privacyUrl}">${copy.policy}</a></p><div class="consent-dialog__actions"><button type="button" data-consent="save">${copy.save}</button><button type="button" data-consent="close">${copy.close}</button></div>`;
    document.body.append(banner, reopen, dialog);
    if (choice !== null && !showGpcNotice) banner.remove();
    const checkbox = dialog.querySelector('input');
    const openDialog = () => { checkbox.checked = choice === true; dialog.showModal(); };
    reopen.addEventListener('click', openDialog);
    banner.addEventListener('click', (event) => {
      const action = event.target.closest('[data-consent]')?.dataset.consent;
      if (action === 'accept') saveChoice(true);
      if (action === 'reject') saveChoice(false);
      if (action === 'manage') openDialog();
    });
    dialog.addEventListener('click', (event) => {
      const action = event.target.closest('[data-consent]')?.dataset.consent;
      if (action === 'save') saveChoice(checkbox.checked);
      if (action === 'close') dialog.close();
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();
})();
