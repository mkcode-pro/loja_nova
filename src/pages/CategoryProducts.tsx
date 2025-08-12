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

// Dados de exemplo atualizados
const productsByCategory: { [key: string]: { subcategories: { name: string; products: any[] }[] } } = {
  "CBD CANABIDIOL": { subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [ { name: "Óleo CBD 10%", description: "30ml", price: "R$ 299,90", image: "/placeholder.svg" }, { name: "Cápsulas CBD", description: "30 cápsulas", price: "R$ 349,90", image: "/placeholder.svg" } ] }] },
  "PRODUTOS EMAGRECEDORES": { subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Emagrecedor Lipo-6", description: "60 cápsulas", price: "R$ 189,90", image: "/placeholder.svg" }] }] },
  "PRODUTOS DE FARMÁCIA": { subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [ { name: "Analgésico Forte", description: "20 comprimidos", price: "R$ 29,90", image: "/placeholder.svg" }, { name: "Vitamina C", description: "60 comprimidos", price: "R$ 49,90", image: "/placeholder.svg" } ] }] },
  "PRODUTOS MANIPULADOS": { subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Fórmula da Energia", description: "60 doses", price: "R$ 150,00", image: "/placeholder.svg" }] }] },
  "PRODUTOS VARIADOS": { subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Shaker", description: "600ml", price: "R$ 35,00", image: "/placeholder.svg" }] }] },
  "SARMS": { subcategories: [{ name: "Produtos Injetáveis", products: [] }, { name: "Produtos Orais", products: [{ name: "Ostarine MK-2866", description: "60 cápsulas", price: "R$ 250,00", image: "/placeholder.svg" }] }] },
};

const CategoryProducts = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : "Categoria";
  const categoryData = productsByCategory[decodedCategoryName.toUpperCase()];
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const handleAccordionClick = (id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200); // Pequeno atraso para a animação do acordeão começar
  };

  if (!categoryData) {
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
            <h1 className="text-xl font-bold ml-2 truncate">{decodedCategoryName}</h1>
          </div>
          <p className="text-center text-gray-600 mt-8">Categoria não encontrada ou sem produtos.</p>
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

        <h1 className="text-2xl font-bold text-center">{decodedCategoryName}</h1>

        <Input placeholder={`Buscar produtos em ${decodedCategoryName}...`} />

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
          {categoryData.subcategories.map((subcategory, index) => (
            <AccordionItem key={subcategory.name} value={subcategory.name} id={`category-accordion-${index}`} className="bg-white border-none rounded-lg shadow-sm overflow-hidden">
              <AccordionTrigger onClick={() => handleAccordionClick(`category-accordion-${index}`)} className="bg-blue-800 text-white hover:no-underline px-4 py-3 rounded-t-lg">
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

export default CategoryProducts;