(function ($) {
  "use strict";

  $('.navbar').headroom();
  $('.social-links a').tooltip();

  var stage = document.querySelector('main');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Navigation moves through the horizontal landscape.
  $('.nav-link, .custom-btn-link, .footer a[href^="#"]').on('click', function (event) {
    var selector = $(this).attr('href');
    var target = document.querySelector(selector);
    if (target && stage) {
      event.preventDefault();
      stage.scrollTo({ left: target.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
      $('.navbar-collapse').collapse('hide');
    }
  });

  if (!stage) return;

  // A vertical wheel gesture advances the horizontal presentation.
  stage.addEventListener('wheel', function (event) {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      var panel = event.target.closest('section > .container');
      var panelCanScroll = panel && panel.scrollHeight > panel.clientHeight + 2;
      var movingDownInside = panelCanScroll && event.deltaY > 0 && panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2;
      var movingUpInside = panelCanScroll && event.deltaY < 0 && panel.scrollTop > 2;
      if (movingDownInside || movingUpInside) return;
      event.preventDefault();
      stage.scrollLeft += event.deltaY;
    }
  }, { passive: false });

  var scrollCue = document.querySelector('.scroll-cue');
  stage.addEventListener('scroll', function () {
    if (scrollCue) scrollCue.classList.toggle('is-hidden', stage.scrollLeft > 40);
  }, { passive: true });
})(jQuery);
