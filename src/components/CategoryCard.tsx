import { Link } from "react-router-dom";

interface CategoryCardProps {
  imageSrc: string;
  title: string;
}

export const CategoryCard = ({ imageSrc, title }: CategoryCardProps) => {
  return (
    <Link to={`/diversos/${encodeURIComponent(title)}`} className="block">
      <div className="border rounded-lg p-4 flex items-center justify-center h-24 bg-white shadow-sm hover:shadow-md transition-shadow">
        <img src={imageSrc} alt={title} className="max-h-full max-w-full object-contain" />
      </div>
    </Link>
  );
};