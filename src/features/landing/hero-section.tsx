import { Suspense } from "react";
import { BookOpen, Layers, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/features/categories/api";
import { getCourses } from "@/features/courses/api";
import { getInstructors } from "@/features/instructors/api";
import { settle } from "@/lib/safe";
import { NetworkBackdrop } from "./network-backdrop";

async function HeroStats() {
  const [courses, categories, instructors] = await Promise.all([
    settle(getCourses({ limit: 1 })),
    settle(getCategories()),
    settle(getInstructors(50)),
  ]);

  const stats = [
    { icon: BookOpen, value: courses.ok ? courses.data.meta.total : null, label: "cursos disponibles" },
    { icon: Layers, value: categories.ok ? categories.data.length : null, label: "áreas de estudio" },
    { icon: Users, value: instructors.ok ? instructors.data.length : null, label: "instructores" },
  ];

  return (
    <ul className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
      {stats.map(({ icon: Icon, value, label }) => (
        <li key={label} className="flex items-center gap-4 rounded-xl border bg-card p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-sky/20 text-ocean">
            <Icon aria-hidden className="size-5" />
          </span>
          <div>
            <p className="font-display text-3xl leading-none font-semibold">{value ?? "–"}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function HeroStatsFallback() {
  return (
    <div aria-hidden className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-[86px] rounded-xl bg-white" />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <>
      <section id="inicio" className="relative isolate overflow-hidden bg-navy text-white">
        <div aria-hidden className="absolute inset-0 -z-10">
          <NetworkBackdrop className="size-full text-sky/20" />
        </div>
        <div className="container-page flex flex-col items-center gap-6 pt-20 pb-28 text-center sm:pt-24 sm:pb-32">
          <h1 className="max-w-3xl text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] font-semibold text-balance">
            Aprende a construir con inteligencia artificial, datos y código
          </h1>
          <p className="max-w-xl text-lg text-white/75">
            Cursos prácticos de desarrollo web, ciencia de datos, IA y cloud, impartidos por quienes trabajan en lo que enseñan.
          </p>
          <Button asChild variant="accent" size="lg" className="mt-2">
            <a href="#cursos">Explorar cursos</a>
          </Button>
        </div>
      </section>

      <div className="container-page relative z-10 -mt-12">
        <Suspense fallback={<HeroStatsFallback />}>
          <HeroStats />
        </Suspense>
      </div>
    </>
  );
}
