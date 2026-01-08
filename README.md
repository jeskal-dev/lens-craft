# Plan de Desarrollo - LensCraft Portfolio

**Nombre del Proyecto:** LensCraft  
**Tipo:** Sitio Web de Portafolio Fotográfico  
**Tecnologías:** Astro, TypeScript, Tailwind CSS, tailwindcss-motion

---

## 1. Arquitectura de Rutas (Sitemap)

El sitio seguirá una estructura plana y optimizada para SEO, aprovechando el enrutado basado en archivos de Astro.

- **`/` (Home)**
  - Objetivo: Impacto visual inmediato y resumen de la propuesta de valor.
- **`/gallery` (Portfolio)**
  - Objetivo: Exhibición completa de trabajos organizados por categorías.
- **`/about` (About)**
  - Objetivo: Conexión personal, historia del fotógrafo y estilo artístico.
- **`/services` (Services)**
  - Objetivo: Detallar paquetes, precios y tipos de sesiones disponibles.
- **`/contact` (Contact)**
  - Objetivo: Captación de clientes (leads) y consultas.

---

## 2. Desglose de Secciones por Página

### 2.1 Home (`/`)

Esta página debe servir como una "Vitrina" animada que invite a explorar.

- **Hero Section:**
  - Imagen de fondo de alto impacto (Full viewport height).
  - Título principal con tipografía elegante.
  - Botón de CTA (Llamada a la acción): "Ver Galería".
  - _Animación:_ Entrada suave de texto y fade-in de la imagen de fondo.
- **Featured Work (Destacados):**
  - Carrusel o Grid de 3-6 imágenes seleccionadas.
  - Categorías visibles al hacer hover.
  - _Animación:_ Efecto Parallax sutil al hacer scroll.
- **Filosofía Breve:**
  - Texto corto sobre qué es "LensCraft".
  - _Animación:_ Revelación de texto al hacer scroll (Scroll Reveal).
- **Testimonios (Mini):**
  - Slider de 2 citas de clientes rápidas.
  - _Animación:_ Transición suave entre citas.

### 2.2 Galería (`/gallery`)

El núcleo del sitio. Debe ser rápido y visualmente atractivo.

- **Filtros de Categoría:**
  - Botones para: Bodas, Retratos, Paisajes, Editorial.
  - _Animación:_ Subrayado animado en la categoría activa.
- **Grid de Imágenes (Masonry Layout):**
  - Diseño de cuadrícula asimétrica (estilo Pinterest) para variar alturas de fotos.
  - Carga diferida (Lazy loading) para rendimiento.
  - _Animación:_ Staggered fade-in (aparecen en cascada) al filtrar o cargar. Zoom suave al hacer hover en la tarjeta.
- **Lightbox / Modal:**
  - Vista de imagen a pantalla completa al hacer clic.
  - Navegación (flechas anterior/siguiente) sin cerrar el modal.
  - Información: Título, fecha y equipo usado.

### 2.3 Sobre Mí (`/about`)

Enfoque en la narrativa y el profesionalismo.

- **Hero del Fotógrafo:**
  - Foto del autor (retrato) a un lado, biografía textual al otro.
- **El Equipo (Gear):**
  - Lista iconográfica de cámaras y lentes utilizados (mostrar profesionalismo técnico).
  - _Animación:_ Iconos que aparecen secuencialmente al hacer scroll.
- **Proceso de Trabajo:**
  - Timeline visual: 1. Reserva -> 2. Sesión -> 3. Edición -> 4. Entrega.

### 2.4 Servicios (`/services`)

Claridad en la oferta comercial.

- **Tabla de Precios / Cards:**
  - 3-4 Tarjetas principales (Ej. "Básico", "Estándar", "Premium").
  - Lista de características incluidas en cada paquete.
  - _Animación:_ Las tarjetas deben elevarse (scale-up) y sombra aumentada al hacer hover.
- **Preguntas Frecuentes (FAQ):**
  - Acordeón desplegable.
  - _Animación:_ Apertura y cierre suave (height transition).

### 2.5 Contacto (`/contact`)

Conversión de visitas a clientes.

- **Formulario:**
  - Campos: Nombre, Email, Tipo de sesión (Select), Mensaje.
  - Validación en tiempo real.
- **Información Directa:**
  - Email, Teléfono, Redes Sociales (Instagram/Behance).
- **Mapa (Opcional):**
  - Ubicación del estudio o base de operaciones.

---

## 3. Reglas de Diseño y UX (Design System)

### 3.1 Paleta de Colores y Tipografía

- Busca en `styles/global.css`
- **Tipografía:**
  - Títulos: Serif elegante (ej. Playfair Display) para evocar arte.
  - Cuerpo: Sans-serif limpia (ej. Inter o Lato) para legibilidad.

### 3.2 Reglas de `tailwindcss-motion`

Dado que usamos `tailwindcss-motion` (o plugins de animación equivalentes para Tailwind), se definen las siguientes reglas globales:

1. **Entrada de Página:** Todos los elementos deben tener un `fade-in-up` de duración 700ms al cargar la vista.
2. **Micro-interacciones:**
   - Botones: Efecto `scale-105` al hover, con transición `ease-out`.
   - Imágenes: Filtro `grayscale` por defecto en la galería, que se quita (`grayscale-0`) y hace `zoom-in` al pasar el mouse.
3. **Transiciones de Ruta:** Uso de `<ViewTransitions>` de Astro para cambios suaves entre páginas sin recarga completa.
4. **Staggering:** En listas (como galerías o testimonios), los elementos deben aparecer con un retraso progresivo (`delay-100`, `delay-200`, etc.).

---

## 4. Estrategia de Datos (Astro Collections)

Para gestionar las fotos de manera eficiente sin una base de datos compleja, se utilizarán **Astro Content Collections**.

- **Colección: `gallery`**
  - Campos requeridos:
    - `title` (string)
    - `category` (enum: 'bodas' | 'retratos' | 'paisajes')
    - `image` (sharp image optimization)
    - `date` (date)
    - `featured` (boolean - para la home)
- **Colección: `services`**
  - Campos requeridos:
    - `name` (string)
    - `price` (string)
    - `description` (string)
    - `features` (array of strings)

---

## 5. Requisitos Funcionales Técnicos

1. **Optimización de Imágenes:**
   - Uso de la integración `@astrojs/image` o componentes `<Image />` de Astro para convertir imágenes automáticamente a WebP/AVIF.
   - Implementación de `srcset` para imágenes responsivas.
2. **SEO:**
   - Meta tags dinámicos por página.
   - Sitemap.xml generado automáticamente.
   - Datos estructurados (Schema.org) para "ImageObject".
3. **Accesibilidad (a11y):**
   - Texto alternativo en todas las imágenes.
   - Navegación por teclado funcional en la galería.
   - Contraste de color suficiente.

---

