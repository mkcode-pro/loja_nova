import React from "react";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const CategoryCard = ({ icon, title, subtitle }: CategoryCardProps) => {
  return (
    <div className="border rounded-lg p-2 flex items-center gap-3 bg-white h-full shadow-sm">
      <div className="text-blue-700 shrink-0">{icon}</div>
      <div className="flex flex-col">
        <h3 className="font-bold text-sm uppercase">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};