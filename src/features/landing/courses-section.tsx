import { getCategories } from "@/features/categories/api";
import { getCourses } from "@/features/courses/api";
import { CourseCatalog } from "@/features/courses/course-catalog";
import { settle } from "@/lib/safe";
import { SectionError } from "./section-error";
import { SectionHeading } from "./section-heading";

export async function CoursesSection() {
  const [categories, courses] = await Promise.all([settle(getCategories()), settle(getCourses({ page: 1, limit: 6 }))]);

  return (
    <section id="cursos" aria-labelledby="cursos-titulo" className="container-page scroll-mt-20 py-20 sm:py-24">
      <SectionHeading
        id="cursos-titulo"
        title="Cursos para empezar hoy"
        description="Filtra por área y encuentra el curso que encaja con tu siguiente paso."
      />
      {categories.ok && courses.ok ? (
        <CourseCatalog categories={categories.data} initial={courses.data} />
      ) : (
        <SectionError what="el catálogo de cursos" message={!courses.ok ? courses.message : !categories.ok ? categories.message : ""} />
      )}
    </section>
  );
}
