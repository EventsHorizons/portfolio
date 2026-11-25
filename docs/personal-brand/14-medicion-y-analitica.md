# 14. Marco de Medición, Métricas Clave (KPIs) y Analítica

---

## 1. Principios de Analítica Austera y Respeto a la Privacidad
Para un portafolio profesional de alto nivel, no se recomienda saturar el sitio con banners intrusivos de cookies ni scripts de rastreo pesados (Google Analytics 4 infla el bundle y reduce la puntuación en Core Web Vitals).

**Solución Recomendada:**
- **Vercel Web Analytics / Speed Insights:** Integración nativa a nivel de servidor edge en Vercel, sin cookies, sin impacto en el rendimiento y 100% compatible con RGPD/privacidad.
- **Plausible Analytics / Umami (Opcional):** Para métricas agregadas de código abierto si se desea auto-hospedar.

---

## 2. Eventos de Conversión Clave a Medir

```
[Visita al Portafolio]
         │
         ├───► Evento 1: Clic en "Descargar CV (PDF)" (Objetivo: Reclutadores)
         ├───► Evento 2: Clic en "Iniciar Contacto" (WhatsApp preconfigurado)
         ├───► Evento 3: Clic en enlace a Repositorio GitHub (Auditoría técnica)
         ├───► Evento 4: Clic en "Ver sitio en vivo" de Casos de Estudio
         └───► Evento 5: Impresión / Guardado en PDF (@media print)
```

---

## 3. Metas y Cuadro de Mando Mensual (Dashboard)

| Indicador (KPI) | Meta Mes 1 | Meta Mes 2 | Meta Mes 3 | Fuente de Datos |
| :--- | :--- | :--- | :--- | :--- |
| **Visitas Únicas Mensuales** | 150+ | 350+ | 700+ | Vercel Analytics |
| **Descargas de CV (PDF)** | 15 | 35 | 60+ | Eventos en app.js / Vercel |
| **Clics a Repositorios GitHub** | 25 | 60 | 120+ | GitHub Insights / Vercel |
| **Conversaciones de Empleo Iniciadas** | 2 | 5 | 8+ | WhatsApp / Correo / LinkedIn |
| **Puntuación Core Web Vitals** | 95+ | 98+ | 100 | Google PageSpeed Insights |
| **Posición en Google para "Germán Andrés Gómez"** | Top 5 | Top 2 | #1 Absoluto | Google Search Console |

---

## 4. Implementación Ligera de Rastreo de Eventos en JavaScript

En `app.js` se pueden registrar clics en los botones principales sin librerías externas utilizando eventos sencillos:

```javascript
document.querySelectorAll('a[download], .print-trigger, a[href*="wa.me"]').forEach(el => {
  el.addEventListener('click', (e) => {
    const label = el.getAttribute('aria-label') || el.innerText.trim();
    if (window.va) { // Vercel Analytics nativo
      window.va('event', { name: 'conversion_click', data: { target: label } });
    }
  });
});
```
