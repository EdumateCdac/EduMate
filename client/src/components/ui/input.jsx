import React from "react";

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export { Input };
