import { Link } from "react-router-dom";

interface BrandCardProps {
  src: string;
  alt: string;
  brandName: string;
}

export const BrandCard = ({ src, alt, brandName }: BrandCardProps) => {
  return (
    <Link to={`/marcas/${encodeURIComponent(brandName)}`} className="block">
      <div className="border rounded-lg p-4 flex items-center justify-center h-24 bg-white shadow-sm hover:shadow-md transition-shadow">
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
    </Link>
  );
};