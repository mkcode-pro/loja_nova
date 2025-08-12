import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Dados de exemplo atualizados para incluir subcategorias e mais detalhes
const productsByBrand: { [key: string]: { logo: string; subcategories: { name: string; products: any[] }[] } } = {
  "R-x Pharmaceuticals": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [{ name: "Produto Rx 1", description: "desc", price: "R$ 199,90", image: "/placeholder.svg" }] }, { name: "Produtos Orais", products: [] }] },
  "King Pharma": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto King 1", description: "desc", price: "R$ 189,90", image: "/placeholder.svg" }] }] },
  "Landerlan": {
    logo: "/placeholder.svg",
    subcategories: [
      {
        name: "Produtos Injetáveis",
        products: [
          { name: "Decaland 5ml", description: "5ml - 200mg/ml", price: "R$ 84,90", image: "/placeholder.svg", discount: "15%" },
          { name: "Duraland 1ml", description: "1ml - 250mg/ml", price: "R$ 22,50", image: "/placeholder.svg", discount: "10%" },
          { name: "GH LANDERTROPIN", description: "10UI - 4mg/1.5ml", price: "R$ 2.199,00", image: "/placeholder.svg" },
          { name: "Primobolan Inject.", description: "10ml - 100mg/ml", price: "R$ 369,90", image: "/placeholder.svg", discount: "5%" },
        ]
      },
      { name: "Produtos Orais", products: [] }
    ]
  },
  "Gold Premium Series": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Gold 1", description: "desc", price: "R$ 299,90", image: "/placeholder.svg" }] }] },
  "Muscle": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Muscle 1", description: "desc", price: "R$ 159,90", image: "/placeholder.svg" }] }] },
  "Alpha-Pharma": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Alpha 1", description: "desc", price: "R$ 399,90", image: "/placeholder.svg" }] }] },
  "Canada Labs": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Canada 1", description: "desc", price: "R$ 349,90", image: "/placeholder.svg" }] }] },
  "Cooper Pharma": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Cooper 1", description: "desc", price: "R$ 319,90", image: "/placeholder.svg" }] }] },
  "Eminence Labs": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Eminence 1", description: "desc", price: "R$ 359,90", image: "/placeholder.svg" }] }] },
  "Oxygen KW Pharma": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Oxygen 1", description: "desc", price: "R$ 329,90", image: "/placeholder.svg" }] }] },
  "Pharacom Labs": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Pharacom 1", description: "desc", price: "R$ 379,90", image: "/placeholder.svg" }] }] },
  "ZPHC": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto ZPHC 1", description: "desc", price: "R$ 419,90", image: "/placeholder.svg" }] }] },
  "Groth": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Produto Groth 1", description: "desc", price: "R$ 129,90", image: "/placeholder.svg" }] }] },
};

const BrandProducts = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const decodedBrandName = brandName ? decodeURIComponent(brandName) : "Marca";
  const brandData = productsByBrand[decodedBrandName];
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const handleAccordionClick = (id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200); // Pequeno atraso para a animação do acordeão começar
  };

  if (!brandData) {
    return (
      <div className="bg-gray-50 min-h-screen pb-24 md:pb-0">
        <Header />
        <main className="p-4">
          <div className="flex items-center mb-4">
            <Button asChild variant="ghost" size="icon" className="shrink-0">
              <Link to="/">
                <ArrowLeft />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
            <h1 className="text-xl font-bold ml-2 truncate">{decodedBrandName}</h1>
          </div>
          <p className="text-center text-gray-600 mt-8">Marca não encontrada ou sem produtos.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-0">
      <Header />
      <main className="p-4 space-y-4">
        <div className="flex items-center mb-4">
          <Button asChild variant="ghost" size="icon" className="shrink-0 -ml-2">
            <Link to="/">
              <ArrowLeft />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
        </div>

        <div className="border rounded-lg p-4 flex items-center justify-center h-24 bg-white shadow-sm">
          <img src={brandData.logo} alt={decodedBrandName} className="max-h-full max-w-full object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-center">{decodedBrandName}</h1>

        <Input placeholder={`Buscar produtos em ${decodedBrandName}...`} />

        <div className="flex items-center justify-center bg-gray-200 p-1 rounded-lg">
          <Button 
            onClick={() => setView('grid')} 
            className={cn("w-full", view === 'grid' ? 'bg-white text-blue-700 shadow' : 'bg-transparent text-gray-600 shadow-none')}
          >
            <LayoutGrid className="mr-2 h-4 w-4" /> Grid
          </Button>
          <Button 
            onClick={() => setView('list')} 
            className={cn("w-full", view === 'list' ? 'bg-white text-blue-700 shadow' : 'bg-transparent text-gray-600 shadow-none')}
          >
            <List className="mr-2 h-4 w-4" /> Lista
          </Button>
        </div>

        <Accordion type="multiple" className="w-full space-y-2" defaultValue={["Produtos Injetáveis", "Produtos Orais"]}>
          {brandData.subcategories.map((subcategory, index) => (
            <AccordionItem key={subcategory.name} value={subcategory.name} id={`brand-accordion-${index}`} className="bg-white border-none rounded-lg shadow-sm overflow-hidden">
              <AccordionTrigger onClick={() => handleAccordionClick(`brand-accordion-${index}`)} className="bg-blue-800 text-white hover:no-underline px-4 py-3 rounded-t-lg">
                {subcategory.name}
              </AccordionTrigger>
              <AccordionContent className="p-4">
                {subcategory.products.length > 0 ? (
                  <div className={cn(
                    "gap-4",
                    view === 'grid' ? "grid grid-cols-2" : "flex flex-col"
                  )}>
                    {subcategory.products.map((product) => (
                      <ProductCard
                        key={product.name}
                        view={view}
                        {...product}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">Nenhum produto nesta categoria.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  );
};

export default BrandProducts;