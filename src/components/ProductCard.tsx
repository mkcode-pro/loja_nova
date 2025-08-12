import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  discount?: string;
  view: 'grid' | 'list';
}

export const ProductCard = ({ name, description, price, image, discount, view }: ProductCardProps) => {
  const cardClasses = "w-full overflow-hidden shadow-sm relative transition-shadow hover:shadow-lg";

  // Layout para a visualização em LISTA
  if (view === 'list') {
    return (
      <Card className={cn(cardClasses, "flex items-center p-2 gap-3")}>
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
            <h3 className="text-sm font-bold leading-tight">{name}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <p className="text-lg font-bold text-blue-800">{price}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Input type="number" defaultValue={1} className="h-9 w-16 text-center" />
          <Button size="sm" className="bg-blue-700 hover:bg-blue-800 h-9 w-full">Adicionar</Button>
        </div>
      </Card>
    );
  }

  // Layout para a visualização em GRID (padrão)
  return (
    <Card className={cardClasses}>
      {discount && (
        <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
          -{discount}
        </div>
      )}
      <div>
        <img src={image} alt={name} className="rounded-t-lg object-cover h-32 w-full" />
      </div>
      <CardContent className="p-3 space-y-2">
        <div>
          <h3 className="text-sm font-bold leading-tight">{name}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <p className="text-lg font-bold text-blue-800">{price}</p>
        <div className="flex items-center gap-2">
          <Input type="number" defaultValue={1} className="h-9 w-16 text-center" />
          <Button size="sm" className="bg-blue-700 hover:bg-blue-800 h-9 flex-grow">Adicionar</Button>
        </div>
      </CardContent>
    </Card>
  );
};