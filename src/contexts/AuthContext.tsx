import React, { createContext, useContext, useEffect, useState } from "react";
import type { Member } from "../types";
import {
  getCurrentMember,
  logout as logoutService,
} from "../services/authService";

interface AuthContextType {
  member: Member | null;
  loginLocal: (member: Member) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  member: null,
  loginLocal: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [member, setMember] = useState<Member | null>(getCurrentMember());

  useEffect(() => {
    const stored = getCurrentMember();
    if (stored) setMember(stored);
  }, []);

  function loginLocal(m: Member) {
    setMember(m);
    localStorage.setItem("member", JSON.stringify(m));
  }

  function logout() {
    logoutService();
    setMember(null);
  }

  return (
    <AuthContext.Provider
      value={{ member, loginLocal, logout, isAuthenticated: !!member }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
