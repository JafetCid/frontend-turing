import { API_URL } from "@/lib/api";

export function SectionError({ what, message }: { what: string; message: string }) {
  return (
    <div role="alert" className="mx-auto max-w-xl rounded-xl border border-destructive/40 bg-white p-5 text-center">
      <p className="font-display text-lg font-semibold text-destructive">No pudimos cargar {what}</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Comprueba que la API esté en ejecución en <code className="font-semibold">{API_URL}</code> y recarga la página.
      </p>
    </div>
  );
}
