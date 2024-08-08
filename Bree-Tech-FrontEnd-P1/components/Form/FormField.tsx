import React, { ChangeEvent } from 'react';

// Defines the props that the FormField component will accept.
interface FormFieldProps {
  id: string; // Unique identifier for the input field
  label: string; // Text label for the input field
  value: string; // Current value of the input field
  onChange: (value: string) => void;  // Function to handle changes in the input value
  placeholder: string; // Placeholder text when the input is empty
  required?: boolean; // Optional flag to make the field required
  disabled?: boolean; // Optional flag to disable the input field
  inputType?: string; // Optional type of input (e.g., text, date)
}

// FormField component to render a labeled input field
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
  // Handles input changes and passes the new value to the onChange handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);  // Pass the string value to the handler
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={inputType} // Specifies the type of input (text, date, etc.)
        id={id} // Unique ID for the input
        value={value} // Current value of the input
        onChange={handleChange} // Updates the value when input changes
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={placeholder} // Placeholder text when input is empty
        required={required} // Makes the field required if true
        aria-required={required} // Accessibility attribute for required field
        disabled={disabled} // Disables the input field if true
      />
    </div>
  );
};
