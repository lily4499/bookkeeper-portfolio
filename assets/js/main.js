document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ──────────────────────────────────────────────
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) link.classList.add('active');
  });

  // ── Scroll shadow on sticky header ──────────────────────────────
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile hamburger menu (injected dynamically) ─────────────────
  const navEl    = document.querySelector('.nav');
  const navLinks = document.querySelector('.nav-links');
  if (navEl && navLinks) {
    const btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    navEl.appendChild(btn);

    const openMenu  = () => { navLinks.classList.add('open');    btn.classList.add('open');    btn.setAttribute('aria-expanded', 'true');  };
    const closeMenu = () => { navLinks.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };

    btn.addEventListener('click', e => {
      e.stopPropagation();
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close when a link is clicked (e.g. anchor jump)
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navEl.contains(e.target)) closeMenu();
    });
  }

});
