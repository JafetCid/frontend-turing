import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "./globals.css";
import { AuthProvider } from "@/features/auth/auth-provider";
import { AuthDialog } from "@/features/auth/auth-dialog";
import { MyCoursesDialog } from "@/features/auth/my-courses-dialog";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Sinapsis Academy: cursos de IA, datos y desarrollo web",
  description:
    "Cursos prácticos de inteligencia artificial, ciencia de datos, desarrollo web y cloud con instructores que trabajan en lo que enseñan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
          <AuthDialog />
          <MyCoursesDialog />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
