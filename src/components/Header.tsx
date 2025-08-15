import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ALL_PRODUCTS } from "@/data/products";
import { Product } from "@/context/CartContext";
import { SearchSuggestions } from "./SearchSuggestions";

export const Header = () => {
  const { getCartItemCount } = useCart();
  const { isLoggedIn } = useAuth();
  const itemCount = getCartItemCount();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = ALL_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const closeSuggestions = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <header className="sticky top-0 z-20">
      {/* Mobile Header */}
      <div className="md:hidden p-4 space-y-2">
        <div className="flex items-center justify-between">
            <Link to="/" className="text-lg font-bold">
              <span className="text-foreground">IMPERIO</span>
              <span className="text-primary">PHARMA</span>
            </Link>
            <div className="flex items-center gap-1">
              <Link to={isLoggedIn ? "/perfil" : "/login"}>
                <Button variant="ghost" size="icon">
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            </div>
        </div>
        <div className="relative">
          <Input 
            placeholder="Pesquisar..." 
            className="rounded-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <SearchSuggestions suggestions={suggestions} onClose={closeSuggestions} />
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex bg-card items-center justify-between p-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-foreground">IMPERIO</span>
          <span className="text-primary">PHARMA</span>
        </Link>
        <div className="relative flex-grow max-w-md">
          <Input 
            placeholder="Pesquisar por produtos ou marcas..." 
            className="rounded-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <SearchSuggestions suggestions={suggestions} onClose={closeSuggestions} />
        </div>
        <div className="flex items-center gap-4">
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