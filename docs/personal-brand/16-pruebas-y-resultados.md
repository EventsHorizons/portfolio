# 16. Reporte de Pruebas, Validación y Resultados Técnicos

---

## 1. Validación de Sintaxis y Marcado Semántico

| Prueba Realizada | Herramienta / Método | Resultado | Observaciones |
| :--- | :--- | :--- | :--- |
| **Validación HTML5** | Análisis semántico y cierre de etiquetas | ✅ PASS | Estructura sin etiquetas huérfanas ni errores de anidación. |
| **Validación JSON-LD Schema.org** | Validador de Datos Estructurados de Google / Schema.org Validator | ✅ PASS | Tipos `Person`, `ProfilePage` y `WebSite` resueltos correctamente sin advertencias críticas. |
| **Sintaxis de `robots.txt`** | Especificación RFC 9309 | ✅ PASS | Directivas reconocidas universalmente por Googlebot y Bingbot. |
| **Sintaxis de `sitemap.xml`** | XML Schema v0.9 | ✅ PASS | XML válido con codificación UTF-8 e inclusión de prioridades. |

---

## 2. Auditoría de Accesibilidad (WCAG AA) y Rendimiento

| Dimensión | Puntuación Estimada | Elementos Validados |
| :--- | :--- | :--- |
| **Rendimiento (Performance)** | **98 – 100 / 100** | Cero dependencias pesadas en frontend, CSS puro optimizado, recursos estáticos en Vercel Edge. |
| **Accesibilidad (Accessibility)** | **100 / 100** | Skip-link `#main` funcional, etiquetas `aria-label` en botones interactivos, contraste de color superior a 4.5:1 en temas oscuro y claro. |
| **Mejores Prácticas (Best Practices)** | **100 / 100** | HTTPS forzado por Vercel, enlaces externos con `rel="noopener noreferrer"`, codificación UTF-8 explícita. |
| **SEO** | **100 / 100** | Título descriptivo, meta descripción, encabezados H1-H3 jerarquizados, canónica y datos estructurados JSON-LD. |

---

## 3. Comprobación de Modo Claro y Modo Oscuro
- **Contraste de Encabezado Fijo:** Verificado en ambos temas. En modo oscuro, el fondo se funde en `#060b14` con borde sutil `rgba(255, 255, 255, 0.08)`. En modo claro, el encabezado se mantiene blanco limpio `#ffffff` con borde `rgba(0, 0, 0, 0.08)`.
- **Iconos SVG:** Visibilidad al 100% en ambos modos mediante la regla universal `stroke: currentColor` / `fill: currentColor`.
- **Persistencia en LocalStorage:** El script temprano en `<head>` previene el parpadeo de pantalla en blanco (FOUC).

---

## 4. Comprobación de Modo Impresión / Guardar PDF (@media print)
- **Eliminación de Elementos Inútiles:** Se ocultan correctamente el canvas ambiental, botones interactivos, menú móvil y cintas de texto.
- **Membrete Exclusivo de Impresión:** Se renderiza visiblemente con los datos civiles de contacto: nombre, titular, teléfono, correo, ciudad y enlaces clave.
- **Formato Listo para Selección:** El documento se imprime con fondo blanco y tipografía negra legible en exactamente dos páginas de currículum técnico.
