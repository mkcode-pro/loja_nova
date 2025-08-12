import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Product } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  view: 'grid' | 'list';
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({ product, view, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { id, name, description, price, image, discount } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede a navegação ao clicar no botão
    e.stopPropagation();
    onAddToCart(product, quantity);
  };

  const cardContent = (
    <>
      {discount && (
        <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
          -{discount}
        </div>
      )}
      <div className="flex-shrink-0">
        <img src={image} alt={name} className={cn("object-cover", view === 'grid' ? "rounded-t-lg h-32 w-full" : "rounded-lg h-24 w-full")} />
      </div>
      <div className={cn("flex-grow flex flex-col", view === 'grid' ? "p-3 space-y-2" : "p-0")}>
        <div className="flex-grow">
          <h3 className="text-sm font-bold leading-tight truncate">{name}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{description}</p>
        </div>
        <div className="space-y-2 mt-2">
          <p className="text-lg font-bold text-blue-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}</p>
          <div className="flex items-center gap-2">
            <Input type="number" value={quantity} onChange={(e) => { e.preventDefault(); setQuantity(Math.max(1, parseInt(e.target.value) || 1))}} onClick={(e) => e.preventDefault()} className="h-9 w-16 text-center" />
            <Button onClick={handleAddToCart} size="sm" className="bg-blue-700 hover:bg-blue-800 h-9 flex-grow">Adicionar</Button>
          </div>
        </div>
      </div>
    </>
  );

  if (view === 'list') {
    return (
      <Link to={`/produto/${id}`} className="block w-full">
        <Card className="w-full overflow-hidden shadow-sm relative transition-shadow hover:shadow-lg flex flex-row items-center p-2 gap-3">
          {/* O conteúdo da lista é um pouco diferente, então vamos simplificar por enquanto */}
          <div className="w-1/4 shrink-0">
            <img src={image} alt={name} className="rounded-lg object-cover w-full h-24" />
          </div>
          <div className="flex-grow space-y-1">
            <div>
              <h3 className="text-sm font-bold leading-tight truncate">{name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{description}</p>
            </div>
            <p className="text-lg font-bold text-blue-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Input type="number" value={quantity} onChange={(e) => { e.preventDefault(); setQuantity(Math.max(1, parseInt(e.target.value) || 1))}} onClick={(e) => e.preventDefault()} className="h-9 w-16 text-center" />
            <Button onClick={handleAddToCart} size="sm" className="bg-blue-700 hover:bg-blue-800 h-9 w-full">Adicionar</Button>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/produto/${id}`} className="block h-full">
      <Card className="w-full overflow-hidden shadow-sm relative transition-shadow hover:shadow-lg flex flex-col h-full">
        {cardContent}
      </Card>
    </Link>
  );
};