import { cn } from "@/lib/utils";

/** Hexágono con tres nodos conectados: una sinapsis. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8 text-sky", className)} fill="none">
      <path d="M16 2.5 28 9.25v13.5L16 29.5 4 22.75V9.25z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="m11 17 10-5m-10 5 10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11" cy="17" r="2.4" fill="currentColor" />
      <circle cx="21" cy="12" r="2.4" fill="currentColor" />
      <circle cx="21" cy="21" r="2.4" fill="currentColor" />
    </svg>
  );
}
