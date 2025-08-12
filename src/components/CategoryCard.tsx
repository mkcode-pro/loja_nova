import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const CategoryCard = ({ icon, title, subtitle }: CategoryCardProps) => {
  return (
    <Link to={`/diversos/${encodeURIComponent(title)}`} className="block h-full">
      <div className="border rounded-lg p-2 flex items-center gap-3 bg-white h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="text-blue-700 shrink-0">{icon}</div>
        <div className="flex flex-col">
          <h3 className="font-bold text-sm uppercase">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </Link>
  );
};