import { Compass, Hammer, Signal, Users, type LucideIcon } from "lucide-react";
import { DOCS_URL } from "@/lib/api";

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#cursos", label: "Cursos" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#instructores", label: "Instructores" },
  { href: DOCS_URL, label: "API", external: true },
];

export interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

// Los dos primeros cuadros del wireframe son sólidos y los dos últimos rayados
export const BENEFITS: Benefit[] = [
  { icon: Hammer, title: "Proyectos prácticos", text: "Cada curso se apoya en ejercicios que puedes llevar a tu portafolio." },
  { icon: Users, title: "Instructores en activo", text: "Contenido de profesionales que usan a diario lo que enseñan." },
  { icon: Compass, title: "Ruta flexible", text: "Elige el orden y el ritmo que mejor se adapte a tu semana." },
  { icon: Signal, title: "Todos los niveles", text: "Desde los primeros pasos hasta temas avanzados." },
];
