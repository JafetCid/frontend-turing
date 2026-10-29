import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  src: string | null;
  alt?: string;
  sizes: string;
  className?: string;
}

/**
 * Las imágenes vienen de URLs externas definidas en la API (picsum en el seed),
 * por eso se sirven sin el optimizador de Next: así funcionan con cualquier dominio.
 */
export function CourseImage({ src, alt = "", sizes, className }: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-mist", className)}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} unoptimized className="object-cover" />}
    </div>
  );
}
