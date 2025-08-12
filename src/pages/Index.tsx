import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BrandCard } from "@/components/BrandCard";
import { CategoryCard } from "@/components/CategoryCard";
import { HelpCircle, Truck, BarChart, Award, Lock, CreditCard } from "lucide-react";

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
    { title: "CBD CANABIDIOL", image: "/placeholder.svg" },
    { title: "PRODUTOS EMAGRECEDORES", image: "/placeholder.svg" },
    { title: "PRODUTOS DE FARMÁCIA", image: "/placeholder.svg" },
    { title: "PRODUTOS MANIPULADOS", image: "/placeholder.svg" },
    { title: "PRODUTOS VARIADOS", image: "/placeholder.svg" },
    { title: "SARMS", image: "/placeholder.svg" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="p-4 space-y-6 pb-24 md:pb-6 flex-grow">
        <div className="w-full h-40 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
          <p className="text-gray-500">Banner Promocional</p>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {nossasMarcas.map(brand => <BrandCard key={brand.name} src={brand.logo} alt={brand.name} brandName={brand.name} />)}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-center text-blue-900 mt-6">Marcas Premium</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
            {marcasPremium.map(brand => <BrandCard key={brand.name} src={brand.logo} alt={brand.name} brandName={brand.name} />)}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-center text-blue-900 mt-6">Marcas Nacionais</h2>
          <div className="mt-4 flex justify-center">
            <div className="w-1/2 md:w-1/4 lg:w-1/5">
              <BrandCard src={marcasNacionais[0].logo} alt={marcasNacionais[0].name} brandName={marcasNacionais[0].name} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-center text-blue-900 mt-6">Diversos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            {diversos.map(item => <CategoryCard key={item.title} imageSrc={item.image} title={item.title} />)}
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
      <MobileNav />
      <Footer />
    </div>
  );
};

export default Index;