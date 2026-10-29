import { Suspense } from "react";
import { BenefitsSection } from "@/features/landing/benefits-section";
import { CoursesSection } from "@/features/landing/courses-section";
import { HeroSection } from "@/features/landing/hero-section";
import { InstructorsSection } from "@/features/landing/instructors-section";
import { SiteFooter } from "@/features/landing/site-footer";
import { SiteHeader } from "@/features/landing/site-header";
import { CoursesSkeleton, InstructorsSkeleton } from "@/features/landing/skeletons";

// El shell (header, hero, beneficios y footer) es estático; las secciones con datos
// de la API llegan por streaming dentro de su propio <Suspense>.
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <Suspense fallback={<CoursesSkeleton />}>
          <CoursesSection />
        </Suspense>
        <BenefitsSection />
        <Suspense fallback={<InstructorsSkeleton />}>
          <InstructorsSection />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
