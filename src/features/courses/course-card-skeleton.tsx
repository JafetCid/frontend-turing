import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div aria-hidden className="overflow-hidden rounded-2xl border bg-card">
      <Skeleton className="aspect-16/10 rounded-none" />
      <div className="grid gap-3 p-5">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex items-center justify-between border-t px-5 py-4">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
