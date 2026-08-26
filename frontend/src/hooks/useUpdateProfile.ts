import { useState } from "react";
import { API_BASE_URL } from "@/config/env";

type UserData = {
  name?: string;
  surname?: string;
  email?: string;
  username?: string;
};

export const useUpdateProfile = (user: UserData | null) => {
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    const updatedData = {
      name,
      surname,
      username,
      email,
      ...(password ? { password } : {}),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro ao atualizar perfil.");
      }

      setSuccessMessage("Perfil atualizado com sucesso!");
      setPassword("");
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Erro ao atualizar perfil.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState: { name, surname, username, email, password },
    setters: { setName, setSurname, setUsername, setEmail, setPassword },
    status: { isSubmitting, successMessage, errorMessage },
    handleSubmit,
  };
};
