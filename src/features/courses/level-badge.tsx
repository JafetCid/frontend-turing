import { Badge } from "@/components/ui/badge";
import { LEVEL_LABEL } from "@/lib/format";
import type { Level } from "@/types/api";

// El tono codifica la dificultad: cielo (inicio), océano (medio), marino (avanzado)
const VARIANT = { BEGINNER: "soft-sky", INTERMEDIATE: "soft-ocean", ADVANCED: "soft-navy" } as const;

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  return (
    <Badge variant={VARIANT[level]} className={className}>
      {LEVEL_LABEL[level]}
    </Badge>
  );
}
