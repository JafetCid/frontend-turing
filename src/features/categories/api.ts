import { apiFetch } from "@/lib/api";
import type { Category } from "@/types/api";

export const getCategories = () => apiFetch<{ data: Category[] }>("/categories").then((res) => res.data);
