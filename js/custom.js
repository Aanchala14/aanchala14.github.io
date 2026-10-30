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
  }
})(jQuery);
