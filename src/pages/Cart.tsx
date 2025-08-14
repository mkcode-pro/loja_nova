import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const { cartItems, getCartTotal, updateItemQuantity, removeFromCart } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">Seu carrinho está vazio.</p>
            <Button asChild>
              <Link to="/">Continuar Comprando</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-contain rounded-md" />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 0)}
                      className="w-16 h-9 text-center"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getCartTotal())}</span>
              </div>
              <p className="text-sm text-gray-500">Taxas e frete serão calculados na finalização da compra.</p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 mt-2">
                <Link to="/login">Finalizar Compra</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default CartPage;