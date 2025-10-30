// src/services/authService.ts
import api from "./api";
import type { Member } from "../types";

interface LoginResp {
  token: string;
  member: Member;
}

export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResp>("/auth/login", {
    email,
    password,
  });
  // lưu token + member (frontend store)
  localStorage.setItem("token", data.token);
  localStorage.setItem("member", JSON.stringify(data.member));
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("member");
}

export function getCurrentMember(): Member | null {
  const raw = localStorage.getItem("member");
  return raw ? JSON.parse(raw) : null;
}
