// components/common/ErrorCard.tsx
import React from "react";

interface ErrorCardProps {
  message: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message }) => {
  return (
    <div className="rounded-2xl border border-red-400 bg-red-50 p-5 lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-red-700 lg:mb-7">
        Error
      </h3>
      <p className="text-red-600">{message}</p>
    </div>
  );
};

export default ErrorCard;
