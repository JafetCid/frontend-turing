"use client";

import { Button } from "@/components/ui/button";
import { useAuth, type AuthMode } from "./auth-context";

type Props = Omit<React.ComponentProps<typeof Button>, "onClick" | "asChild"> & { mode?: AuthMode };

/** Botón que abre el diálogo de acceso; se usa desde secciones renderizadas en el servidor. */
export function AuthButton({ mode = "register", ...props }: Props) {
  const { openAuth, user } = useAuth();
  return (
    <Button
      {...props}
      onClick={() => {
        if (!user) openAuth(mode);
        else document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" });
      }}
    />
  );
}
