import { cn } from "@/lib/utils";

interface Props {
  id: string;
  title: string;
  description?: string;
  className?: string;
}

/** Encabezado centrado, como los títulos de sección del wireframe. */
export function SectionHeading({ id, title, description, className }: Props) {
  return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center", className)}>
      <h2 id={id} className="text-3xl leading-tight font-semibold text-balance sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  );
}
