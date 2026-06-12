# TechRing — Carrusel 3D rotativo del stack

Componente reutilizable de un anillo / brazalete 3D que gira mostrando tu stack.
Orientación final: **inclinación 23° · eje Z -21° · tamaño 0.45**.

Incluye **dos versiones** — usa la que encaje con tu sitio:

```
TechRing-reusable/
├─ TechRing-embed.html      ← HTML autocontenido (cualquier sitio, sin build)
├─ assets/
│  └─ center-figure.png     ← imagen central (tu retrato recortado)
└─ react/
   ├─ TechRing.tsx          ← Componente React / Next.js + TailwindCSS v4
   └─ tech-logos.tsx        ← Logos de marca (SVG inline)
```

---

## Opción A · HTML autocontenido — `TechRing-embed.html`

Funciona en **cualquier web**, sin React ni build. Dos formas de usarlo:

**1) Incrustar como iframe**
```html
<iframe src="TechRing-embed.html"
        style="width:100%;height:620px;border:0;"
        loading="lazy" title="Stack 3D"></iframe>
```

**2) Pegar directo** — copia el bloque `<style>`, el `<div class="techring">` y el
`<script>` en tu página. Solo necesita una raíz `.techring` con altura definida.

Ajusta la orientación con las variables CSS al inicio de `.techring`:
```css
.techring{
  --ring-tilt: 23deg;    /* inclinación  */
  --ring-roll: -21deg;   /* eje Z (diagonal) */
  --ring-scale: 0.45;    /* tamaño */
  --ring-radius: 408px;  /* separación entre tarjetas */
  --fig-width: 560px;    /* ancho de la figura central */
  --fig-offset: 205px;   /* posición vertical de la figura */
}
```
Edita el array `TECH` del `<script>` para cambiar tecnologías, nombres o colores.
Respeta `prefers-reduced-motion` (se queda estático si el usuario lo pide).

**Figura central:** viene incluida (`assets/center-figure.png`) con un desvanecido
inferior que la funde con el fondo. Para cambiar la foto, reemplaza ese archivo o el
`src` del `<img>`. Para quitarla, borra el bloque `<div class="center-figure">`.

---

## Opción B · React / Next.js — `react/`

Para tu stack (Next.js App Router + TailwindCSS v4). El componente es `"use client"`.

```tsx
import TechRing from "@/components/tech-ring/TechRing";

export default function Page() {
  return (
    <section className="h-[100svh] w-full">
      <TechRing />          {/* ya viene con tilt 23 · roll -21 · scale 0.45 */}
    </section>
  );
}
```

Ocupa el 100% de su contenedor — dale altura al padre.

### Props

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `items` | `Tech[]` | `DEFAULT_STACK` | Tarjetas a mostrar |
| `radius` | `number` | `372` | Radio del anillo (órbita cercana, sin superposición) |
| `tilt` | `number` | `19` | Inclinación (grados) |
| `roll` | `number` | `-6` | Eje Z / diagonal (grados) |
| `scale` | `number` | `0.45` | Tamaño |
| `speed` | `number` | `15` | Velocidad °/seg (`0` = congelado) |
| `cardWidth` / `cardHeight` | `number` | `166` / `234` | Tamaño de tarjeta |
| `lift` | `number` | `-58` | Centrado vertical |
| `centerImage` | `string` | — | Imagen central (retrato recortado). Ponla en `public/` y pasa la ruta, ej. `"/center-figure.png"` |
| `centerWidth` | `number` | `560` | Ancho de la figura central (px) |
| `centerOffset` | `number` | `205` | Posición vertical de la figura (px) |
| `className` | `string` | `""` | Clases extra |

### Figura central (opcional)
Copia `assets/center-figure.png` a tu carpeta `public/` y pásala como `centerImage`.
La figura se mantiene de pie (cancela `tilt` + `roll`), hereda el `scale` del anillo y
se funde con el fondo por abajo. Las tarjetas frontales pasan por delante (profundidad real).
```tsx
<TechRing centerImage="/center-figure.png" />
```

### Usar tu propio listado
```tsx
import TechRing, { type Tech } from "@/components/tech-ring/TechRing";

const stack: Tech[] = [
  { name: "React", category: "Frontend", color: "#61DAFB", logo: "react" },
  // logo = una clave de TechLogos (tech-logos.tsx)
];

<TechRing items={stack} />
```

**Interacción:** al pasar el cursor sobre una tarjeta esta se eleva, brilla y pasa al
frente — **sin detener el giro** del carrusel. Solo las tarjetas del frente son interactivas.

**Requisitos:** React 18+, TailwindCSS **v4** (usa `color-mix()` y utilidades arbitrarias
como `[transform-style:preserve-3d]`).

---

## Stack incluido (12)
`React · Next.js · TypeScript · TailwindCSS · Node.js · Express · MySQL · Supabase · Firebase · Python · Git/GitHub · Vercel`

## Notas
- Los logos de **MySQL, Firebase y Python** son reconstrucciones geométricas limpias
  (no los SVG oficiales). Sustitúyelos por los oficiales si necesitas fidelidad exacta.
- Las tarjetas traseras muestran el dorso (texto en espejo), como en un anillo real.
- Tipografías de la demo: *Space Grotesk* (nombres) y *JetBrains Mono* (categorías).
