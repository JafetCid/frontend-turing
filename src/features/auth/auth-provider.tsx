"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { ApiError, apiFetch, errorMessage } from "@/lib/api";
import type { AuthResult, Enrollment } from "@/types/api";
import { AuthContext, type AuthContextValue, type AuthMode, type LoginInput, type RegisterInput } from "./auth-context";

const STORAGE_KEY = "sinapsis.session";
const CHANGE_EVENT = "sinapsis:session";

// La sesión vive en localStorage y se lee con useSyncExternalStore
// para evitar desajustes de hidratación entre servidor y cliente.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

const getServerSnapshot = () => null;

function writeSession(session: AuthResult | null) {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Sin almacenamiento disponible: la sesión dura solo mientras la pestaña esté abierta
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const session = useMemo<AuthResult | null>(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthResult;
    } catch {
      return null;
    }
  }, [raw]);

  const user = session?.user ?? null;
  const token = session?.token ?? null;

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [authDialog, setAuthDialog] = useState<{ open: boolean; mode: AuthMode }>({ open: false, mode: "login" });
  const [myCoursesOpen, setMyCoursesOpen] = useState(false);

  const openAuth = useCallback((mode: AuthMode = "login") => setAuthDialog({ open: true, mode }), []);
  const setAuthOpen = useCallback((open: boolean) => setAuthDialog((prev) => ({ ...prev, open })), []);
  const setAuthMode = useCallback((mode: AuthMode) => setAuthDialog((prev) => ({ ...prev, mode })), []);

  const logout = useCallback(() => {
    writeSession(null);
    setEnrollments([]);
  }, []);

  const expireSession = useCallback(() => {
    logout();
    toast.error("Tu sesión expiró. Inicia sesión de nuevo.");
    openAuth("login");
  }, [logout, openAuth]);

  const refreshEnrollments = useCallback(async (currentToken: string) => {
    const res = await apiFetch<{ data: Enrollment[] }>("/enrollments", { token: currentToken });
    setEnrollments(res.data);
  }, []);

  // Carga "Mis cursos" cada vez que cambia el usuario autenticado
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    apiFetch<{ data: Enrollment[] }>("/enrollments", { token })
      .then((res) => {
        if (!cancelled) setEnrollments(res.data);
      })
      .catch((error) => {
        if (error instanceof ApiError && error.status === 401) {
          writeSession(null);
          setEnrollments([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback(async (input: LoginInput) => {
    const res = await apiFetch<{ data: AuthResult }>("/auth/login", { method: "POST", body: input });
    setEnrollments([]);
    writeSession(res.data);
    toast.success(`Hola, ${res.data.user.name}`);
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const res = await apiFetch<{ data: AuthResult }>("/auth/register", { method: "POST", body: input });
    setEnrollments([]);
    writeSession(res.data);
    toast.success(`Cuenta creada. Bienvenido, ${res.data.user.name}`);
  }, []);

  const enroll = useCallback(
    async (courseId: number) => {
      if (!token) {
        toast.info("Inicia sesión para inscribirte a un curso.");
        openAuth("login");
        return;
      }
      try {
        await apiFetch("/enrollments", { method: "POST", token, body: { courseId } });
        await refreshEnrollments(token);
        toast.success("Te inscribiste al curso.");
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) return expireSession();
        if (error instanceof ApiError && error.status === 409) {
          await refreshEnrollments(token).catch(() => undefined);
          toast.info("Ya estás inscrito en este curso.");
          return;
        }
        toast.error(errorMessage(error));
      }
    },
    [token, openAuth, refreshEnrollments, expireSession],
  );

  const unenroll = useCallback(
    async (courseId: number) => {
      if (!token) return;
      try {
        await apiFetch(`/enrollments/${courseId}`, { method: "DELETE", token });
        await refreshEnrollments(token);
        toast.success("Cancelaste tu inscripción.");
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) return expireSession();
        toast.error(errorMessage(error));
      }
    },
    [token, refreshEnrollments, expireSession],
  );

  const enrolledIds = useMemo(
    () => new Set(token ? enrollments.map((e) => e.course.id) : []),
    [token, enrollments],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      enrollments: token ? enrollments : [],
      enrolledIds,
      authDialog,
      myCoursesOpen,
      openAuth,
      setAuthOpen,
      setAuthMode,
      setMyCoursesOpen,
      login,
      register,
      logout,
      enroll,
      unenroll,
    }),
    [user, token, enrollments, enrolledIds, authDialog, myCoursesOpen, openAuth, setAuthOpen, setAuthMode, login, register, logout, enroll, unenroll],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
