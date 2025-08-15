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

    if (rawValue.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${rawValue}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress(data.logradouro);
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setState(data.uf);
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
          <form className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Informações de Entrega</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(00) 00000-0000" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="00000-000" value={cep} onChange={handleCepChange} maxLength={9} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Sua rua, avenida, etc." value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento (Opcional)</Label>
                <Input id="complement" placeholder="Apto, bloco, casa" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" value={city} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" value={state} disabled />
              </div>
            </div>

            <Button className="w-full mt-4">
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