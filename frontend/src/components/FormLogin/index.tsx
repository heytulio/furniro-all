import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import InputFormLogin from "./inputFormLogin";
import { useLogin } from "@/hooks/useLogin";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setEmailError("O e-mail é obrigatório.");
    } else if (!emailRegex.test(value)) {
      setEmailError("Digite um e-mail válido.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError("A senha é obrigatória.");
    } else if (value.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailError && !passwordError && email && password) {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    }
  };

  const isFormValid =
    email !== "" && password !== "" && !emailError && !passwordError;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secundary px-4 py-12 font-poppins">
      <div className="flex w-full max-w-md flex-col items-center border border-[#E8D8C4] bg-primary p-8 shadow-sm sm:p-10">
        <p className="mb-2 text-xs font-medium uppercase tracking-[3px] text-primary-text-100">
          Welcome back
        </p>
        <h1 className="mb-2 font-montserrat text-3xl font-bold text-primary-text-200">
          Login
        </h1>
        <p className="mb-7 text-center text-sm text-primary-text-100">
          Access your account to continue.
        </p>

        {error && (
          <p className="mb-4 w-full text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <InputFormLogin
            type="email"
            name="email"
            placeholder="Your email"
            state={email}
            setState={validateEmail}
            error={emailError}
          />

          <InputFormLogin
            type="password"
            name="password"
            placeholder="Your password"
            state={password}
            setState={validatePassword}
            error={passwordError}
          />

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="mb-6 w-full bg-over-secundary py-3 font-poppins text-sm font-bold uppercase tracking-[1px] text-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "LOADING..." : "LOGIN"}
          </button>
        </form>

        <div className="text-xs text-primary-text-100">
          Do not have and account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-over-secundary underline hover:opacity-80"
          >
            Sign-up
          </Link>
        </div>
      </div>
    </div>
  );
}
