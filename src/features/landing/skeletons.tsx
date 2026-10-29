import { Skeleton } from "@/components/ui/skeleton";
import { CourseCardSkeleton } from "@/features/courses/course-card-skeleton";

export function CoursesSkeleton() {
  return (
    <div id="cursos" aria-hidden className="container-page py-20 sm:py-24">
      <Skeleton className="mx-auto mb-10 h-10 w-72 max-w-full" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function InstructorsSkeleton() {
  return (
    <div aria-hidden className="container-page grid gap-12 py-20 sm:grid-cols-3 sm:py-24">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="mx-auto size-36 rounded-full" />
      ))}
    </div>
  );
}
