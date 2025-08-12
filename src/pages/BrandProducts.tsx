import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dados de exemplo para os produtos por marca
const productsByBrand: { [key: string]: { name: string; price: string; image: string }[] } = {
  "R-x Pharmaceuticals": [
    { name: "Produto Rx 1", price: "R$ 199,90", image: "/placeholder.svg" },
    { name: "Produto Rx 2", price: "R$ 249,90", image: "/placeholder.svg" },
  ],
  "King Pharma": [
    { name: "Produto King 1", price: "R$ 189,90", image: "/placeholder.svg" },
  ],
  "Landerlan": [
    { name: "Produto Landerlan 1", price: "R$ 219,90", image: "/placeholder.svg" },
    { name: "Produto Landerlan 2", price: "R$ 259,90", image: "/placeholder.svg" },
  ],
  "Gold Premium Series": [
    { name: "Produto Gold 1", price: "R$ 299,90", image: "/placeholder.svg" },
  ],
  "Muscle": [
    { name: "Produto Muscle 1", price: "R$ 159,90", image: "/placeholder.svg" },
  ],
  "Alpha-Pharma": [
    { name: "Produto Alpha 1", price: "R$ 399,90", image: "/placeholder.svg" },
  ],
  "Canada Labs": [
    { name: "Produto Canada 1", price: "R$ 349,90", image: "/placeholder.svg" },
  ],
  "Cooper Pharma": [
    { name: "Produto Cooper 1", price: "R$ 319,90", image: "/placeholder.svg" },
  ],
  "Eminence Labs": [
    { name: "Produto Eminence 1", price: "R$ 359,90", image: "/placeholder.svg" },
  ],
  "Oxygen KW Pharma": [
    { name: "Produto Oxygen 1", price: "R$ 329,90", image: "/placeholder.svg" },
  ],
  "Pharacom Labs": [
    { name: "Produto Pharacom 1", price: "R$ 379,90", image: "/placeholder.svg" },
  ],
  "ZPHC": [
    { name: "Produto ZPHC 1", price: "R$ 419,90", image: "/placeholder.svg" },
  ],
  "Groth": [
    { name: "Produto Groth 1", price: "R$ 129,90", image: "/placeholder.svg" },
  ],
};


const BrandProducts = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const decodedBrandName = brandName ? decodeURIComponent(brandName) : "Marca";
  const products = productsByBrand[decodedBrandName] || [];

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
          <p className="text-center text-gray-600 mt-8">Nenhum produto encontrado para esta marca.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BrandProducts;