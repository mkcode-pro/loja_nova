import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { toast } from "sonner";

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const { shippingAddress, shippingMethod } = useOrder();

  if (!shippingAddress || !shippingMethod) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-muted-foreground">Carregando resumo do pedido...</p>
        <Button onClick={() => navigate('/carrinho')} className="mt-4">Voltar ao Carrinho</Button>
      </div>
    );
  }

  const handleEditAddress = () => {
    sessionStorage.setItem('editingFromSummary', 'true');
    navigate('/checkout');
  };

  const handleEditCart = () => {
    sessionStorage.setItem('editingFromSummary', 'true');
    navigate('/carrinho');
  };
  
  const handleFinalizeOrder = () => {
    toast.success("Pedido finalizado com sucesso! (Simulação)");
    // Aqui, no futuro, limparíamos o carrinho e o pedido
    navigate('/');
  }

  const total = getCartTotal() + shippingMethod.price;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow pb-32 md:pb-6 space-y-4">
        <h1 className="text-2xl font-bold">Resumo do Pedido</h1>

        <div className="bg-card p-4 rounded-lg shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Endereço de Entrega</h2>
            <Button variant="outline" size="sm" onClick={handleEditAddress}>Editar</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {shippingAddress.name}<br />
            {shippingAddress.address}, {shippingAddress.number} {shippingAddress.complement && `- ${shippingAddress.complement}`}<br />
            {shippingAddress.neighborhood} - {shippingAddress.city}, {shippingAddress.state}<br />
            CEP: {shippingAddress.cep}
          </p>
        </div>

        <div className="bg-card p-4 rounded-lg shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Itens do Pedido</h2>
            <Button variant="outline" size="sm" onClick={handleEditCart}>Editar</Button>
          </div>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="bg-card p-4 rounded-lg shadow-sm space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getCartTotal())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frete ({shippingMethod.method})</span>
            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingMethod.price)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
            <span>Total</span>
            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
          </div>
        </div>
        
        <Button className="w-full" onClick={handleFinalizeOrder}>FINALIZAR PEDIDO</Button>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default OrderSummaryPage;