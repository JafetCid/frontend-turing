"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "./content";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden" aria-label="Abrir menú">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Menú</SheetTitle>
        <SheetDescription>Navegación principal</SheetDescription>
        <nav aria-label="Móvil" className="mt-4 grid gap-1">
          {NAV_LINKS.map((link) => (
            <SheetClose key={link.href} asChild>
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="rounded-md px-3 py-3 text-lg font-medium outline-none hover:bg-white/10 focus-visible:ring-[3px] focus-visible:ring-ring/60"
              >
                {link.label}
              </a>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
