import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { CartItem } from "@/context/CartContext";

interface AddedToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CartItem | null;
  cartSubtotal: number;
}

export const AddedToCartModal = ({ isOpen, onClose, product, cartSubtotal }: AddedToCartModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Produto adicionado!</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center space-y-4">
          <img src={product.image} alt={product.name} className="h-24 w-24 mx-auto object-contain" />
          <DialogDescription className="text-base">
            {product.name} adicionado ao carrinho!
          </DialogDescription>
          <p className="font-bold text-lg">
            Subtotal no carrinho: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartSubtotal)}
          </p>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button onClick={onClose} className="bg-blue-700 hover:bg-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continuar Comprando
          </Button>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link to="/carrinho">
              <ShoppingCart className="mr-2 h-4 w-4" /> Ir para o Carrinho
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};