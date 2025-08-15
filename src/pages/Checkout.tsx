import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { isLoggedIn, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      // Se não estiver logado e o carregamento inicial terminou, redireciona para o login
      navigate('/login');
    }
    if (profile) {
      setName(profile.full_name || "");
      setCpf(profile.cpf || "");
      setWhatsapp(profile.whatsapp || "");
    }
  }, [profile, isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return <div>Carregando...</div>; // Ou um componente de spinner
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
                <Input id="cep" placeholder="00000-000" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Sua rua, avenida, etc." />
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
                <Input id="neighborhood" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" />
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