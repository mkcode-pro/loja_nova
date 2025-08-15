import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Truck } from "lucide-react";
import { shippingRates } from "@/data/shippingRates";
import { toast } from "sonner";

interface ShippingOption {
  method: string;
  price: number;
}

const CartPage = () => {
  const { cartItems, getCartTotal, updateItemQuantity, removeFromCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  const handleConfirmCart = () => {
    const editingFromSummary = sessionStorage.getItem('editingFromSummary');
    if (editingFromSummary) {
      sessionStorage.removeItem('editingFromSummary');
      navigate('/resumo');
    } else {
      sessionStorage.setItem('redirectAfterAuth', '/checkout');
      navigate(isLoggedIn ? '/checkout' : '/login');
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 8) {
      let formattedCep = rawValue;
      if (rawValue.length > 5) {
        formattedCep = rawValue.slice(0, 5) + "-" + rawValue.slice(5);
      }
      setCep(formattedCep);
    }
  };

  const handleSimulateShipping = async () => {
    const cleanedCep = cep.replace(/\D/g, "");
    if (cleanedCep.length !== 8) {
      toast.error("Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }
    setIsLoadingShipping(true);
    setShippingOptions([]);
    setSelectedShipping(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();
      if (data.erro) {
        toast.error("CEP não encontrado. Verifique o número digitado.");
        return;
      }
      const state = data.uf.toUpperCase();
      const options: ShippingOption[] = [];
      if (shippingRates.SEDEX[state]) options.push({ method: "SEDEX", price: shippingRates.SEDEX[state] });
      if (shippingRates.PAC[state]) options.push({ method: "PAC", price: shippingRates.PAC[state] });
      if (shippingRates.TRANSPORTADORA[state]) options.push({ method: "Transportadora", price: shippingRates.TRANSPORTADORA[state] });
      if (options.length === 0) toast.info("Não há opções de entrega para este CEP.");
      setShippingOptions(options);
    } catch (error) {
      toast.error("Não foi possível calcular o frete. Tente novamente.");
    } finally {
      setIsLoadingShipping(false);
    }
  };

  const total = getCartTotal() + (selectedShipping?.price || 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow pb-32 md:pb-6">
        <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Seu carrinho está vazio.</p>
            <Button asChild><Link to="/">Continuar Comprando</Link></Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-card rounded-lg shadow-sm p-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-start gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-contain rounded-md" />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                    <p className="text-sm font-bold mt-1">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Input type="number" value={item.quantity} onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 0)} className="w-16 h-9 text-center" />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-lg shadow-sm p-4 space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Cupom de desconto" />
                <Button variant="secondary">Aplicar</Button>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-4 space-y-4">
              <h2 className="font-semibold flex items-center gap-2"><Truck className="h-5 w-5" /> Calcular Frete</h2>
              <div className="flex gap-2">
                <Input placeholder="Digite seu CEP" value={cep} onChange={handleCepChange} maxLength={9} />
                <Button variant="secondary" onClick={handleSimulateShipping} disabled={isLoadingShipping}>{isLoadingShipping ? "Calculando..." : "Calcular"}</Button>
              </div>
              {shippingOptions.length > 0 && (
                <div className="space-y-2 pt-2">
                  {shippingOptions.map(option => (
                    <div key={option.method} onClick={() => setSelectedShipping(option)} className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${selectedShipping?.method === option.method ? 'border-primary bg-primary/10' : 'border-border'}`}>
                      <div><p className="font-semibold">{option.method}</p></div>
                      <p className="font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(option.price)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-card rounded-lg shadow-sm p-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getCartTotal())}</span></div>
              <div className="flex justify-between"><span>Frete</span><span>{selectedShipping ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedShipping.price) : '--'}</span></div>
              <div className="flex justify-between font-bold text-lg border-t border-border pt-2 mt-2"><span>Total</span><span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span></div>
              <Button onClick={handleConfirmCart} className="w-full mt-2">CONFIRMAR CARRINHO</Button>
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