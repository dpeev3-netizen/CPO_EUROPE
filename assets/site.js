/* ============================================================
   ЦПО ЕВРОПА — Shared site JS
   - Injects nav + full-screen menu + footer
   - Handles scroll state, active link, reveal, form
   ============================================================ */

(function(){
  const BASE = window.SITE_BASE || './';

  const PAGES = [
    { href: 'index.html',       label: 'Начало' },
    { href: 'za-cpo.html',      label: 'За ЦПО' },
    { href: 'upravlenie.html',  label: 'Управление и организация' },
    { href: 'obucheniya.html',  label: 'Професионални обучения' },
    { href: 'profesii.html',    label: 'Професии и специалности' },
    { href: 'zbut.html',        label: 'Обучения по ЗБУТ' },
    { href: 'kachestvo.html',   label: 'Качество на обучението' },
    { href: 'rabotodateli.html',label: 'За работодатели' },
    { href: 'priem.html',       label: 'Прием и записване' },
    { href: 'dokumenti.html',   label: 'Документи' },
    { href: 'kontakti.html',    label: 'Контакти' },
  ];

  // Primary nav (visible in top bar): 5 of the 11 most-used
  const PRIMARY = ['za-cpo.html', 'obucheniya.html', 'profesii.html', 'zbut.html', 'priem.html'];

  // Determine current page identifier
  const path = window.location.pathname;
  let current = path.split('/').pop() || 'index.html';
  if (!current.endsWith('.html')) current = 'index.html';
  // sub-pages of professions: treat as profesii.html
  const isSubProfession = path.includes('/profesii/');
  if (isSubProfession) current = 'profesii.html';

  /* ---------- LANGUAGE SWITCH ---------- */
  const langSwitchHTML = `
    <div class="lang-switch notranslate" translate="no">
      <button type="button" data-lang="bg" aria-label="Български">BG</button>
      <span class="lang-switch__sep" aria-hidden="true">|</span>
      <button type="button" data-lang="en" aria-label="English">EN</button>
      <span class="lang-switch__sep" aria-hidden="true">|</span>
      <button type="button" data-lang="it" aria-label="Italiano">IT</button>
    </div>
  `;

  /* ---------- NAV ---------- */
  const navHTML = `
    <nav class="nav" id="nav">
      <div class="nav__inner">
        <a href="${BASE}index.html" class="logo">
          <img src="${BASE}logo_dark.png" alt="ЦПО Европа" class="logo__img">
        </a>
        <div class="nav__cta">
          ${langSwitchHTML}
          <a href="${BASE}kontakti.html#contact-form" class="btn btn--sm hide-mobile">Запитване <span class="arrow">→</span></a>
          <button class="nav__menu-btn" id="menuOpen" aria-label="Меню">
            <span class="bars" aria-hidden="true"><span></span><span></span><span></span></span>
            <span class="menu-label">Меню</span>
          </button>
        </div>
      </div>
    </nav>
  `;

  /* ---------- MENU OVERLAY ---------- */
  const overlayHTML = `
    <div class="menu-overlay" id="menuOverlay" aria-hidden="true">
      <div class="menu-overlay__top">
        <a href="${BASE}index.html" class="logo">
          <img src="${BASE}logo_light.png" alt="ЦПО Европа" class="logo__img">
        </a>
        ${langSwitchHTML}
        <button class="menu-overlay__close" id="menuClose" aria-label="Затвори меню">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>
        </button>
      </div>
      <div class="menu-overlay__body">
        <nav class="menu-overlay__nav">
          <span class="mono">Карта на сайта</span>
          <ul>
            ${PAGES.map(p => `
              <li>
                <a href="${BASE}${p.href}">
                  <span class="label">${p.label}</span>
                  <span class="arrow">→</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>
        <aside class="menu-overlay__aside">
          <h5>Свържи се с нас</h5>
          <div class="contact-block">
            0882721739
          </div>
          <div class="links">
            <a href="mailto:educationalcluster5@gmail.com">educationalcluster5@gmail.com</a>
            <a href="https://maps.google.com/?q=ул.+Славянска+20,+София" target="_blank">гр. София, р-н Средец, ул. Славянска 20</a>
          </div>
          <p style="margin-top:32px">Център за професионално обучение към „Образователен клъстер – Европа“ ЕООД.</p>
        </aside>
      </div>
    </div>
  `;

  /* ---------- FOOTER ---------- */
  const footerHTML = `
    <footer>
      <div class="wrap">
        <div class="footer__top">
          <div>
            <a href="${BASE}index.html" class="logo">
              <img src="${BASE}logo_light.png" alt="ЦПО Европа" class="logo__img">
            </a>
            <p class="footer__intro">
              Център за професионално обучение към „Образователен клъстер – Европа“ ЕООД. Качествено, организирано и практически приложимо обучение.
            </p>
          </div>
          <div class="foot-col">
            <h5>Основно</h5>
            <a href="${BASE}index.html">Начало</a>
            <a href="${BASE}za-cpo.html">За ЦПО</a>
            <a href="${BASE}upravlenie.html">Управление</a>
            <a href="${BASE}priem.html">Прием и записване</a>
          </div>
          <div class="foot-col">
            <h5>Обучения</h5>
            <a href="${BASE}obucheniya.html">Професионални обучения</a>
            <a href="${BASE}profesii.html">Професии и специалности</a>
            <a href="${BASE}zbut.html">Обучения по ЗБУТ</a>
            <a href="${BASE}rabotodateli.html">За работодатели</a>
          </div>
          <div class="foot-col">
            <h5>Информация</h5>
            <a href="${BASE}kachestvo.html">Качество</a>
            <a href="${BASE}dokumenti.html">Документи</a>
            <a href="${BASE}kontakti.html">Контакти</a>
          </div>
          <div class="foot-col">
            <h5>Контакт</h5>
            <a href="tel:0882721739">0882721739</a>
            <a href="mailto:educationalcluster5@gmail.com">educationalcluster5@gmail.com</a>
            <a href="https://maps.google.com/?q=ул.+Славянска+20,+София" target="_blank">гр. София, р-н Средец, ул. Славянска 20</a>
          </div>
        </div>
        <div class="footer__bot">
          <div>© 2026 ЦПО Европа · EDU-CLUSTER EOOD</div>
          <div class="footer__bot__links">
            <a href="${BASE}dokumenti.html#poveritelnost">Политика за лични данни</a>
            <a href="${BASE}dokumenti.html#biskvitki">Политика за бисквитки</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Inject
  const navSlot = document.getElementById('site-nav');
  const footerSlot = document.getElementById('site-footer');
  if (navSlot) navSlot.innerHTML = navHTML + overlayHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;

  /* ---------- LANGUAGE: Google Translate (hidden) ---------- */
  const savedLang = localStorage.getItem('siteLang') || 'bg';
  const updateActiveLangButton = (lang) => {
    document.querySelectorAll('.lang-switch button[data-lang]').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  };
  updateActiveLangButton(savedLang);

  const gtHost = document.createElement('div');
  gtHost.id = 'google_translate_element';
  gtHost.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden';
  document.body.appendChild(gtHost);

  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'bg',
      includedLanguages: 'en,it,bg',
      autoDisplay: false
    }, 'google_translate_element');
    if (savedLang && savedLang !== 'bg') applyTranslateLang(savedLang);
  };

  const gtScript = document.createElement('script');
  gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  gtScript.async = true;
  document.body.appendChild(gtScript);

  function applyTranslateLang(lang) {
    let tries = 0;
    const id = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        clearInterval(id);
      } else if (++tries > 60) {
        clearInterval(id);
      }
    }, 100);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-switch button[data-lang]');
    if (!btn) return;
    const lang = btn.dataset.lang;
    const current = localStorage.getItem('siteLang') || 'bg';
    if (lang === current) return;
    if (lang === 'bg') {
      localStorage.removeItem('siteLang');
      window.location.reload();
      return;
    }
    localStorage.setItem('siteLang', lang);
    updateActiveLangButton(lang);
    applyTranslateLang(lang);
  });

  /* ---------- Behaviors ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu open/close
  const menu = document.getElementById('menuOverlay');
  const openBtn = document.getElementById('menuOpen');
  const closeBtn = document.getElementById('menuClose');
  const openMenu = () => { menu?.classList.add('open'); document.body.classList.add('menu-open'); menu?.setAttribute('aria-hidden', 'false') };
  const closeMenu = () => { menu?.classList.remove('open'); document.body.classList.remove('menu-open'); menu?.setAttribute('aria-hidden', 'true') };
  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  menu?.addEventListener('click', (e) => { if (e.target === menu) closeMenu() });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu() });

  // Reveal observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.r').forEach(el => io.observe(el));
  // Expose for dynamically-added rows
  window.__io = io;

  // Form floating labels + submit
  document.querySelectorAll('form[data-enquiry]').forEach(form => {
    form.querySelectorAll('input, textarea').forEach(el => {
      const f = el.closest('.field');
      if (!f) return;
      const sync = () => f.classList.toggle('filled', !!el.value);
      el.addEventListener('input', sync); el.addEventListener('change', sync);
      sync();
    });
    form.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', () => sel.classList.toggle('has-value', !!sel.value));
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach(el => {
        if (el.type === 'checkbox' ? !el.checked : !el.value.trim()) {
          ok = false;
          const wrap = el.closest('.field, .field--check, .field--select');
          wrap?.animate(
            [{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],
            {duration: 260}
          );
        }
      });
      if (!ok) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn?.innerHTML;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Изпращане…';
      }
      form.querySelector('.form-error')?.remove();

      const payload = {
        name:        form.querySelector('#f-name')?.value.trim() || '',
        phone:       form.querySelector('#f-phone')?.value.trim() || '',
        email:       form.querySelector('#f-email')?.value.trim() || '',
        interest:    form.querySelector('select')?.value || '',
        message:     form.querySelector('#f-msg')?.value.trim() || '',
        consent:     form.querySelector('input[type="checkbox"]')?.checked || false,
        submittedAt: new Date().toISOString(),
        page:        window.location.href
      };

      try {
        const res = await fetch('https://hook.eu2.make.com/tuenwliqhgnaesr3b86p8ybbtobjcqgj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.style.display = 'none';
        const success = form.parentElement.querySelector('.form-success');
        if (success) success.classList.add('show');
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        }
        const errEl = document.createElement('div');
        errEl.className = 'form-error';
        errEl.style.cssText = 'margin-top:12px; color:#c0392b; font-size:14px; line-height:1.5';
        errEl.textContent = 'Възникна грешка при изпращането. Моля, опитайте отново или ни се обадете на 0882721739.';
        submitBtn?.insertAdjacentElement('afterend', errEl);
      }
    });
  });
})();
