import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">Seu carrinho está vazio.</p>
          <Button asChild>
            <Link to="/">Continuar Comprando</Link>
          </Button>
        </div>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default CartPage;