import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { AddedToCartModal } from "@/components/AddedToCartModal";
import { ArrowLeft, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useCart, Product, CartItem } from "@/context/CartContext";

const productsByBrand: { [key: string]: { logo: string; subcategories: { name: string; products: Product[] }[] } } = {
  "R-x Pharmaceuticals": { logo: "/placeholder.svg", subcategories: [{ name: "Produtos Injetáveis", products: [{ id: "rx1", name: "Produto Rx 1", description: "desc", price: 199.90, image: "/placeholder.svg" }] }, { name: "Produtos Orais", products: [] }] },
  "Landerlan": {
    logo: "/placeholder.svg",
    subcategories: [
      {
        name: "Produtos Injetáveis",
        products: [
          { id: "decaland", name: "Decaland 5ml", description: "5ml - 200mg/ml", price: 84.90, image: "/placeholder.svg", discount: "15%" },
          { id: "duraland", name: "Duraland 1ml", description: "1ml - 250mg/ml", price: 22.50, image: "/placeholder.svg", discount: "10%" },
        ]
      },
      { 
        name: "Produtos Orais", 
        products: [
          { id: "oxandroland", name: "Oxandroland", description: "100 comp - 10mg", price: 180.00, image: "/placeholder.svg" },
        ] 
      }
    ]
  },
  // Outras marcas...
};

const BrandProducts = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const decodedBrandName = brandName ? decodeURIComponent(brandName) : "Marca";
  const brandData = productsByBrand[decodedBrandName];
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { addToCart, getCartTotal } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState<CartItem | null>(null);

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    setAddedProduct({ ...product, quantity });
    setIsModalOpen(true);
  };

  const handleAccordionClick = (id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  if (!brandData) {
    // ... (código de marca não encontrada)
    return <div>Marca não encontrada</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="p-4 space-y-4 pb-24 md:pb-6 flex-grow">
        {/* ... (código do cabeçalho da página) */}
        <div className="border rounded-lg p-4 flex items-center justify-center h-24 bg-white shadow-sm">
          <img src={brandData.logo} alt={decodedBrandName} className="max-h-full max-w-full object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-center">{decodedBrandName}</h1>
        <Input placeholder={`Buscar produtos em ${decodedBrandName}...`} />
        <div className="flex items-center justify-center bg-gray-200 p-1 rounded-lg">
          <Button onClick={() => setView('grid')} className={cn("w-full", view === 'grid' ? 'bg-white text-blue-700 shadow' : 'bg-transparent text-gray-600 shadow-none')}><LayoutGrid className="mr-2 h-4 w-4" /> Grid</Button>
          <Button onClick={() => setView('list')} className={cn("w-full", view === 'list' ? 'bg-white text-blue-700 shadow' : 'bg-transparent text-gray-600 shadow-none')}><List className="mr-2 h-4 w-4" /> Lista</Button>
        </div>
        <Accordion type="multiple" className="w-full space-y-2">
          {brandData.subcategories.map((subcategory, index) => (
            <AccordionItem key={subcategory.name} value={subcategory.name} id={`brand-accordion-${index}`} className="bg-white border-none rounded-lg shadow-sm overflow-hidden">
              <AccordionTrigger onClick={() => handleAccordionClick(`brand-accordion-${index}`)} className="bg-blue-800 text-white hover:no-underline px-4 py-3 rounded-t-lg">{subcategory.name}</AccordionTrigger>
              <AccordionContent className="p-4">
                {subcategory.products.length > 0 ? (
                  <div className={cn("gap-4", view === 'grid' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "flex flex-col")}>
                    {subcategory.products.map((product) => (
                      <ProductCard key={product.id} product={product} view={view} onAddToCart={handleAddToCart} discount={(product as any).discount} />
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
      <MobileNav />
      <Footer />
      <AddedToCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={addedProduct} cartSubtotal={getCartTotal()} />
    </div>
  );
};

export default BrandProducts;