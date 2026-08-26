import React, { useState } from "react";
import InputFormSignup from "./inputFormSignup";
import { useAuth } from "@/contexts/useAuth";
import { Link, useNavigate } from "react-router";
import { registerSchema } from "@/schemas/authSchema";
import { Eye, EyeOff } from "lucide-react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateField = (
    fieldName: string,
    value: string,
    extraValue?: string,
  ) => {
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (value.trim().length > 0 && value.trim().length < 2) {
          errorMessage = "O nome deve ter pelo menos 2 caracteres.";
        }
        break;

      case "username":
        if (value.length > 0) {
          const res = registerSchema.shape.username.safeParse(value);
          if (!res.success) errorMessage = res.error.issues[0].message;
        }
        break;

      case "email":
        if (value.length > 0) {
          const res = registerSchema.shape.email.safeParse(value);
          if (!res.success) errorMessage = "Formato de e-mail inválido.";
        }
        break;

      case "password":
        if (value.length > 0) {
          const res = registerSchema.shape.password.safeParse(value);
          if (!res.success) errorMessage = res.error.issues[0].message;
        }

        if (confirmPassword.length > 0 && confirmPassword !== value) {
          setFieldErrors((prev) => ({
            ...prev,
            confirmPassword: "As senhas não coincidem.",
          }));
        } else if (confirmPassword.length > 0 && confirmPassword === value) {
          setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
        break;

      case "confirmPassword": {
        const passToCompare = extraValue !== undefined ? extraValue : password;
        if (value.length > 0 && value !== passToCompare) {
          errorMessage = "As senhas não coincidem.";
        }
        break;
      }

      default:
        break;
    }

    setFieldErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    const validation = registerSchema.safeParse({
      name: name.trim(),
      surname: surname.trim(),
      username,
      email,
      password,
    });

    if (!validation.success) {
      setApiError(validation.error.issues[0].message);
      return;
    }

    if (password !== confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: "As senhas não coincidem.",
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      await signup({ email, name, surname, username, password });
      navigate("/login");
    } catch (err: unknown) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao realizar o cadastro.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    surname.trim() !== "" &&
    email.trim() !== "" &&
    username.trim() !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword &&
    Object.values(fieldErrors).every((err) => err === "");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secundary px-4 py-12 font-poppins ">
      <div className="flex w-full max-w-md flex-col items-center border border-[#E8D8C4] bg-primary p-8 shadow-sm sm:p-10 gap-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-[3px] text-primary-text-100">
          Welcome to Furniro!
        </p>
        <h1 className="mb-2 font-montserrat text-3xl font-bold text-primary-text-200">
          Signup
        </h1>
        <p className="mb-7 text-center text-sm text-primary-text-100">
          Please register with us
        </p>

        {apiError && (
          <p className="mb-4 w-full text-center text-sm text-red-600 bg-red-50 py-2 rounded">
            {apiError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <InputFormSignup
              type="text"
              name="name"
              placeholder="Input your name"
              state={name}
              setState={(e) => {
                setName(e.target.value);
                validateField("name", e.target.value);
              }}
            />
            {fieldErrors.name && (
              <span className="text-xs text-red-500 mt-1 block">
                {fieldErrors.name}
              </span>
            )}
          </div>

          <div>
            <InputFormSignup
              type="text"
              name="surname"
              placeholder="Input your surname"
              state={surname}
              setState={(e) => setSurname(e.target.value)}
            />
          </div>

          <div>
            <InputFormSignup
              type="email"
              name="email"
              placeholder="Input your email"
              state={email}
              setState={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
            />
            {fieldErrors.email && (
              <span className="text-xs text-red-500 mt-1 block">
                {fieldErrors.email}
              </span>
            )}
          </div>

          <div>
            <InputFormSignup
              type="text"
              name="username"
              placeholder="Input your username"
              state={username}
              setState={(e) => {
                setUsername(e.target.value);
                validateField("username", e.target.value);
              }}
            />
            {fieldErrors.username && (
              <span className="text-xs text-red-500 mt-1 block">
                {fieldErrors.username}
              </span>
            )}
          </div>

          <div className="relative">
            <InputFormSignup
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Input your password"
              state={password}
              setState={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {fieldErrors.password && (
              <span className="text-xs text-red-500 mt-1 block">
                {fieldErrors.password}
              </span>
            )}
          </div>

          <div className="relative">
            <InputFormSignup
              type={showConfirmPassword ? "text" : "password"}
              name="password2"
              placeholder="Confirm your password"
              state={confirmPassword}
              setState={(e) => {
                setConfirmPassword(e.target.value);
                validateField("confirmPassword", e.target.value, password);
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {fieldErrors.confirmPassword && (
              <span className="text-xs text-red-500 mt-1 block">
                {fieldErrors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="mt-6 w-full bg-over-secundary py-3 font-poppins text-sm font-bold uppercase tracking-[1px] text-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "LOADING..." : "SIGN UP"}
          </button>
        </form>
        <div className="text-xs text-primary-text-100">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-over-secundary underline hover:opacity-80"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
