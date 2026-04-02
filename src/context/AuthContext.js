"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginAPI, registerAPI, getProfileAPI, logoutAPI } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Load token on mount and validate
  useEffect(() => {
    const stored = localStorage.getItem("accessToken");
    if (stored) {
      setToken(stored);
      getProfileAPI()
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await loginAPI(email, password);
    const accessToken = res.data?.accessToken || res.data?.token;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setToken(accessToken);
      // Fetch profile
      const profile = await getProfileAPI();
      setUser(profile.data);
    }
    return res;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await registerAPI(name, email, password);
    const accessToken = res.data?.accessToken || res.data?.token;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setToken(accessToken);
      const profile = await getProfileAPI();
      setUser(profile.data);
    }
    return res;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAPI();
    } catch {
      // ignore
    }
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
