// hero-slider.js
// Transición diagonal tipo cine (clip-path) + loop infinito cada 10s
// Versión: texto del hero permanece siempre por encima

const videos = document.querySelectorAll('.bg-video');
let current = 0;
const DURATION_MS = 10000; // 10 segundos por video
const CLIP_ANIM_SECONDS = 1.4; // duración de la animación diagonal

// Inicialización: pausamos todos excepto el primero
videos.forEach((video, index) => {
  try { video.pause(); } catch (e) {}
  video.currentTime = 0;
  video.preload = "auto";

  // quitar cualquier clip residual
  video.style.clipPath = 'none';
  video.classList.remove('next');

  if (index === 0) {
    video.classList.add('active');
    video.play().catch(() => {});
  } else {
    video.classList.remove('active');
  }
});

// Animación: el video siguiente entra con clip-path diagonal y reemplaza al actual
function switchVideo(nextIndex) {
  if (nextIndex === current) return;

  const currentVideo = videos[current];
  const nextVideo = videos[nextIndex];

  // preparar siguiente
  nextVideo.currentTime = 0;
  nextVideo.classList.add('next');
  nextVideo.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
  nextVideo.play().catch(() => {});

  // animar clip-path desde columna estrecha a cobertura total
  gsap.fromTo(
    nextVideo,
    { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: CLIP_ANIM_SECONDS,
      ease: 'power2.inOut',
      onComplete: () => {
        // swap definitivo: el nuevo pasa a active, el viejo se pausa y se limpia
        try { currentVideo.pause(); } catch (e) {}
        currentVideo.classList.remove('active');
        currentVideo.style.clipPath = 'none';

        nextVideo.classList.remove('next');
        nextVideo.classList.add('active');
        nextVideo.style.clipPath = 'none';

        current = nextIndex;
      }
    }
  );
}

// Loop infinito: cada DURATION_MS hacemos la transición al siguiente video
let loopTimer = setInterval(() => {
  const next = (current + 1) % videos.length;
  switchVideo(next);
}, DURATION_MS);

// Optional: si necesitas detenerlo desde consola -> clearInterval(loopTimer);
