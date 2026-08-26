import React, { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
type ContactFormInputProps = {
  label: string;
  error?: string;
  isTextArea?: boolean;
} & ComponentPropsWithRef<"input"> &
  ComponentPropsWithRef<"textarea">;

const ContactFormInput = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  ContactFormInputProps
>(({ label, id, error, isTextArea = false, className = "", ...props }, ref) => {
  const baseInputStyles = `w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors placeholder-gray-400 ${
    error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-300 focus:border-[#B88E2F]"
  } ${className}`;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-black">
        {label}
      </label>

      {isTextArea ? (
        <textarea
          id={id}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          rows={4}
          className={`${baseInputStyles} resize-none`}
          {...(props as ComponentPropsWithRef<"textarea">)}
        />
      ) : (
        <input
          id={id}
          ref={ref as React.Ref<HTMLInputElement>}
          className={baseInputStyles}
          {...(props as ComponentPropsWithRef<"input">)}
        />
      )}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

ContactFormInput.displayName = "ContactFormInput";

export default ContactFormInput;
