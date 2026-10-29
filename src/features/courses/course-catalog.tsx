"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category, Course, Paginated } from "@/types/api";
import { CourseCard } from "./course-card";
import { CourseCardSkeleton } from "./course-card-skeleton";
import { useCourseFeed } from "./use-course-feed";

const PAGE_SIZE = 6;

interface Props {
  categories: Category[];
  initial: Paginated<Course>;
}

/** Grid de 6 cards con filtro por categoría y "cargar más", alimentado por la API. */
export function CourseCatalog({ categories, initial }: Props) {
  const { categoryId, courses, meta, status, error, selectCategory, loadMore } = useCourseFeed(initial, PAGE_SIZE);
  const switching = status === "switching";

  return (
    <div className="grid gap-8">
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap justify-center gap-2">
        <Button size="sm" variant={categoryId === null ? "secondary" : "outline"} aria-pressed={categoryId === null} onClick={() => selectCategory(null)}>
          Todos
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            size="sm"
            variant={categoryId === category.id ? "secondary" : "outline"}
            aria-pressed={categoryId === category.id}
            onClick={() => selectCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <p aria-live="polite" className="text-center text-sm text-muted-foreground">
        {switching ? "Cargando cursos…" : `Mostrando ${courses.length} de ${meta.total} cursos`}
      </p>

      {switching ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }, (_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : courses.length === 0 && status !== "error" ? (
        <div className="mx-auto max-w-md rounded-xl border border-dashed border-navy/30 p-10 text-center">
          <p className="font-display text-lg font-semibold">Aún no hay cursos en esta categoría</p>
          <p className="mt-1 text-sm text-muted-foreground">Prueba con otra categoría o vuelve a ver todos los cursos.</p>
          <Button className="mt-4" variant="outline" size="sm" onClick={() => selectCategory(null)}>
            Ver todos los cursos
          </Button>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      )}

      {status === "error" && error && (
        <p role="alert" className="mx-auto max-w-xl rounded-lg border border-destructive/40 bg-white p-4 text-center text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      {!switching && meta.hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" size="lg" onClick={loadMore} disabled={status === "loading-more"}>
            {status === "loading-more" && <Loader2 className="animate-spin" />}
            Cargar más cursos
          </Button>
        </div>
      )}
    </div>
  );
}
