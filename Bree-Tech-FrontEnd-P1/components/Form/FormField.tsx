import React, { ChangeEvent } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;  // Change to accept a string value
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  inputType?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  inputType = 'text',
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);  // Pass the string value to the handler
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={inputType}
        id={id}
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
        aria-required={required}
        disabled={disabled}
      />
    </div>
  );
};
