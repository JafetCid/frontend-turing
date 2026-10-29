import { apiFetch } from "@/lib/api";
import type { Course, Level, Paginated } from "@/types/api";

export interface CourseQuery {
  page?: number;
  limit?: number;
  categoryId?: number;
  level?: Level;
  featured?: boolean;
  search?: string;
  sort?: "latest" | "rating" | "price_asc" | "price_desc";
}

function toQuery(query: CourseQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const text = params.toString();
  return text ? `?${text}` : "";
}

export const getCourses = (query: CourseQuery = {}) => apiFetch<Paginated<Course>>(`/courses${toQuery(query)}`);
