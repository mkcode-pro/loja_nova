interface BrandCardProps {
  src: string;
  alt: string;
}

export const BrandCard = ({ src, alt }: BrandCardProps) => {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-center h-24 bg-white shadow-sm">
      <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
    </div>
  );
};