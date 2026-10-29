"use client";

import { BookOpen, ExternalLink, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DOCS_URL } from "@/lib/api";
import { useAuth } from "./auth-context";

export function UserMenu() {
  const { user, openAuth, logout, enrollments, setMyCoursesOpen } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost-light" size="sm" className="hidden sm:inline-flex" onClick={() => openAuth("register")}>
          Crear cuenta
        </Button>
        <Button variant="accent" size="sm" onClick={() => openAuth("login")}>
          Iniciar sesión
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost-light" size="sm" className="gap-2 px-2" aria-label="Menú de cuenta">
          <span className="grid size-7 place-items-center rounded-full bg-sky font-display text-sm font-bold text-navy">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span className="hidden max-w-32 truncate sm:inline">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="grid gap-1">
          <span className="truncate font-semibold">{user.name}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">{user.email}</span>
          <Badge variant={user.role === "ADMIN" ? "default" : "accent"} className="mt-1">
            {user.role === "ADMIN" ? "Administrador" : "Estudiante"}
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setMyCoursesOpen(true)}>
          <BookOpen />
          Mis cursos ({enrollments.length})
        </DropdownMenuItem>
        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <a href={DOCS_URL} target="_blank" rel="noreferrer">
              <ExternalLink />
              Administrar con Swagger
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={logout}>
          <LogOut />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
