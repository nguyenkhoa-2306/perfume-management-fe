// src/services/perfumeService.ts
import api from "./api";
import type { Perfume } from "../types";

export async function getAllPerfumes() {
  const { data } = await api.get<Perfume[]>("/perfumes");
  return data;
}

export async function getPerfumeById(id: string) {
  const { data } = await api.get<Perfume>(`/perfumes/${id}`);
  return data;
}

export async function addComment(
  perfumeId: string,
  rating: number,
  content: string
) {
  // backend route: POST /perfumes/:perfumeId/comments
  const { data } = await api.post(`/perfumes/${perfumeId}/comments`, {
    rating,
    content,
  });
  return data;
}
