"use client";

import { useCallback, useRef, useState } from "react";
import { errorMessage } from "@/lib/api";
import type { Course, Paginated } from "@/types/api";
import { getCourses } from "./api";

export type FeedStatus = "idle" | "switching" | "loading-more" | "error";

/**
 * Estado del grid: categoría activa, cursos acumulados y paginación.
 * Separa la lógica de datos de la presentación y descarta respuestas obsoletas.
 */
export function useCourseFeed(initial: Paginated<Course>, pageSize: number) {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [courses, setCourses] = useState(initial.data);
  const [meta, setMeta] = useState(initial.meta);
  const [status, setStatus] = useState<FeedStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const latestRequest = useRef(0);

  const selectCategory = useCallback(
    async (next: number | null) => {
      if (next === categoryId) return;
      const request = ++latestRequest.current;
      setCategoryId(next);
      setStatus("switching");
      setError(null);
      try {
        const res = await getCourses({ categoryId: next ?? undefined, page: 1, limit: pageSize });
        if (request !== latestRequest.current) return;
        setCourses(res.data);
        setMeta(res.meta);
        setStatus("idle");
      } catch (e) {
        if (request !== latestRequest.current) return;
        setError(errorMessage(e));
        setStatus("error");
      }
    },
    [categoryId, pageSize],
  );

  const loadMore = useCallback(async () => {
    const request = ++latestRequest.current;
    setStatus("loading-more");
    setError(null);
    try {
      const res = await getCourses({ categoryId: categoryId ?? undefined, page: meta.page + 1, limit: pageSize });
      if (request !== latestRequest.current) return;
      setCourses((prev) => [...prev, ...res.data.filter((c) => !prev.some((p) => p.id === c.id))]);
      setMeta(res.meta);
      setStatus("idle");
    } catch (e) {
      if (request !== latestRequest.current) return;
      setError(errorMessage(e));
      setStatus("error");
    }
  }, [categoryId, meta.page, pageSize]);

  return { categoryId, courses, meta, status, error, selectCategory, loadMore };
}
