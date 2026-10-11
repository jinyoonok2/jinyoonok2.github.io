// Freeze the current GIF frame so visitors can read without continuous motion.
document.querySelectorAll('[data-motion]').forEach((image) => {
  const button = image.parentElement.querySelector('.motion-toggle');
  const canvas = document.createElement('canvas');
  canvas.hidden = true;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', image.alt);
  image.after(canvas);
  let paused = false;
  function toggle() {
    if (!image.complete || !image.naturalWidth) return;
    if (!paused) {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
    }
    paused = !paused;
    canvas.hidden = !paused;
    image.hidden = paused;
    button.textContent = paused ? 'Play animation' : 'Pause animation';
    button.setAttribute('aria-pressed', String(paused));
  }
  button.hidden = false;
  button.addEventListener('click', toggle);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function honorPreference() { if (reducedMotion.matches && !paused) toggle(); }
  image.addEventListener('load', honorPreference);
  reducedMotion.addEventListener('change', honorPreference);
  honorPreference();
});
