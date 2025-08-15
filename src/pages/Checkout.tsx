import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { shippingRates } from "@/data/shippingRates";
import { cn } from "@/lib/utils";

interface ShippingOption {
  method: string;
  price: number;
}

const CheckoutPage = () => {
  const { isLoggedIn, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
    if (profile) {
      setName(profile.full_name || "");
      setCpf(profile.cpf || "");
      setWhatsapp(profile.whatsapp || "");
    }
  }, [profile, isLoggedIn, isLoading, navigate]);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    let formattedCep = rawValue;
    if (rawValue.length > 5) {
      formattedCep = rawValue.slice(0, 5) + "-" + rawValue.slice(5, 8);
    }
    setCep(formattedCep);
    setShippingOptions([]);
    setSelectedShipping(null);

    if (rawValue.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${rawValue}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress(data.logradouro);
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setState(data.uf);
          
          const stateAbbr = data.uf.toUpperCase();
          const options: ShippingOption[] = [];
          if (shippingRates.SEDEX[stateAbbr]) options.push({ method: "SEDEX", price: shippingRates.SEDEX[stateAbbr] });
          if (shippingRates.PAC[stateAbbr]) options.push({ method: "PAC", price: shippingRates.PAC[stateAbbr] });
          if (shippingRates.TRANSPORTADORA[stateAbbr]) options.push({ method: "Transportadora", price: shippingRates.TRANSPORTADORA[stateAbbr] });
          setShippingOptions(options);

        } else {
          toast.error("CEP não encontrado.");
        }
      } catch (error) {
        toast.error("Não foi possível buscar o CEP.");
      }
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow pb-32 md:pb-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <form className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Informações de Entrega</h2>
              {/* Campos de dados pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">Nome Completo</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="cpf">CPF</Label><Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="whatsapp">WhatsApp</Label><Input id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} /></div>
              {/* Campos de endereço */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-2"><Label htmlFor="cep">CEP</Label><Input id="cep" value={cep} onChange={handleCepChange} maxLength={9} /></div>
                <div className="md:col-span-2 space-y-2"><Label htmlFor="address">Endereço</Label><Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2"><Label htmlFor="number">Número</Label><Input id="number" /></div>
                <div className="space-y-2"><Label htmlFor="complement">Complemento (Opcional)</Label><Input id="complement" /></div>
                <div className="space-y-2"><Label htmlFor="neighborhood">Bairro</Label><Input id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="city">Cidade</Label><Input id="city" value={city} disabled /></div>
                <div className="space-y-2"><Label htmlFor="state">Estado</Label><Input id="state" value={state} disabled /></div>
              </div>
            </div>

            {shippingOptions.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Método de Envio</h2>
                <div className="space-y-2">
                  {shippingOptions.map(option => (
                    <div 
                      key={option.method} 
                      onClick={() => setSelectedShipping(option)} 
                      className={cn(
                        "flex justify-between items-center p-3 rounded-md cursor-pointer border",
                        selectedShipping?.method === option.method ? 'border-primary bg-primary/10' : 'border-border'
                      )}
                    >
                      <p className="font-semibold">{option.method}</p>
                      <p className="font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(option.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button className="w-full mt-4" disabled={!selectedShipping}>
              Ir para o Pagamento
            </Button>
          </form>
        </div>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default CheckoutPage;