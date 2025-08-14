import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart, Search, Store, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { getCartItemCount } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const itemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const AuthButton = () => {
    if (isLoggedIn) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-700 hover:bg-blue-800 shrink-0">
              <User className="mr-2 h-5 w-5" /> Meu Perfil
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/perfil")}>
              Meus Pedidos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Button asChild className="bg-blue-700 hover:bg-blue-800 shrink-0">
        <Link to="/login">
          <User className="mr-2 h-5 w-5" /> Entrar
        </Link>
      </Button>
    );
  };

  const AuthButtonMobile = () => {
     if (isLoggedIn) {
      return (
        <Button asChild className="bg-blue-700 hover:bg-blue-800 shrink-0">
          <Link to="/perfil">
            <User className="mr-2 h-4 w-4" /> Perfil
          </Link>
        </Button>
      );
    }
    return (
       <Button asChild className="bg-blue-700 hover:bg-blue-800 shrink-0">
        <Link to="/login">
          <User className="mr-2 h-4 w-4" /> Entrar
        </Link>
      </Button>
    );
  }

  return (
    <header className="bg-white sticky top-0 z-20">
      <div className="h-0.5 bg-gradient-to-r from-red-500 to-blue-600" />
      <div className="md:hidden">
        <div className="flex items-center gap-2 p-2">
            <Link to="/" className="shrink-0">
              <img src="/placeholder.svg" alt="Logo" className="h-8 w-auto" />
            </Link>
            <Input placeholder="Pesquisar..." className="flex-grow" />
            <AuthButtonMobile />
        </div>
        <div className="h-0.5 bg-gradient-to-r from-red-500 to-blue-600" />
      </div>
      <div className="hidden md:block border-b">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            <Link to="/" className="text-2xl font-bold text-blue-800">
            SUA LOGO
            </Link>
            <div className="flex-grow max-w-md">
                <div className="relative">
                    <Input placeholder="Pesquisar por produtos ou marcas..." className="pl-10" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <nav className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-600">
                <Store className="mr-2 h-5 w-5" /> Marcas
            </Button>
            <Link to="/carrinho" className="relative">
                <Button variant="ghost" className="text-gray-600">
                <ShoppingCart className="mr-2 h-5 w-5" /> Carrinho
                </Button>
                {itemCount > 0 && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                    {itemCount}
                  </div>
                )}
            </Link>
            <AuthButton />
            </nav>
        </div>
      </div>
    </header>
  );
};