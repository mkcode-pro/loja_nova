import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { SearchOverlay } from "./SearchOverlay";

export const Header = () => {
  const { getCartItemCount } = useCart();
  const { isLoggedIn } = useAuth();
  const itemCount = getCartItemCount();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20">
        {/* Mobile Header */}
        <div className="md:hidden p-4">
          <div className="bg-card border border-border rounded-full flex items-center justify-between p-2 shadow-lg">
              <Link to="/" className="text-lg font-bold pl-4">
              <span className="text-foreground">IMPERIO</span>
              <span className="text-primary">PHARMA</span>
              </Link>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-6 w-6" />
                </Button>
                <Link to={isLoggedIn ? "/perfil" : "/login"}>
                  <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
                  </Button>
                </Link>
              </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex bg-card items-center justify-between p-4 max-w-7xl mx-auto">
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
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};