import { CourseImage } from "@/features/courses/course-image";
import { getInstructors } from "@/features/instructors/api";
import { settle } from "@/lib/safe";
import { cn } from "@/lib/utils";
import { SectionError } from "./section-error";
import { SectionHeading } from "./section-heading";

export async function InstructorsSection() {
  const instructors = await settle(getInstructors(10));

  // El instructor con más cursos va al centro, con el círculo más grande
  let display = instructors.ok ? [...instructors.data].sort((a, b) => b.coursesCount - a.coursesCount).slice(0, 3) : [];
  if (display.length === 3) display = [display[1], display[0], display[2]];

  return (
    <section id="instructores" aria-labelledby="instructores-titulo" className="container-page scroll-mt-20 py-20 sm:py-24">
      <SectionHeading
        id="instructores-titulo"
        title="Aprende de quienes lo practican"
        description="Profesionales en activo que explican lo que usan todos los días."
      />
      {instructors.ok ? (
        <ul className="grid items-center gap-12 sm:grid-cols-3">
          {display.map((instructor, index) => {
            const featured = display.length === 3 && index === 1;
            return (
              <li key={instructor.id} className="flex flex-col items-center text-center">
                <CourseImage
                  src={instructor.avatarUrl}
                  sizes="240px"
                  className={cn("rounded-full ring-1 ring-navy/10", featured ? "size-44 sm:size-48 lg:size-56" : "size-32 sm:size-36 lg:size-40")}
                />
                <h3 className="mt-6 text-xl font-semibold">{instructor.name}</h3>
                <p className="mt-1 text-muted-foreground">{instructor.headline}</p>
                <p className="mt-2 text-sm font-medium text-ocean">
                  {instructor.coursesCount} {instructor.coursesCount === 1 ? "curso" : "cursos"}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <SectionError what="los instructores" message={instructors.message} />
      )}
    </section>
  );
}
