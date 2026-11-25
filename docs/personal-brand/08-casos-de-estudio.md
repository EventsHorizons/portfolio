# 08. Casos de Estudio: Fichas Técnicas de Proyectos

---

## Caso 01: Invends — Creative Studio
- **Naturaleza:** Plataforma web para estudio de diseño y branding digital.
- **Rol de Germán:** Lead Frontend Developer & UI Architect.
- **Stack Técnico:** Nuxt 3 (Vue 3), TypeScript, Shaders WebGL de GPU, Tailwind CSS, SSR, Vercel Edge.
- **El Problema:** La mayoría de los sitios de agencias creativas sufren de lentitud severa por exceso de animaciones y nulo posicionamiento orgánico.
- **La Solución de Ingeniería:** Implementación de renderizado híbrido (SSR) con hidratación diferida. Los fondos cinéticos operan mediante shaders WebGL ejecutados en la GPU sin bloquear el hilo principal de JavaScript, logrando una tasa fluida de 60 FPS y una puntuación Lighthouse de 98/100.
- **Enlaces:** [Sitio en Vivo](https://invends.vercel.app/) · [Repositorio GitHub](https://github.com/EventsHorizons/invends-agency)

---

## Caso 02: Scelerity — Digital Products
- **Naturaleza:** Plataforma de presentación de productos digitales y diseño contemporáneo.
- **Rol de Germán:** Lead Frontend & UI Designer.
- **Stack Técnico:** Next.js (App Router), React, TypeScript, Tailwind CSS, Vercel.
- **El Problema:** Comunicar sofisticación y tecnología sin recurrir a plantillas genéricas sobrecargadas.
- **La Solución de Ingeniería:** Arquitectura de componentes atómicos con TypeScript estricto. Sistema tipográfico editorial con contraste riguroso y transiciones visuales limpias basadas en CSS puro para minimizar el peso del bundle JavaScript.
- **Enlaces:** [Sitio en Vivo](https://scelerity.vercel.app/) · [Repositorio GitHub](https://github.com/EventsHorizons/Scelerity)

---

## Caso 03: Portal Institucional — Unidad Nacional de Protección (UNP)
- **Naturaleza:** Modernización del portal gubernamental de una entidad de seguridad de Estado.
- **Rol de Germán:** Junior Front-End Developer.
- **Stack Técnico:** Angular 17+, Standalone Components, TypeScript, SCSS, Arquitectura Modular.
- **El Problema:** Plataforma legacy con problemas de accesibilidad ciudadana, tiempos de carga lentos y vulnerabilidades de seguridad identificadas en reportes oficiales.
- **La Solución de Ingeniería:** Migración hacia la arquitectura moderna de componentes standalone de Angular 17+, eliminando NgModules obsoletos, implementando patrones de accesibilidad WCAG AA y participando en la remediación de riesgos de ciberseguridad web.
- **Enlaces:** [Repositorio GitHub](https://github.com/EventsHorizons/web-unp)

---

## Caso 04: 3Drawers — 3D & Digital Studio
- **Naturaleza:** Experiencia interactiva tridimensional inmersiva en la web.
- **Rol de Germán:** Frontend & 3D Web Developer.
- **Stack Técnico:** Next.js, Three.js, React Three Fiber (R3F), GSAP, WebGL.
- **El Problema:** Los gráficos 3D en la web suelen colapsar en dispositivos móviles debido al consumo excesivo de memoria.
- **La Solución de Ingeniería:** Optimización poligonal de modelos glTF/GLB, compresión Draco y limitación adaptativa del Pixel Ratio según las capacidades del dispositivo del usuario.
- **Enlaces:** [Repositorio GitHub](https://github.com/EventsHorizons/3drawers-studio)

---

## Caso 05: Unfold — Learning OS
- **Naturaleza:** Plataforma integral de gestión de rutas de aprendizaje académico.
- **Rol de Germán:** Full-Stack Developer.
- **Stack Técnico:** Next.js, NestJS, TypeScript, PostgreSQL, REST APIs.
- **El Problema:** Estudiantes universitarios enfrentan desorganización en el seguimiento de materias, tareas y recursos pedagógicos dispersos.
- **La Solución de Ingeniería:** Creación de un backend desacoplado con NestJS bajo arquitectura en capas y frontend reactivo en Next.js, garantizando tipado compartido entre cliente y servidor.
- **Enlaces:** [Repositorio GitHub](https://github.com/EventsHorizons/unfold)

---

## Caso 06: Jera — Control de Gastos Personales
- **Naturaleza:** Aplicación web progresiva móvil-first para finanzas personales.
- **Rol de Germán:** Full-Stack Developer & UI Designer.
- **Stack Técnico:** Next.js, Supabase (PostgreSQL + Realtime Auth), Tailwind CSS.
- **El Problema:** Las herramientas financieras existentes son complejas, requieren demasiados clics para registrar un gasto y tienen interfaces saturadas de publicidad.
- **La Solución de Ingeniería:** Interfaz optimizada para pulgar (thumb-driven UI), sincronización en tiempo real vía WebSockets con Supabase y persistencia optimista para permitir registros instantáneos en menos de dos segundos.
- **Enlaces:** [Repositorio GitHub](https://github.com/EventsHorizons/jera)
