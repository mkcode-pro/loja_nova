import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula um cadastro bem-sucedido e redireciona para o checkout
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Criar Conta</h1>
          <p className="text-gray-500">É rápido e fácil!</p>
        </div>
        <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" type="text" placeholder="Seu nome" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
            Criar Conta
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-semibold text-blue-700 hover:underline">
              Faça Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;