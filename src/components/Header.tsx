import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const { getCartItemCount } = useCart();
  const { isLoggedIn } = useAuth();
  const itemCount = getCartItemCount();

  return (
    <header className="bg-card sticky top-0 z-20">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4">
        <Link to="/" className="text-lg font-bold">
          <span className="text-foreground">IMPERIO</span>
          <span className="text-primary">PHARMA</span>
        </Link>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-foreground">IMPERIO</span>
          <span className="text-primary">PHARMA</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link to="#" className="hover:text-primary">Início</Link>
          <Link to="#" className="hover:text-primary">Produtos</Link>
          <Link to="#" className="hover:text-primary">Sobre</Link>
          <Link to="#" className="hover:text-primary">Contato</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/carrinho" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {itemCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </div>
            )}
          </Link>
          <Link to={isLoggedIn ? "/perfil" : "/login"}>
            <Button>{isLoggedIn ? "Minha Conta" : "Entrar"}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};