import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="hidden md:block bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Categorias</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">Marcas</Link></li>
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">Emagrecedores</Link></li>
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">SARMs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Suporte</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">Fretes</Link></li>
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Empresa</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">Sobre Nós</Link></li>
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">Ciclos Prontos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">Política de Privacidade</Link></li>
              <li><Link to="#" className="text-base text-gray-300 hover:text-white">Termos de Serviço</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; 2024 Sua Loja. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};