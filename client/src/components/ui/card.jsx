import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export { Card, CardContent };
