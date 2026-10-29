import { cn } from "@/lib/utils";
import { BENEFITS } from "./content";
import { SectionHeading } from "./section-heading";

export function BenefitsSection() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-titulo" className="scroll-mt-20 border-y bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="beneficios-titulo"
          title="Una forma clara de aprender"
          description="Sin ruido: contenido directo, práctico y pensado para avanzar."
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className={cn(
                "flex flex-col justify-between gap-10 rounded-2xl p-6 lg:aspect-square",
                index < 2 ? "bg-sky/25" : "border bg-hatch",
              )}
            >
              <Icon aria-hidden className="size-7 text-ocean" />
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
