# 07. Arquitectura de Información y Embudo de Conversión Dual

---

## 1. Mapeo de la Experiencia de Usuario (User Journeys)

El portafolio de Germán Andrés Gómez está optimizado para resolver dos recorridos de usuario fundamentales:

```
[Visitante Llega al Portafolio]
          │
          ├───► RECORRIDO A: Reclutador Técnico / Líder de Ingeniería (45 segundos)
          │       1. Hero: Identidad inmediata ("Frontend Engineer"), Bogotá, Stack clave.
          │       2. Trayectoria: Valida experiencia formal (UNP, roles técnicos).
          │       3. Proyectos: Inspecciona código en GitHub y demo en vivo.
          │       4. Stack & Educación: Confirma formación universitaria (Uniminuto, SENA).
          │       5. Conversión: Descarga CV en PDF o envía mensaje por WhatsApp / Email.
          │
          └───► RECORRIDO B: Fundador / Cliente de Producto Digital
                  1. Hero: Impacto visual ("El arte de simplificar"), estética editorial sobria.
                  2. Casos de Estudio: Evalúa calidad de interfaz y velocidad de carga.
                  3. Criterio: Comprende el proceso de diseño atómico a código.
                  4. Conversión: Inicia conversación por WhatsApp para cotizar o colaborar.
```

---

## 2. Jerarquía de Secciones y Contenido

| Orden | ID Sección | Propósito Estratégico | Elemento Clave |
| :---: | :--- | :--- | :--- |
| **00** | `#hero` | Captura de atención y posicionamiento en 3 segundos | Titular, chips de especialidades, botones duales (Contacto y Descargar CV) |
| **01** | `#experiencia` | Validación de credibilidad y antecedentes reales | Línea de tiempo con roles verificables (UNP como cargo actual) |
| **02** | `#criterio` | Explicación del método de trabajo y diferenciador | Tríada: Diseño de Producto (Figma), Arquitectura Frontend (TS/React/Angular), Flujos IA |
| **03** | `#proyectos` | Demostración de capacidad de entrega técnica | 6 tarjetas estructuradas como micro casos de estudio con enlaces a demo y GitHub |
| **04** | `#stack` | Desglose por dominios tecnológicos (sin barras vacías) | Frontend, Backend & Datos, UI/UX & Sistemas, AI Workflows |
| **05** | `#educacion` | Acreditación académica formal | Ingeniería en Software (Uniminuto), Esp. Móvil (SENA), ADSI (SENA) |
| **06** | `#contacto` | Cierre de conversión directa | Accesos a WhatsApp preconfigurado, Email, GitHub y LinkedIn |

---

## 3. Arquitectura del Modo Impresión (@media print)

El sitio web incorpora una capa arquitectónica exclusiva para reclutadores que imprimen o guardan el sitio como PDF (`Ctrl + P` o botón "Imprimir / PDF"):
- Oculta fondos oscuros pesados, efectos de canvas interactivo, cintas continuas (marquees) y botones no funcionales en papel.
- Presenta un membrete formal con nombre civil, título profesional, teléfono, correo y enlaces directos.
- Distribuye la experiencia y los proyectos en una tipografía de lectura nítida de alta legibilidad sobre fondo blanco, convirtiendo el sitio web en un currículum físico perfecto de dos páginas.
