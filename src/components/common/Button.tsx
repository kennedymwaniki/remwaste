import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-3 px-6 rounded-lg font-medium ${
        variant === "primary"
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-600 hover:bg-gray-500 text-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
