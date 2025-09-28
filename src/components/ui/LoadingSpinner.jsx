import { Loader2 } from "lucide-react";
import React from "react";

export const LoadingCard = ({ children }) => (
  <div className="flex items-center justify-center p-6 border rounded-lg shadow-sm bg-white">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
    {/* 👇 if children exist, render them */}
    {children && <div className="ml-3">{children}</div>}
  </div>
);
export function LoadingSpinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
}
export const SkeletonCard = ({ children }) => (
  <div className="p-6 border rounded-lg shadow-sm bg-white">
    <div className="h-4 w-32 mb-3 animate-pulse bg-gray-300 rounded"></div>
    <div className="h-3 w-56 mb-2 animate-pulse bg-gray-200 rounded"></div>
    <div className="h-3 w-40 animate-pulse bg-gray-200 rounded"></div>
    {/* 👇 children slot */}
    {children && <div className="mt-3">{children}</div>}
  </div>
);

