"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CourseImage } from "@/features/courses/course-image";
import { formatDate } from "@/lib/format";
import { useAuth } from "./auth-context";

export function MyCoursesDialog() {
  const { myCoursesOpen, setMyCoursesOpen, enrollments, unenroll } = useAuth();

  return (
    <Dialog open={myCoursesOpen} onOpenChange={setMyCoursesOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Mis cursos</DialogTitle>
          <DialogDescription>
            {enrollments.length === 0
              ? "Todavía no tienes cursos."
              : `Estás inscrito en ${enrollments.length} ${enrollments.length === 1 ? "curso" : "cursos"}.`}
          </DialogDescription>
        </DialogHeader>

        {enrollments.length === 0 ? (
          <div className="grid gap-3 rounded-lg border border-dashed border-navy/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">Elige un curso del catálogo y pulsa Inscribirme.</p>
            <Button asChild variant="accent" className="mx-auto">
              <a href="#cursos" onClick={() => setMyCoursesOpen(false)}>
                Ver el catálogo
              </a>
            </Button>
          </div>
        ) : (
            <ul className="grid gap-3">
            {enrollments.map(({ course, enrolledAt }) => (
              <li key={course.id} className="flex flex-col sm:flex-row sm:items-center min-w-0 gap-3 rounded-lg border bg-white p-2.5">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <CourseImage
                    src={course.imageUrl}
                    alt=""
                    sizes="64px"
                    className="size-16 shrink-0 rounded-md"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display font-semibold text-sm sm:text-base">
                      {course.title}
                    </p>
                    <p className="truncate text-xs sm:text-sm text-muted-foreground">
                      {course.instructor.name}. Inscrito el {formatDate(enrolledAt)}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto shrink-0"
                  onClick={() => unenroll(course.id)}
                >
                  Cancelar
                </Button>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
