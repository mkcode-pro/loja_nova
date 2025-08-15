import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card mt-auto border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-foreground">IMPERIO</span>
              <span className="text-primary">PHARMA</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">Sua fonte confiável para performance e bem-estar.</p>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link to="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link to="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-primary">Categorias</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-base text-muted-foreground hover:text-foreground">Marcas</Link></li>
              <li><Link to="#" className="text-base text-muted-foreground hover:text-foreground">Emagrecedores</Link></li>
              <li><Link to="#" className="text-base text-muted-foreground hover:text-foreground">SARMs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-primary">Suporte</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-base text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link to="#" className="text-base text-muted-foreground hover:text-foreground">Fretes</Link></li>
              <li><Link to="#" className="text-base text-muted-foreground hover:text-foreground">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-primary">Empresa</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-base text-muted-foreground hover:text-foreground">Sobre Nós</Link></li>
              <li><Link to="#" className="text-base text-muted-foreground hover:text-foreground">Ciclos Prontos</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-base text-muted-foreground">&copy; 2024 Imperio Pharma. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};