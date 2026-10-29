export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1").replace(/\/$/, "");
export const DOCS_URL = API_URL.replace(/\/api\/v1$/, "/api/docs");

export interface FieldError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: FieldError[],
  ) {
    super(message);
  }
}

type Options = Omit<RequestInit, "body" | "headers"> & {
  token?: string | null;
  body?: unknown;
  headers?: Record<string, string>;
};

/** Cliente único para la API. Lanza ApiError con mensaje legible. */
export async function apiFetch<T>(path: string, { token, body, headers, ...init }: Options = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      // Los datos cambian desde el panel de administración: nunca se sirven cacheados
      cache: "no-store",
      ...init,
      headers: {
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "No pudimos conectar con el servidor. Verifica que la API esté en ejecución.");
  }

  if (res.status === 204) return undefined as T;

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(res.status, payload?.error ?? "Ocurrió un error inesperado", payload?.details);
  }
  return payload as T;
}

export const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Ocurrió un error inesperado";
