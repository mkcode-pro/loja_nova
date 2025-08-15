import { Link } from "react-router-dom";

interface CategoryCardProps {
  imageSrc: string;
  title: string;
}

export const CategoryCard = ({ imageSrc, title }: CategoryCardProps) => {
  return (
    <Link to={`/diversos/${encodeURIComponent(title)}`} className="block">
      <div className="border border-border rounded-lg p-4 flex items-center justify-center h-24 bg-card shadow-sm hover:border-primary transition-colors">
        <img src={imageSrc} alt={title} className="max-h-full max-w-full object-contain" />
      </div>
    </Link>
  );
};