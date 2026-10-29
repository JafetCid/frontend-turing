import { ArrowUp, BookOpen, FileText } from "lucide-react";
import { DOCS_URL } from "@/lib/api";
import { LogoMark } from "./logo-mark";

const ICON_LINKS = [
  { href: DOCS_URL, label: "Documentación de la API (Swagger)", icon: FileText, external: true },
  { href: "#cursos", label: "Ir a los cursos", icon: BookOpen, external: false },
  { href: "#inicio", label: "Volver al inicio", icon: ArrowUp, external: false },
];

const COLUMNS = [
  {
    title: "Plataforma",
    items: [
      { label: "Cursos", href: "#cursos" },
      { label: "Beneficios", href: "#beneficios" },
      { label: "Instructores", href: "#instructores" },
    ],
  },
  {
    title: "Desarrolladores",
    items: [
      { label: "Documentación Swagger", href: DOCS_URL, external: true },
      { label: "Especificación OpenAPI", href: `${DOCS_URL}.json`, external: true },
    ],
  },
  {
    title: "Proyecto",
    items: [
      { label: "Prueba técnica para Turing IA" },
      { label: "Next.js y Tailwind CSS" },
      { label: "Express y PostgreSQL" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page grid gap-12 py-14 place-items-center sm:place-items-start sm:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-xl font-semibold">Sinapsis</span>
          </div>
          <ul className="mt-5 flex gap-2">
            {ICON_LINKS.map(({ href, label, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="grid size-10 place-items-center rounded-lg border border-white/20 text-white/80 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-[3px] focus-visible:ring-sky/50"
                >
                  <Icon aria-hidden className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col items-center sm:items-start">
            <h2 className="font-display text-sm font-semibold text-sky">{column.title}</h2>
            <ul className="mt-4 grid gap-2.5 text-sm text-center sm:text-start">
              {column.items.map((item) => (
                <li key={item.label}>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      {...("external" in item && item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="rounded-sm text-white/75 underline-offset-4 outline-none hover:text-white hover:underline focus-visible:ring-[3px] focus-visible:ring-sky/50"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-white/75">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="container-page text-center py-5 text-sm text-white/60">
          © 2026 Sinapsis Academy.
        </p>
      </div>
    </footer>
  );
}
