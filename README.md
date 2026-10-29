# Sinapsis Academy · Frontend

Landing de la plataforma de cursos para el reto técnico de **Turing Inteligencia Artificial**. Sigue la estructura del wireframe seleccionado (barra superior, header, hero con 3 tarjetas, grid de 6 cards, 4 cuadros, 3 círculos y footer) con un diseño minimalista, y consume la API `turing-courses-api`.

## Stack

- Next.js 16 (App Router, Cache Components) · React 19 · TypeScript
- Tailwind CSS v4 · componentes estilo shadcn/ui (Radix UI + class-variance-authority)
- React Hook Form + Zod · Sonner
- Bricolage Grotesque (títulos) y Figtree (texto) vía Fontsource

## Puesta en marcha

Requiere la API en ejecución (ver README del backend).

```bash
npm install                  # o pnpm install
cp .env.example .env.local   # ajusta NEXT_PUBLIC_API_URL si cambia el puerto
npm run dev                  # http://localhost:3000
```

| Comando | Descripción |
|---|---|
| `npm run dev` | Desarrollo |
| `npm run build` / `npm start` | Producción |
| `npm run lint` | ESLint |

`NEXT_PUBLIC_API_URL` apunta a la API (por defecto `http://localhost:4000/api/v1`). En el backend, `CORS_ORIGIN` debe incluir el origen del frontend.

## Wireframe y datos

| Sección del wireframe | Componente | Origen |
|---|---|---|
| Barra superior | `landing/site-header` + `auth/user-menu` | Sesión del usuario |
| Header (logo y 4 enlaces) | `landing/site-header` | Estático |
| Hero y 3 tarjetas | `landing/hero-section` | Totales de la API (cursos, categorías, instructores) |
| **Grid de 6 cards** | `courses/course-catalog` | `GET /courses` con filtro por categoría y "cargar más" |
| 4 cuadros (2 sólidos, 2 rayados) | `landing/benefits-section` | Estático (`landing/content.ts`) |
| **3 círculos** | `landing/instructors-section` | `GET /instructors` |
| Footer | `landing/site-footer` | Estático |

El filtro por categoría y el botón "cargar más" cubren el requisito del reto de cambiar entre elementos y cargar más desde el cliente.

## Arquitectura

Feature-first con servidor primero e islas de cliente solo donde hay interacción.

```
src/
├── app/                      # layout, page y tokens (globals.css)
├── components/ui/            # base estilo shadcn, sin lógica de negocio
├── features/
│   ├── auth/                 # contexto, proveedor, diálogos, menú
│   ├── courses/              # api, card, hook de datos, catálogo
│   ├── categories/           # api
│   ├── instructors/          # api
│   └── landing/              # secciones y contenido estático
├── lib/                      # cliente de API, formato, utilidades
└── types/api.ts              # contratos de la API
```

- **Servidor primero:** las secciones con datos son componentes de servidor asíncronos; el HTML llega ya poblado y el JavaScript de cliente se limita al catálogo, el filtro y la autenticación.
- **Streaming:** con Cache Components, el shell es estático y cada sección vive en su `<Suspense>` con esqueleto.
- **Aislamiento de fallos:** `lib/safe.ts` convierte un error de la API en un mensaje de la sección; el resto de la página sigue funcionando.
- **Capas:** `lib/api.ts` (transporte) → `features/*/api.ts` (endpoints tipados) → componentes. El estado del grid vive en `use-course-feed.ts`, separado de la presentación y protegido contra respuestas fuera de orden.
- **Contenido separado:** textos y navegación estáticos en `landing/content.ts`.

## Paleta (tonos azules)

| Token | Hex | Uso |
|---|---|---|
| `navy` | `#102E40` | Barra superior, hero, footer, texto |
| `mist` | `#C7D2D9` | Fondo tenue y bordes (mezclado con blanco) |
| `ocean` | `#025373` | Acción principal y etiquetas |
| `sky` | `#40D3F2` | Acento y cuadros sólidos |
| `cyan` | `#3DE0F2` | Hover del acento |

Los hex se leyeron de una imagen de baja resolución del PDF: confírmalos con un selector de color y ajusta `:root` en `src/app/globals.css`.

## Decisiones

- **Sesión:** el JWT se guarda en `localStorage`; suficiente para la prueba. En producción conviene una cookie `httpOnly` emitida por el backend.
- **Imágenes:** vienen de URLs externas definidas en la API y se sirven con `unoptimized`. Si fijas dominios en `images.remotePatterns` puedes quitarlo.
- **shadcn/ui:** los componentes están escritos a mano con la estructura `new-york`; `components.json` permite usar `npx shadcn@latest add`.
- **Accesibilidad:** foco visible, `aria-pressed` en filtros, `aria-live` en el contador, textos para lectores de pantalla y `prefers-reduced-motion` respetado.
- **Textos de los 4 cuadros:** son copy genérico de ejemplo; reemplázalo por el real.

## Cuentas de ejemplo

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@demo.com` | `Admin123!` |
| Usuario | `user@demo.com` | `User123!` |

El diálogo de acceso incluye botones para rellenarlas.
