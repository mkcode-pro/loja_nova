import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }
    
    // Simula um cadastro bem-sucedido e redireciona para o checkout
    navigate("/checkout");
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (!match) return value;
    return [match[1], match[2], match[3]].filter(Boolean).join(".") + (match[4] ? `-${match[4]}` : "");
  };

  const formatWhatsApp = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return value;
    return (match[1] ? `(${match[1]}` : "") + (match[2] ? `) ${match[2]}` : "") + (match[3] ? `-${match[3]}` : "");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Criar Conta</h1>
            <p className="text-muted-foreground">É rápido e fácil!</p>
          </div>
          <form onSubmit={handleRegister} className="bg-card p-8 rounded-lg shadow-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" name="name" type="text" placeholder="Seu nome" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" required onChange={(e) => e.target.value = formatCPF(e.target.value)} maxLength={14} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input id="whatsapp" name="whatsapp" type="tel" placeholder="(00) 00000-0000" required onChange={(e) => e.target.value = formatWhatsApp(e.target.value)} maxLength={15} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type={showPassword ? "text" : "password"} required />
              <Button type="button" variant="ghost" size="icon" className="absolute right-1 bottom-1 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required />
              <Button type="button" variant="ghost" size="icon" className="absolute right-1 bottom-1 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button type="submit" className="w-full">
              Criar Conta
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Faça Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default RegisterPage;