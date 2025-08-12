import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dados de exemplo para os produtos por categoria
const productsByCategory: { [key: string]: { name: string; price: string; image: string }[] } = {
  "CBD CANABIDIOL": [
    { name: "Óleo CBD 10%", price: "R$ 299,90", image: "/placeholder.svg" },
    { name: "Cápsulas CBD", price: "R$ 349,90", image: "/placeholder.svg" },
  ],
  "PRODUTOS EMAGRECEDORES": [
    { name: "Emagrecedor Lipo-6", price: "R$ 189,90", image: "/placeholder.svg" },
  ],
  "PRODUTOS DE FARMÁCIA": [
    { name: "Analgésico Forte", price: "R$ 29,90", image: "/placeholder.svg" },
    { name: "Vitamina C", price: "R$ 49,90", image: "/placeholder.svg" },
  ],
  "PRODUTOS MANIPULADOS": [
    { name: "Fórmula da Energia", price: "R$ 150,00", image: "/placeholder.svg" },
  ],
  "PRODUTOS VARIADOS": [
    { name: "Shaker", price: "R$ 35,00", image: "/placeholder.svg" },
  ],
  "SARMS": [
    { name: "Ostarine MK-2866", price: "R$ 250,00", image: "/placeholder.svg" },
  ],
};

const CategoryProducts = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : "Categoria";
  const products = productsByCategory[decodedCategoryName.toUpperCase()] || [];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
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
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">Nenhum produto encontrado para esta categoria.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryProducts;