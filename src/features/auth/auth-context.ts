"use client";

import { createContext, useContext } from "react";
import type { Enrollment, User } from "@/types/api";

export type AuthMode = "login" | "register";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
}

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  enrollments: Enrollment[];
  enrolledIds: Set<number>;
  authDialog: { open: boolean; mode: AuthMode };
  myCoursesOpen: boolean;
  openAuth: (mode?: AuthMode) => void;
  setAuthOpen: (open: boolean) => void;
  setAuthMode: (mode: AuthMode) => void;
  setMyCoursesOpen: (open: boolean) => void;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  enroll: (courseId: number) => Promise<void>;
  unenroll: (courseId: number) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
}
