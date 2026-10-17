(function () {
  var doc = document;
  var nav = doc.getElementById('mainNav');
  var toggle = doc.getElementById('navToggle');

  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  doc.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  var y = doc.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // Download tracking
  doc.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    var url = link.getAttribute('href');
    if (!url || !/\.(exe|msi|zip|deb|dmg|pkg|pdf)$/i.test(url)) return;
    if (typeof gtag === 'function') {
      gtag('event', 'download_file', {
        file_url: url,
        file_name: url.split('/').pop(),
        file_extension: url.split('.').pop().toLowerCase(),
        page_title: doc.title,
        page_location: window.location.href
      });
    }
  });
})();
