import { useState } from "react";
import { API_BASE_URL } from "@/config/env";
import { useAuth } from "@/contexts/useAuth";

type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  createdAt: Date;
};

export function useLogin() {
  const { login: authLogin, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha na autenticação. Verifique suas credenciais.");
      }

      const data: User = await response.json();

      authLogin(data);

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login };
}
