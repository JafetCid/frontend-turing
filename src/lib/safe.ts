import { unstable_rethrow } from "next/navigation";
import { errorMessage } from "@/lib/api";

export type Settled<T> = { ok: true; data: T } | { ok: false; message: string };

/**
 * Convierte un fallo de la API en un valor, para que una sección rota
 * no tumbe toda la página. Las señales internas de Next se vuelven a lanzar.
 */
export async function settle<T>(promise: Promise<T>): Promise<Settled<T>> {
  try {
    return { ok: true, data: await promise };
  } catch (error) {
    unstable_rethrow(error);
    return { ok: false, message: errorMessage(error) };
  }
}
