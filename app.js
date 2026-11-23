/**
 * ==========================================================================
 * APP.JS — INTERACTIVIDAD, TEMA, MOTION Y ACCESIBILIDAD
 * Germán Andrés Gómez — CV & Portafolio Editorial
 * Inspirado en el sistema de diseño visual de Invends Studio
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderScroll();
  initHeroMotion();
  initPrintHandlers();
  initMobileNav();
  initActiveNavObserver();
  initAgencyGradient();
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
 * 2. Header Scroll Motion (Transición fluida a Frosted Glass)
 * -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function syncScroll() {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', syncScroll, { passive: true });
  syncScroll();
}

/* --------------------------------------------------------------------------
 * 3. Hero Motion (Kinetic Reveal & Pointer Parallax 3D)
 * -------------------------------------------------------------------------- */
function initHeroMotion() {
  const hero = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');
  if (!hero || !heroContent) return;

  // Disparar reveal cinético suave
  requestAnimationFrame(() => {
    document.body.classList.add('hero-ready');
  });

  // Parallax 3D interactivo según la posición del cursor (desktop)
  if (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafTilt = null;

    function renderTilt() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      heroContent.style.transform = `perspective(1000px) rotateX(${-currentY * 3.5}deg) rotateY(${currentX * 4.5}deg) translate3d(${currentX * 8}px, ${currentY * 6}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        rafTilt = requestAnimationFrame(renderTilt);
      } else {
        rafTilt = null;
      }
    }

    hero.addEventListener(
      'pointermove',
      (e) => {
        const rect = hero.getBoundingClientRect();
        targetX = (e.clientX - rect.left) / rect.width - 0.5;
        targetY = (e.clientY - rect.top) / rect.height - 0.5;
        if (!rafTilt) {
          rafTilt = requestAnimationFrame(renderTilt);
        }
      },
      { passive: true }
    );

    hero.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafTilt) {
        rafTilt = requestAnimationFrame(renderTilt);
      }
    });
  }
}

/* --------------------------------------------------------------------------
 * 4. Atajos de Impresión (@media print)
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
 * 5. Menú Móvil Accesible
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
    document.documentElement.classList.toggle('nav-open', isOpen);
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
 * 6. Observador de Navegación Activa
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
 * 7. WebGL2 Fluid Agency Gradient (Gama Azul Ejecutiva / Deep Sapphire & Cobalt)
 *    Con fallback automático a Canvas 2D y respeto estricto a prefers-reduced-motion
 * -------------------------------------------------------------------------- */
const BRAND_WAVE_HEX = [
  '#040a16', // Azul noche abisal profundo
  '#0a1931', // Azul medianoche zafiro
  '#0e2246', // Azul cobalto profundo
  '#1d4ed8', // Azul real / zafiro
  '#2563eb', // Azul cobalto vibrante (Brand)
  '#3b82f6', // Azul eléctrico
  '#60a5fa', // Azul cielo sutil
];

const GRADIENT_PARAMS = {
  color1: BRAND_WAVE_HEX[0],
  color2: BRAND_WAVE_HEX[2],
  color3: BRAND_WAVE_HEX[4],
  color4: BRAND_WAVE_HEX[5],
  colorSize: 0.82,
  colorSpacing: 0.52,
  colorRotation: -0.381592653589793,
  colorSpread: 4.52,
  colorOffset: [-0.7741174697875977, -0.20644775390624992],
  displacement: 4.66,
  zoom: 0.72,
  spacing: 4.27,
  seed: -0.06,
  position: [-0.2816110610961914, -0.43914794921875],
  noiseSize: 0.5,
  noiseIntensity: 0.03,
};

function hexToRgb01(hex) {
  const h = hex.replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full.slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function rgb01ToHex(rgb) {
  const to = (v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0');
  return `#${to(rgb[0])}${to(rgb[1])}${to(rgb[2])}`;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function brandWaveColorAt(phase) {
  const stops = BRAND_WAVE_HEX.map(hexToRgb01);
  const n = stops.length;
  const x = ((phase % n) + n) % n;
  const i = Math.floor(x);
  const t = x - i;
  const a = stops[i];
  const b = stops[(i + 1) % n];
  return rgb01ToHex([lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]);
}

function soft(t, a, b, c, amp = 1) {
  return (Math.sin(t * a) * 0.5 + Math.sin(t * b + 1.3) * 0.32 + Math.sin(t * c + 2.7) * 0.18) * amp;
}

const VERTEX_SRC = `#version 300 es
in vec3 position;
out vec2 vPosition;
void main() {
  gl_Position = vec4(position, 1.);
  vPosition = position.xy;
}
`;

const NOISE_GLSL = `
vec3 gradientDerivativesNoise3DHash(vec3 p) {
  p = fract(p * vec3(.1031, .1030, .0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
}

vec4 gradientDerivativesNoise3D(in vec3 x) {
  vec3 p = floor(x);
  vec3 w = fract(x);
  vec3 u = w * w * w * (w * (w * 6.0 - 15.0) + 10.0);
  vec3 du = 30.0 * w * w * (w * (w - 2.0) + 1.0);

  vec3 ga = gradientDerivativesNoise3DHash(p + vec3(0.0, 0.0, 0.0));
  vec3 gb = gradientDerivativesNoise3DHash(p + vec3(1.0, 0.0, 0.0));
  vec3 gc = gradientDerivativesNoise3DHash(p + vec3(0.0, 1.0, 0.0));
  vec3 gd = gradientDerivativesNoise3DHash(p + vec3(1.0, 1.0, 0.0));
  vec3 ge = gradientDerivativesNoise3DHash(p + vec3(0.0, 0.0, 1.0));
  vec3 gf = gradientDerivativesNoise3DHash(p + vec3(1.0, 0.0, 1.0));
  vec3 gg = gradientDerivativesNoise3DHash(p + vec3(0.0, 1.0, 1.0));
  vec3 gh = gradientDerivativesNoise3DHash(p + vec3(1.0, 1.0, 1.0));

  float va = dot(ga, w - vec3(0.0, 0.0, 0.0));
  float vb = dot(gb, w - vec3(1.0, 0.0, 0.0));
  float vc = dot(gc, w - vec3(0.0, 1.0, 0.0));
  float vd = dot(gd, w - vec3(1.0, 1.0, 0.0));
  float ve = dot(ge, w - vec3(0.0, 0.0, 1.0));
  float vf = dot(gf, w - vec3(1.0, 0.0, 1.0));
  float vg = dot(gg, w - vec3(0.0, 1.0, 1.0));
  float vh = dot(gh, w - vec3(1.0, 1.0, 1.0));

  return vec4(
    va + u.x * (vb - va) + u.y * (vc - va) + u.z * (ve - va)
      + u.x * u.y * (va - vb - vc + vd) + u.y * u.z * (va - vc - ve + vg)
      + u.z * u.x * (va - vb - ve + vf)
      + (-va + vb + vc - vd + ve - vf - vg + vh) * u.x * u.y * u.z,
    ga + u.x * (gb - ga) + u.y * (gc - ga) + u.z * (ge - ga)
      + u.x * u.y * (ga - gb - gc + gd) + u.y * u.z * (ga - gc - ge + gg)
      + u.z * u.x * (ga - gb - ge + gf)
      + (-ga + gb + gc - gd + ge - gf - gg + gh) * u.x * u.y * u.z
      + du * (vec3(vb, vc, ve) - va + u.yzx * vec3(va - vb - vc + vd, va - vc - ve + vg, va - vb - ve + vf)
      + u.zxy * vec3(va - vb - ve + vf, va - vb - vc + vd, va - vc - ve + vg)
      + u.yzx * u.zxy * (-va + vb + vc - vd + ve - vf - vg + vh))
  );
}
`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform float colorSize;
uniform float colorSpacing;
uniform float colorRotation;
uniform float colorSpread;
uniform float displacement;
uniform float zoom;
uniform float spacing;
uniform float seed;
uniform vec2 viewportSize;
uniform vec2 colorOffset;
uniform vec2 transformPosition;
uniform float noiseSize;
uniform float noiseIntensity;

in vec2 vPosition;
out vec4 fragColor;

${NOISE_GLSL}

float hash(vec2 p) {
  p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
  return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
}

float computeNoise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

void main() {
  vec2 position = vPosition;
  float aspectX = viewportSize.y > 0.0 ? min(1., viewportSize.x / viewportSize.y) : 1.0;
  float aspectY = viewportSize.x > 0.0 ? min(1., viewportSize.y / viewportSize.x) : 1.0;
  position.x *= aspectX;
  position.y *= aspectY;
  position /= max(zoom, 0.0001);
  position += transformPosition;

  vec2 noiseLocalPosition = position * .5 + .5;
  vec4 n4 = gradientDerivativesNoise3D(vec3(noiseLocalPosition, seed));
  vec3 displacementNoise = n4.xyz;
  if (any(isnan(displacementNoise))) displacementNoise = vec3(0.0);

  vec4 n4b = gradientDerivativesNoise3D(
    vec3(noiseLocalPosition * 0.92 + vec2(0.31, -0.17), seed * 1.37 + 1.8)
  );
  if (!any(isnan(n4b.xyz))) {
    displacementNoise = mix(displacementNoise, n4b.xyz, 0.22);
  }

  float noise = computeNoise(vPosition * viewportSize / max(noiseSize, 0.0001));
  if (isnan(noise)) noise = 0.0;

  position += displacementNoise.xz * displacement;

  vec2 offsetedPosition = position;
  offsetedPosition -= colorOffset;
  offsetedPosition = mod(offsetedPosition - spacing, vec2(spacing * 2.)) - spacing;
  offsetedPosition = rotate(offsetedPosition, -colorRotation);
  offsetedPosition /= vec2(max(colorSize, 0.0001), max(colorSize, 0.0001));
  offsetedPosition *= vec2(1. / max(colorSpread, 0.0001), 1.);

  vec3 color = vec3(0.);
  color = mix(color1, color, smoothstep(0., 1., distance(offsetedPosition, vec2(0., colorSpacing * 1.5))));
  color = mix(color2, color, smoothstep(0., 1., distance(offsetedPosition, vec2(0., colorSpacing * .5))));
  color = mix(color3, color, smoothstep(0., 1., distance(offsetedPosition, vec2(0., -colorSpacing * .5))));
  color = mix(color4, color, smoothstep(0., 1., distance(offsetedPosition, vec2(0., -colorSpacing * 1.5))));

  color += noise * noiseIntensity;
  color = clamp(color, 0., 1.);

  fragColor = vec4(color, 1.);
}
`;

function initAgencyGradient() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  let gl = null;
  try {
    gl = canvas.getContext('webgl2', {
      antialias: true,
      alpha: false,
      depth: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
  } catch (e) {
    gl = null;
  }

  // Fallback transparente a 2D en navegadores antiguos
  if (!gl) {
    init2DFallback(canvas);
    return;
  }

  function compileShader(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const err = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error(err || 'Shader compile error');
    }
    return sh;
  }

  let program = null;
  try {
    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Program link error');
    }
  } catch (err) {
    console.warn('WebGL2 Gradient fallback to 2D:', err);
    init2DFallback(canvas);
    return;
  }

  const vao = gl.createVertexArray();
  const buf = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
    gl.STATIC_DRAW
  );
  const loc = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);

  const u = {
    color1: gl.getUniformLocation(program, 'color1'),
    color2: gl.getUniformLocation(program, 'color2'),
    color3: gl.getUniformLocation(program, 'color3'),
    color4: gl.getUniformLocation(program, 'color4'),
    colorSize: gl.getUniformLocation(program, 'colorSize'),
    colorSpacing: gl.getUniformLocation(program, 'colorSpacing'),
    colorRotation: gl.getUniformLocation(program, 'colorRotation'),
    colorSpread: gl.getUniformLocation(program, 'colorSpread'),
    displacement: gl.getUniformLocation(program, 'displacement'),
    zoom: gl.getUniformLocation(program, 'zoom'),
    spacing: gl.getUniformLocation(program, 'spacing'),
    seed: gl.getUniformLocation(program, 'seed'),
    viewportSize: gl.getUniformLocation(program, 'viewportSize'),
    colorOffset: gl.getUniformLocation(program, 'colorOffset'),
    transformPosition: gl.getUniformLocation(program, 'transformPosition'),
    noiseSize: gl.getUniformLocation(program, 'noiseSize'),
    noiseIntensity: gl.getUniformLocation(program, 'noiseIntensity'),
  };

  const params = { ...GRADIENT_PARAMS };
  const baseSeed = params.seed;
  const basePosition = [...params.position];
  const baseColorRotation = params.colorRotation;
  const baseDisplacement = params.displacement;
  let elapsed = 0;
  let lastNow = performance.now();
  let rafId = null;
  let isVisible = true;
  let cssW = 1;
  let cssH = 1;

  function resize() {
    cssW = Math.max(1, canvas.clientWidth || window.innerWidth);
    cssH = Math.max(1, canvas.clientHeight || 750);
    if (canvas.width !== cssW || canvas.height !== cssH) {
      canvas.width = cssW;
      canvas.height = cssH;
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  function draw() {
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform3fv(u.color1, hexToRgb01(params.color1));
    gl.uniform3fv(u.color2, hexToRgb01(params.color2));
    gl.uniform3fv(u.color3, hexToRgb01(params.color3));
    gl.uniform3fv(u.color4, hexToRgb01(params.color4));
    gl.uniform1f(u.colorSize, params.colorSize);
    gl.uniform1f(u.colorSpacing, params.colorSpacing);
    gl.uniform1f(u.colorRotation, params.colorRotation);
    gl.uniform1f(u.colorSpread, params.colorSpread);
    gl.uniform1f(u.displacement, params.displacement);
    gl.uniform1f(u.zoom, params.zoom);
    gl.uniform1f(u.spacing, params.spacing);
    gl.uniform1f(u.seed, params.seed);
    gl.uniform2f(u.viewportSize, cssW, cssH);
    gl.uniform2fv(u.colorOffset, params.colorOffset);
    gl.uniform2fv(u.transformPosition, params.position);
    gl.uniform1f(u.noiseSize, params.noiseSize);
    gl.uniform1f(u.noiseIntensity, params.noiseIntensity);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  }

  function loop(now) {
    if (!isVisible) {
      rafId = null;
      return;
    }

    const dt = Math.min(0.05, (now - lastNow) / 1000);
    lastNow = now;
    elapsed += dt;
    const t = elapsed;

    params.seed = baseSeed + t * 0.035 + soft(t, 0.09, 0.14, 0.05, 0.012);
    params.position = [
      basePosition[0] + soft(t, 0.055, 0.088, 0.038, 0.022),
      basePosition[1] + soft(t + 2.4, 0.048, 0.076, 0.032, 0.018),
    ];
    params.colorRotation = baseColorRotation + soft(t + 1.1, 0.028, 0.044, 0.018, 0.018);
    params.displacement = baseDisplacement * (1 + soft(t + 3.2, 0.032, 0.05, 0.022, 0.022));

    const subtle = soft(t, 0.04, 0.07, 0.03, 0.4);
    params.color1 = '#040a16';
    params.color2 = brandWaveColorAt(1.0 + subtle);
    params.color3 = brandWaveColorAt(3.5 + subtle * 0.8);
    params.color4 = brandWaveColorAt(4.8 + subtle * 0.5);

    draw();
    rafId = requestAnimationFrame(loop);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !rafId) {
        lastNow = performance.now();
        loop(lastNow);
      }
    },
    { threshold: 0 }
  );

  observer.observe(canvas);
  loop(performance.now());
}

/* --------------------------------------------------------------------------
 * Fallback Canvas 2D (Para navegadores o entornos sin WebGL2)
 * -------------------------------------------------------------------------- */
function init2DFallback(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight || 750);

  function resize() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resize, { passive: true });

  let t = 0;
  function draw2D() {
    t += 0.015;
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#040a16');
    grad.addColorStop(0.5, '#1e40af');
    grad.addColorStop(1, '#3b82f6');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    requestAnimationFrame(draw2D);
  }
  draw2D();
}
