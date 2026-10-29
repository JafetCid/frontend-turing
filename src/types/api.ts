export type Role = "ADMIN" | "USER";
export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResult {
  user: User;
  token: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  coursesCount: number;
}

export interface Instructor {
  id: number;
  name: string;
  headline: string;
  bio: string | null;
  avatarUrl: string | null;
  coursesCount: number;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  level: Level;
  durationHours: number;
  rating: number;
  featured: boolean;
  category: { id: number; name: string; slug: string };
  instructor: { id: number; name: string; headline: string; avatarUrl: string | null };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface Enrollment {
  enrolledAt: string;
  course: Course;
}
