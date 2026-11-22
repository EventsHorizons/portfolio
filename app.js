/**
 * ==========================================================================
 * APP.JS — INTERACTIVIDAD, TEMA Y ACCESIBILIDAD
 * Germán Andrés Gómez — CV & Portafolio Editorial
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initPrintHandlers();
  initMobileNav();
  initActiveNavObserver();
  initAmbientCanvas();
});

/* --------------------------------------------------------------------------
 * 1. Control y Persistencia del Tema (Dark / Light)
 * -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const sunIcon = toggleBtn.querySelector('.sun-icon');
  const moonIcon = toggleBtn.querySelector('.moon-icon');

  function updateIcons(theme) {
    if (theme === 'light') {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      toggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    } else {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      toggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    }
  }

  // Leer tema inicial
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateIcons(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme');
    const next = active === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch (e) {}
    updateIcons(next);
  });
}

/* --------------------------------------------------------------------------
 * 2. Atajos de Impresión (@media print)
 * -------------------------------------------------------------------------- */
function initPrintHandlers() {
  const triggers = document.querySelectorAll('.print-trigger');
  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      window.print();
    });
  });
}

/* --------------------------------------------------------------------------
 * 3. Menú Móvil Accesible
 * -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  function toggle(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    drawer.setAttribute('aria-hidden', (!isOpen).toString());
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  }

  toggleBtn.addEventListener('click', () => toggle());

  const links = drawer.querySelectorAll('.mobile-nav-link, a, button');
  links.forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });

  // Cerrar al pulsar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggle(false);
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
 * 4. Observador de Navegación Activa
 * -------------------------------------------------------------------------- */
function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { rootMargin: '-25% 0px -65% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
 * 5. Canvas Ambiental Sutil (Efecto de Ondas y Partículas)
 *    Respeta estrictamente prefers-reduced-motion
 * -------------------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  // Si el usuario prefiere reducir movimiento, no ejecutar animación
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight || 600);

  function resize() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize, { passive: true });

  // Crear nodos de partículas flotantes
  const count = Math.min(28, Math.floor(width / 45));
  const nodes = [];

  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.2,
    });
  }

  let animationId = null;
  let isVisible = true;

  // Pausar si no es visible en pantalla
  const io = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !animationId) {
        loop();
      }
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  function loop() {
    if (!isVisible) {
      animationId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const pointColor = isDark ? 'rgba(184, 166, 255, 0.45)' : 'rgba(138, 104, 255, 0.25)';
    const lineColor = isDark ? 'rgba(138, 104, 255, 0.08)' : 'rgba(138, 104, 255, 0.05)';

    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = pointColor;
      ctx.fill();

      // Líneas de conexión entre puntos cercanos
      for (let j = i + 1; j < nodes.length; j++) {
        const p2 = nodes[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(loop);
  }

  loop();
}
