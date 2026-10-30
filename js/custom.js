(function ($) {
  "use strict";

  $('.navbar').headroom();

  $(function () {
    $('.nav-link, .custom-btn-link, .footer a[href^="#"]').on('click', function (event) {
      var $anchor = $(this);
      var target = $($anchor.attr('href'));
      if (target.length) {
        $('html, body').stop().animate({ scrollTop: target.offset().top - 69 }, 700);
        $('.navbar-collapse').collapse('hide');
        event.preventDefault();
      }
    });
  });

  $('.social-links a').tooltip();

  // The painted waves travel gently with the visitor's scroll position.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var waveFrame;
    var updateWaves = function () {
      var travel = Math.min(window.scrollY * 0.045, 120);
      var sway = Math.sin(window.scrollY * 0.003) * 10;
      document.documentElement.style.setProperty('--wave-scroll', travel + 'px');
      document.documentElement.style.setProperty('--wave-sway', sway + 'px');
      waveFrame = null;
    };

    window.addEventListener('scroll', function () {
      if (!waveFrame) waveFrame = window.requestAnimationFrame(updateWaves);
    }, { passive: true });
    updateWaves();

    // Alternate the wave depth as each landscape chapter comes into view.
    var sections = Array.prototype.slice.call(document.querySelectorAll('main > section'));
    var waveObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          var index = sections.indexOf(entry.target);
          var forward = index % 2 === 0;
          document.documentElement.style.setProperty('--wave-scale', forward ? '1.34' : '1.12');
          document.documentElement.style.setProperty('--wave-opacity', forward ? '.8' : '.64');
          document.documentElement.style.setProperty('--wave-focus', forward ? '1.36' : '1.12');
        }
      });
    }, { threshold: [0.55] });
    sections.forEach(function (section) { waveObserver.observe(section); });
  }
})(jQuery);
