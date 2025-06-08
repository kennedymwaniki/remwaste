import React from "react";

interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className = "",
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-lg bg-gray-800 border ${
          value ? "border-blue-400" : "border-gray-600"
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
