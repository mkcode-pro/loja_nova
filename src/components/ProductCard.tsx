import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

export const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <Card className="w-full overflow-hidden shadow-sm">
      <CardHeader className="p-0">
        <img src={image} alt={name} className="rounded-t-lg object-cover h-32 w-full" />
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-sm font-bold leading-tight">{name}</CardTitle>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-3 pt-0">
        <p className="text-base font-semibold">{price}</p>
        <Button size="sm" className="w-full bg-blue-700 hover:bg-blue-800">Adicionar</Button>
      </CardFooter>
    </Card>
  );
};