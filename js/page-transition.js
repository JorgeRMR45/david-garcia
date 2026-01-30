// page-transition.js
// Maneja la transición y la navegación entre páginas

const transition = document.getElementById("page-transition");
const transitionText = document.getElementById("transition-text");

function goTo(url, label) {
  if (!transition) {
    window.location.href = url;
    return;
  }

  if (transitionText && label) {
    transitionText.textContent = label.toUpperCase();
  }

  // mostrar overlay
  gsap.to(transition, {
    y: "0%",
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      window.location.href = url;
    }
  });
}

// al cargar la página, esconder overlay
window.addEventListener("load", () => {
  if (!transition) return;

  gsap.set(transition, { y: "0%" });

  gsap.to(transition, {
    y: "100%",
    duration: 0.6,
    ease: "power2.inOut",
    delay: 0.2
  });
});
