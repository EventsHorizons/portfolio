# 05. Auditoría de SEO Técnico, Indexabilidad y Presencia Digital

**Sitio Web Auditado:** [https://andresgomez.vercel.app/](https://andresgomez.vercel.app/)  
**Dominio Aliado Vercel:** [https://portfolio-gh-pages.vercel.app/](https://portfolio-gh-pages.vercel.app/)  
**Fecha de Auditoría:** Noviembre 2026  
**Responsable:** Gemini Neon

---

## 1. Diagnóstico Técnico Inicial (Antes de la Intervención)

| Parámetro SEO | Estado Previo | Diagnóstico Crítico |
| :--- | :--- | :--- |
| **`robots.txt`** | ❌ Ausente (Error 404) | Los motores de búsqueda no tenían directivas formales de rastreo ni referencia al sitemap. |
| **`sitemap.xml`** | ❌ Ausente (Error 404) | Imposibilidad de que Google rastree eficientemente las secciones y determine prioridades de actualización. |
| **URL Canónica** | ❌ Ausente | Riesgo de canibalización y contenido duplicado entre `andresgomez.vercel.app` y `portfolio-gh-pages.vercel.app`. |
| **Datos Estructurados (Schema.org)** | ❌ Inexistentes | Google no podía asociar el sitio a una persona física profesional (`Person`), su rol, formación o perfiles de GitHub y LinkedIn. |
| **Etiquetas Open Graph & Twitter** | ⚠️ Parciales | Título inflado desalineado con la realidad profesional; falta de meta `og:url` canónica. |
| **Jerarquía de Encabezados (H1 - H3)** | ⚠️ Desorden semántico | H1 orientado a eslogan estético ("El arte de simplificar") sin incluir las palabras clave principales de identidad y rol. |
| **Rendimiento Core Web Vitals** | ✅ Excelente (HTML/CSS estático) | Tiempos de respuesta ultra bajos y LCP inferior a 0.8s gracias a despliegue en Vercel Edge. |

---

## 2. Correcciones Técnicas Implementadas en el Repositorio

### 2.1 Creación de `robots.txt`
Se generó el archivo `robots.txt` en la raíz del proyecto:
```txt
User-agent: *
Allow: /

Sitemap: https://andresgomez.vercel.app/sitemap.xml
```

### 2.2 Creación de `sitemap.xml`
Se implementó el mapa de sitio XML oficial detallando todas las secciones clave con sus prioridades de indexación y frecuencia de actualización.

### 2.3 Implementación de URL Canónica y Metadatos Reorientados
Se fijó la ruta canónica única:
```html
<link rel="canonical" href="https://andresgomez.vercel.app/">
```
Se ajustaron los títulos para combinar marca personal con intención de búsqueda:
- **Title:** `Germán Andrés Gómez — Frontend Engineer & Digital Product Developer | UI/UX`
- **Description:** `Portafolio profesional de Germán Andrés Gómez Colmenares. Frontend Engineer y creador de productos digitales especializado en arquitecturas web modernas (React, Next.js, Angular, TypeScript) y diseño UI/UX en Bogotá, Colombia.`

### 2.4 Inyección de Datos Estructurados Schema.org (JSON-LD)
Se insertó un bloque JSON-LD con los esquemas `Person` y `ProfilePage`:
- Vinculación de nombre completo: *Germán Andrés Gómez Colmenares* y variantes *Andrés Gómez*, *Germán Gómez*.
- Rol técnico: *Frontend Engineer & Digital Product Developer*.
- Ubicación verificada: *Bogotá, Colombia*.
- Entidades educativas: *Universidad Minuto de Dios* y *SENA*.
- Entidad empleadora actual: *Unidad Nacional de Protección*.
- Perfiles oficiales vinculados: `github.com/EventsHorizons` y `linkedin.com/in/german-gomez`.
- Habilidades técnicas y tecnologías (`knowsAbout`).

---

## 3. Estrategia de Autoridad y Backlinks (Off-Page SEO)

Para que el dominio `andresgomez.vercel.app` alcance la primera página de Google para la búsqueda "Germán Andrés Gómez", se requiere consolidar los siguientes enlaces entrantes:

1. **LinkedIn:** Colocar `https://andresgomez.vercel.app/` en el enlace principal del perfil y en la sección de información de contacto.
2. **GitHub:** Colocar la URL en el perfil público de `github.com/EventsHorizons` y en los `README.md` de los proyectos principales (Invends, Scelerity, Web UNP).
3. **Plataformas de Empleo:** Añadir el enlace al portafolio en Torre.co, Get on Board y perfiles de contratación técnica.
4. **Repositorios de Código:** Asegurarse de que los repositorios públicos de GitHub contengan un enlace de vuelta al portafolio en la descripción del repositorio.
