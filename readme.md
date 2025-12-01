# ProductoX — Landing Page (Tailwind CSS, Vanilla JS)

## Resumen
Proyecto: Landing Page de Producto con Tailwind CSS (Vanilla JS). Contiene:
- `index.html` (landing)
- `pages/ofertas.html` (Ofertas)
- `pages/carrito.html` (Carrito)
- `js/main.js`, `css/input.css`, `assets/images/*`

## Cumplimiento de la rúbrica (resumen)
- **Funcionalidad (30%)**: Navbar responsive, hero con 2 CTAs, features (≥6), pricing (3 planes, plan destacado), testimonios (slider), FAQ (acordeón accesible con `aria-*`), formulario con validación, carrito con `localStorage`. (Ver `index.html`, `js/main.js`).
- **Responsive (25%)**: Diseño mobile-first. Breakpoints: `sm`, `md`, `lg`, `xl` usados para grids y layout (features: 1→2→3; pricing: 1→2→3).
- **Código (20%)**: HTML semántico, JS modular y comentado, Tailwind utility-first (`input.css` + `tailwind.config.js` disponible si compilas).
- **Accesibilidad (15%)**: `alt` en imágenes, `aria-expanded`/`aria-controls` en FAQ, focus visible, navegación por teclado (pruebas sugeridas en README).
- **Creatividad (10%)**: Microinteracciones (hover, transiciones), plan destacado y esquema de colores personalizado.

## Cómo ejecutar (rápido)
### Opción A — CDN 
1. Mantén `<script src="https://cdn.tailwindcss.com"></script>` en los HTML.  
2. Abre `index.html` en el navegador.  
