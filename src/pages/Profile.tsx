import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow pb-32 md:pb-6">
        <h1 className="text-2xl font-bold mb-4">Minha Conta</h1>
        <div className="bg-card p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
          <p className="text-muted-foreground">Você ainda não tem pedidos.</p>
          
          <h2 className="text-lg font-semibold mt-6">Meus Pontos</h2>
          <p className="text-muted-foreground">Sistema de pontos em breve!</p>

          <Button onClick={handleLogout} variant="destructive" className="w-full mt-6">
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