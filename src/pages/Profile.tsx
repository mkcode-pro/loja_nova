import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const ProfilePage = () => {
  const { user, profile, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
    if (profile) {
      setFullName(profile.full_name || "");
      setCpf(profile.cpf || "");
      setWhatsapp(profile.whatsapp || "");
    }
  }, [user, profile, isLoading, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, cpf, whatsapp })
      .eq('id', user?.id);
    
    if (error) {
      toast.error("Erro ao atualizar o perfil: " + error.message);
    } else {
      toast.success("Perfil atualizado com sucesso!");
    }
    setLoadingUpdate(false);
  };

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/");
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow pb-32 md:pb-6">
        <h1 className="text-2xl font-bold mb-4">Minha Conta</h1>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">Meus Dados</h2>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={loadingUpdate}>
                {loadingUpdate ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-lg font-semibold">Meus Pedidos</h2>
            <p className="text-muted-foreground">Você ainda não tem pedidos.</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-lg font-semibold">Meus Pontos</h2>
            <p className="text-muted-foreground">Sistema de pontos em breve!</p>
          </div>

          <Button onClick={handleLogout} variant="destructive" className="w-full">
            Sair
          </Button>
        </div>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default ProfilePage;