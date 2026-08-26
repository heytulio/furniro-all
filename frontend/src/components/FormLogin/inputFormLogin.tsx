import type { ChangeEvent, ReactNode } from "react";

type InputFormLoginProps = {
  type: string;
  name: string;
  placeholder: string;
  state: string;
  setState: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: ReactNode;
};

const InputFormLogin = ({
  type,
  name,
  placeholder,
  state,
  setState,
  error,
  icon,
}: InputFormLoginProps) => {
  return (
    <div className="mb-4 w-full">
      <div className="flex items-center border border-[#D9D9D9] bg-primary px-3 py-3 transition focus-within:border-over-secundary focus-within:ring-1 focus-within:ring-over-secundary">
        {icon && <span className="mr-3 text-primary-text-100">{icon}</span>}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={state}
          onChange={setState}
          className="w-full bg-transparent text-sm text-primary-text outline-none placeholder:text-primary-text-100"
        />
      </div>
      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </div>
  );
};

export default InputFormLogin;
