document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL REVEAL ANIMATION ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('#mainNav .nav-link:not(.dropdown-toggle)');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
    const projToggle = document.querySelector('#projectDropdown');
    if (projToggle) {
      if (current === 'project') {
        projToggle.classList.add('active');
      } else {
        projToggle.classList.remove('active');
      }
    }
  });

  /* ── CLOSE MOBILE NAV ON LINK CLICK ── */
  document.querySelectorAll('#navMenu .nav-link, #navMenu .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getInstance(menu)?.hide();
      }
    });
  });

  /* ── PREVENT PROJECT DROPDOWN TOGGLE FROM NAVIGATING ── */
  document.querySelector('#projectDropdown')?.addEventListener('click', function (e) {
    e.preventDefault();
  });

  /* ── CONTENT TABS (if present on page) ── */
  document.querySelectorAll('.content-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.content-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-pane-content').forEach(pane => {
        if (pane.id === 'tab-' + target) pane.classList.add('active');
        else if (pane.id.startsWith('tab-')) pane.classList.remove('active');
      });
    });
  });

});