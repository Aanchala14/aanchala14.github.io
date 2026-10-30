(function ($) {
  "use strict";

  // COLOR MODE
  $('.color-mode').click(function () {
    $('.color-mode-icon').toggleClass('active');
    $('body').toggleClass('dark-mode');
    $(this).attr('aria-pressed', $('body').hasClass('dark-mode'));
  });

  // HEADER
  $('.navbar').headroom();

  // SMOOTH SCROLL
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

  // TOOLTIP
  $('.social-links a').tooltip();

  // Move the painted waves gently as the page scrolls.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var waveFrame;
    var updateWaves = function () {
      var travel = Math.min(window.scrollY * 0.035, 90);
      document.documentElement.style.setProperty('--wave-scroll', travel + 'px');
      waveFrame = null;
    };

    window.addEventListener('scroll', function () {
      if (!waveFrame) waveFrame = window.requestAnimationFrame(updateWaves);
    }, { passive: true });
    updateWaves();
  }
})(jQuery);
