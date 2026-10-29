import { Clock, Star } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Course } from "@/types/api";
import { CourseImage } from "./course-image";
import { EnrollButton } from "./enroll-button";
import { LevelBadge } from "./level-badge";

/** Card del grid: imagen, etiquetas, título, texto y pie con botón y tres datos. */
export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-ocean/40">
      <CourseImage
        src={course.imageUrl}
        sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
        className="aspect-16/10"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-ocean">{course.category.name}</span>
          <LevelBadge level={course.level} />
        </div>
        <h3 className="text-lg leading-snug font-semibold text-balance">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
        <p className="mt-auto pt-1 text-sm text-muted-foreground">
          Imparte <span className="font-medium text-foreground">{course.instructor.name}</span>
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 border-t px-5 py-4">
        <EnrollButton courseId={course.id} />
        <ul className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <li className="flex items-center gap-1">
            <Clock aria-hidden className="size-3.5" />
            <span className="sr-only">Duración:</span>
            {course.durationHours} h
          </li>
          <li className="flex items-center gap-1">
            <Star aria-hidden className="size-3.5 fill-sky text-sky" />
            <span className="sr-only">Valoración:</span>
            {course.rating.toFixed(1)}
          </li>
          <li className="font-semibold text-foreground">
            <span className="sr-only">Precio:</span>
            {formatPrice(course.price)}
          </li>
        </ul>
      </div>
    </article>
  );
}
