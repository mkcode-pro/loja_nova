import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BrandCard } from "@/components/BrandCard";
import { CategoryCard } from "@/components/CategoryCard";
import { HelpCircle, Truck, BarChart, Droplet, Scale, Pill, FlaskConical, Package, Shield, Award, Lock, CreditCard } from "lucide-react";

const Index = () => {
  const nossasMarcas = [
    { name: "R-x Pharmaceuticals", logo: "/placeholder.svg" },
    { name: "King Pharma", logo: "/placeholder.svg" },
    { name: "Landerlan", logo: "/placeholder.svg" },
    { name: "Gold Premium Series", logo: "/placeholder.svg" },
    { name: "Muscle", logo: "/placeholder.svg" },
  ];

  const marcasPremium = [
    { name: "Alpha-Pharma", logo: "/placeholder.svg" },
    { name: "Canada Labs", logo: "/placeholder.svg" },
    { name: "Cooper Pharma", logo: "/placeholder.svg" },
    { name: "Eminence Labs", logo: "/placeholder.svg" },
    { name: "Oxygen KW Pharma", logo: "/placeholder.svg" },
    { name: "Pharacom Labs", logo: "/placeholder.svg" },
    { name: "ZPHC", logo: "/placeholder.svg" },
  ];

  const marcasNacionais = [
    { name: "Groth", logo: "/placeholder.svg" },
  ];

  const diversos = [
    { title: "CBD CANABIDIOL", icon: <Droplet size={32} /> },
    { title: "PRODUTOS EMAGRECEDORES", icon: <Scale size={32} /> },
    { title: "PRODUTOS DE FARMÁCIA", subtitle: "Temos qualquer medicamento. Consulte no WhatsApp!", icon: <Pill size={32} /> },
    { title: "PRODUTOS MANIPULADOS", icon: <FlaskConical size={32} /> },
    { title: "PRODUTOS VARIADOS", icon: <Package size={32} /> },
    { title: "SARMS", icon: <Shield size={32} /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <Header />
      <main className="p-4 space-y-6">
        <div>
          <img src="/assets/hero-banner.png" alt="Toda loja em promoção" className="w-full rounded-lg shadow-md" />
        </div>

        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="bg-white w-full justify-center shadow-sm">
                    <HelpCircle className="mr-2 h-4 w-4" /> FAQ
                </Button>
                <Button variant="outline" className="bg-white w-full justify-center shadow-sm">
                    <Truck className="mr-2 h-4 w-4" /> Fretes
                </Button>
            </div>
            <Button variant="outline" className="bg-white w-full justify-center shadow-sm">
                <BarChart className="mr-2 h-4 w-4" /> CICLOS PRONTOS / DICAS
            </Button>
        </div>

        <section>
          <h2 className="text-lg font-bold text-center text-blue-900">MARCAS</h2>
          <p className="text-center text-gray-600 mb-4">Nossas Marcas</p>
          <div className="grid grid-cols-2 gap-4">
            {nossasMarcas.map(brand => <BrandCard key={brand.name} src={brand.logo} alt={brand.name} />)}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-center text-blue-900 mt-6">Marcas Premium</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {marcasPremium.map(brand => <BrandCard key={brand.name} src={brand.logo} alt={brand.name} />)}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-center text-blue-900 mt-6">Marcas Nacionais</h2>
          <div className="mt-4 flex justify-center">
            <div className="w-1/2">
              <BrandCard src={marcasNacionais[0].logo} alt={marcasNacionais[0].name} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-center text-blue-900 mt-6">Diversos</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {diversos.map(item => <CategoryCard key={item.title} icon={item.icon} title={item.title} subtitle={item.subtitle} />)}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-center text-blue-900 mt-6">Garantias & Proteções</h2>
          <div className="flex justify-center items-center gap-6 mt-4">
            <Award size={32} className="text-gray-500" />
            <Lock size={32} className="text-gray-500" />
            <CreditCard size={32} className="text-gray-500" />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Index;