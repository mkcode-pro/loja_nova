import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="h-0.5 bg-gradient-to-r from-red-500 to-blue-600" />
      <div className="flex items-center gap-2 p-2">
        <Input placeholder="Pesquisar..." className="flex-grow" />
        <Button className="bg-blue-700 hover:bg-blue-800 shrink-0">
          <User className="mr-2 h-4 w-4" /> Entrar
        </Button>
      </div>
    </header>
  );
};