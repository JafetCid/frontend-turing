import { apiFetch } from "@/lib/api";
import type { Instructor } from "@/types/api";

export const getInstructors = (limit = 10) =>
  apiFetch<{ data: Instructor[] }>(`/instructors?limit=${limit}`).then((res) => res.data);
