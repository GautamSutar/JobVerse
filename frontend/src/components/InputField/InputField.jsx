import React from "react";
const InputField = ({
  icon,
  name,
  type,
  placeholder,
  register,
  error,
  dataTestId,
}) => {

  const Icon = icon;
  return (
    <div>
      <div className="relative">
        <Icon className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
        <input
          {...register(name, { required: `${placeholder} is required` })}
          type={type}
          placeholder={placeholder}
          data-testid={dataTestId || `${name}-input`} 
          className={`w-full border rounded-lg pl-12 pr-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 transition-colors ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-200 focus:ring-indigo-400"
          }`}
        />
      </div>
      {error && (
        <p
          className="text-red-500 text-sm mt-1 ml-1"
          data-testid={`${name}-error`}
        >
          {" "}
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputField; 
