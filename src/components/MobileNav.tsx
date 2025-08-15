import { Button } from "@/components/ui/button";
import { Home, Search, User, ShoppingCart, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/produtos", icon: Search, label: "Produtos" },
  { href: "/central", icon: Sparkles, label: "Central" },
  { href: "/perfil", icon: User, label: "Conta" }, // Este será dinâmico
  { href: "/carrinho", icon: ShoppingCart, label: "Carrinho" },
];

export const MobileNav = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return (
    <div className="fixed bottom-4 left-0 right-0 px-4 z-50 md:hidden">
      <div className="bg-card border border-border rounded-full flex justify-around items-center p-2 max-w-sm mx-auto shadow-lg">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          // Lógica para o link da conta
          let finalHref = item.href;
          if (item.label === "Conta") {
            finalHref = isLoggedIn ? "/perfil" : "/login";
          }

          if (item.label === "Central") {
            return (
              <Link key={item.label} to={item.href} className="-mt-8">
                <Button size="icon" className="rounded-full h-16 w-16 bg-primary shadow-lg shadow-primary/50">
                  <item.icon className="h-8 w-8" />
                </Button>
              </Link>
            );
          }
          return (
            <Link key={item.label} to={finalHref} className="flex-1">
              <div className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                (isActive && item.label !== "Conta") || (isActive && item.label === "Conta" && (location.pathname === "/perfil" || location.pathname === "/login"))
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}>
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};