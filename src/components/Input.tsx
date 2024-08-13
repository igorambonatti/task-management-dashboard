import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register}
        className={`mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-[#23e163] focus:border-[#23e163] dark:bg-dark-bg dark:border-gray-600 dark:text-gray-300 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default InputField;
