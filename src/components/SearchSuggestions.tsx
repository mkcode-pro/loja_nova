import { Link } from "react-router-dom";
import { Product } from "@/context/CartContext";

interface SearchSuggestionsProps {
  suggestions: Product[];
  onClose: () => void;
}

export const SearchSuggestions = ({ suggestions, onClose }: SearchSuggestionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-50">
      <ul className="divide-y divide-border">
        {suggestions.map(product => (
          <li key={product.id}>
            <Link 
              to={`/produto/${product.id}`} 
              onClick={onClose}
              className="flex items-center gap-4 p-3 hover:bg-muted/50"
            >
              <img src={product.image} alt={product.name} className="h-12 w-12 object-contain rounded-md" />
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};