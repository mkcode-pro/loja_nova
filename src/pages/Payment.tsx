import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Copy, Upload } from "lucide-react";

const PIX_KEY = "1edb4560-6682-4ed9-88ec-6df3d1c733e2";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getCartTotal } = useCart();
  const { shippingAddress, shippingMethod } = useOrder();
  
  const [showPix, setShowPix] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const finalizeButtonRef = useRef<HTMLButtonElement>(null);

  const subtotal = getCartTotal();
  // Supondo que a decisão do seguro foi passada de alguma forma, ou recalculamos aqui.
  // Para simplificar, vamos assumir que o seguro não foi adicionado nesta etapa.
  const total = subtotal + (shippingMethod?.price || 0);

  useEffect(() => {
    if (receipt && finalizeButtonRef.current) {
      finalizeButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      finalizeButtonRef.current.classList.add('animate-pulse');
      setTimeout(() => {
        finalizeButtonRef.current?.classList.remove('animate-pulse');
      }, 2000);
    }
  }, [receipt]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    toast.success("Chave PIX copiada para a área de transferência!");
  };

  const handleFinalizeOrder = async () => {
    if (!receipt || !user || !shippingAddress || !shippingMethod) {
      toast.error("Informações do pedido incompletas ou comprovante faltando.");
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. Upload do comprovante
      const filePath = `${user.id}/${Date.now()}_${receipt.name}`;
      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(filePath, receipt);

      if (uploadError) throw uploadError;

      // 2. Salvar o pedido no banco de dados
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          user_email: user.email,
          total: total,
          shipping_cost: shippingMethod.price,
          shipping_method: shippingMethod.method,
          shipping_address: shippingAddress,
          receipt_url: filePath,
          subtotal: subtotal,
          insurance_cost: 0, // Adicionar lógica do seguro aqui depois
        })
        .select()
        .single();
      
      if (orderError) throw orderError;

      // 3. Salvar os itens do pedido
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;
      
      // 4. Navegar para a confirmação
      navigate('/confirmacao-pedido', { state: { orderDetails: { ...orderData, order_items: orderItems } } });

    } catch (error: any) {
      toast.error(`Erro ao finalizar o pedido: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow pb-32 md:pb-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Pagamento</h1>
        <p className="text-3xl font-bold text-center text-primary">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</p>
        
        <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Pagamento via PIX</h2>
          <div className="flex items-center justify-center gap-2">
            <img src="/placeholder.svg" alt="PIX Logo" className="h-6 w-6" />
            <span>PIX</span>
          </div>
          <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
            <li>Clique em Ver Chave Pix para revelá-la.</li>
            <li>Efetue o pagamento e guarde seu comprovante.</li>
            <li>Anexe o comprovante e clique em Finalizar Pedido.</li>
          </ol>

          {!showPix ? (
            <Button className="w-full" onClick={() => setShowPix(true)}>Ver Chave Pix</Button>
          ) : (
            <div className="border p-4 rounded-md space-y-3">
              <p className="text-sm"><strong>Chave ALEATORIA:</strong></p>
              <div className="relative">
                <Input value={PIX_KEY} readOnly className="pr-12" />
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleCopyPix}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm"><strong>Nome:</strong> Marcos A. Pereira.</p>
              <p className="text-sm"><strong>Banco:</strong> BMG</p>
              <Button className="w-full" variant="secondary" onClick={() => setShowPix(false)}>Ocultar</Button>
            </div>
          )}
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Anexar Comprovante</h2>
          <p className="text-sm text-muted-foreground">Após pagar, anexe o comprovante e clique em Finalizar Pedido.</p>
          <div className="relative">
            <Input id="receipt" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setReceipt(e.target.files ? e.target.files[0] : null)} />
            <Label htmlFor="receipt" className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">{receipt ? receipt.name : "Clique para selecionar o arquivo"}</p>
              </div>
            </Label>
          </div>
        </div>

        <Button ref={finalizeButtonRef} className="w-full" onClick={handleFinalizeOrder} disabled={!receipt || isSubmitting}>
          {isSubmitting ? "Finalizando Pedido..." : "FINALIZAR PEDIDO"}
        </Button>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default PaymentPage;