import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Store } from "lucide-react";

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white z-10 md:hidden">
      <div className="h-0.5 bg-gradient-to-r from-red-500 to-blue-600" />
      <div className="p-2 flex justify-around items-center">
        <Button variant="ghost" className="flex flex-col h-auto text-gray-600">
          <Store size={24} />
          <span className="text-xs">Marcas</span>
        </Button>
        <Button className="bg-blue-700 hover:bg-blue-800 flex items-center gap-2 px-6 py-2">
          <Menu size={24} />
          <span className="font-bold">Menu</span>
        </Button>
        <div className="relative">
          <Button variant="ghost" className="flex flex-col h-auto text-gray-600">
            <ShoppingCart size={24} />
            <span className="text-xs">Carrinho</span>
          </Button>
          <div className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-red-500 to-blue-600" />
    </nav>
  );
};