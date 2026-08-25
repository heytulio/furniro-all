import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface AlertMessageProps {
  type: "success" | "error";
  message: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
}) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`mb-6 flex items-center gap-2 rounded p-3 text-sm ${
        isSuccess ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
      }`}
    >
      {isSuccess ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      <span>{message}</span>
    </div>
  );
};
