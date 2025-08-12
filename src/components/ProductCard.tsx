import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Product } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  view: 'grid' | 'list';
  onAddToCart: (product: Product, quantity: number) => void;
  discount?: string;
}

export const ProductCard = ({ product, view, onAddToCart, discount }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { name, description, price, image } = product;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const cardClasses = "w-full overflow-hidden shadow-sm relative transition-shadow hover:shadow-lg flex flex-col";

  if (view === 'list') {
    return (
      <Card className={cn("w-full overflow-hidden shadow-sm relative transition-shadow hover:shadow-lg", "flex flex-row items-center p-2 gap-3")}>
        {discount && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
            -{discount}
          </div>
        )}
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
          <Input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="h-9 w-16 text-center" />
          <Button onClick={handleAddToCart} size="sm" className="bg-blue-700 hover:bg-blue-800 h-9 w-full">Adicionar</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cardClasses}>
      {discount && (
        <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
          -{discount}
        </div>
      )}
      <div className="flex-shrink-0">
        <img src={image} alt={name} className="rounded-t-lg object-cover h-32 w-full" />
      </div>
      <CardContent className="p-3 space-y-2 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-sm font-bold leading-tight truncate">{name}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{description}</p>
        </div>
        <div className="space-y-2 mt-2">
            <p className="text-lg font-bold text-blue-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}</p>
            <div className="flex items-center gap-2">
            <Input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="h-9 w-16 text-center" />
            <Button onClick={handleAddToCart} size="sm" className="bg-blue-700 hover:bg-blue-800 h-9 flex-grow">Adicionar</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};