import { ArrowUpRight } from "lucide-react";
import { UserMenu } from "@/features/auth/user-menu";
import { NAV_LINKS } from "./content";
import { LogoMark } from "./logo-mark";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <>
      {/* Barra superior oscura del wireframe: mensaje a la izquierda, cuenta a la derecha */}
      <div className="bg-navy text-white">
        <div className="container-page flex h-11 items-center justify-between gap-4">
          <p className="text-xs text-white/70">Cursos de IA, datos y desarrollo web</p>
          <div className="ml-auto">
            <UserMenu />
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a
            href="#inicio"
            aria-label="Sinapsis Academy, ir al inicio"
            className="flex items-center gap-2.5 rounded-lg bg-navy py-1.5 pr-4 pl-2.5 text-white outline-none focus-visible:ring-[3px] focus-visible:ring-ocean/40"
          >
            <LogoMark />
            <span className="font-display text-xl font-semibold tracking-tight">Sinapsis</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-navy/80 transition-colors outline-none hover:text-navy focus-visible:ring-[3px] focus-visible:ring-ocean/30"
              >
                {link.label}
                {link.external && (
                  <>
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </>
                )}
              </a>
            ))}
          </nav>

          <MobileNav />
        </div>
      </header>
    </>
  );
}
