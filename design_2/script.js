// Kierra's K9 Training — neobrutalist direction
// The marquee is pure CSS animation; this just pauses it on hover/focus
// for readability, and respects reduced-motion via the stylesheet already.
(function () {
  var band = document.querySelector('.marquee-band');
  var track = document.querySelector('.marquee-track');
  if (!band || !track) return;

  band.addEventListener('mouseenter', function () {
    track.style.animationPlayState = 'paused';
  });
  band.addEventListener('mouseleave', function () {
    track.style.animationPlayState = 'running';
  });
})();
