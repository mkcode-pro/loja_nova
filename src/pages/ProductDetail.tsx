import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { MobileNav } from '@/components/MobileNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddedToCartModal } from '@/components/AddedToCartModal';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart, Product, CartItem } from '@/context/CartContext';
import { findProductById, ALL_PRODUCTS } from '@/data/products';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = findProductById(productId);

  const { addToCart, getCartTotal } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState<CartItem | null>(null);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedProduct({ ...product, quantity });
    setIsModalOpen(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="p-4 flex-grow text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </main>
        <MobileNav />
        <Footer />
      </div>
    );
  }

  const relatedProducts = ALL_PRODUCTS.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 space-y-6 pb-32 md:pb-6 flex-grow">
        <Button onClick={() => navigate(-1)} variant="outline" className="bg-card shadow-sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags?.map(tag => (
              <Badge key={tag} variant={tag.includes('OFF') ? 'destructive' : 'default'}>
                {tag}
              </Badge>
            ))}
          </div>
          <img src={product.image} alt={product.name} className="w-full h-64 object-contain mb-4" />
          
          <p className="text-sm text-primary font-semibold">{product.brand}</p>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.description}</p>

          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-2xl font-bold text-primary">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.originalPrice)}</p>
            )}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center border-0 focus-visible:ring-0" />
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} className="w-full">
              <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao carrinho
            </Button>
          </div>
        </div>

        <Tabs defaultValue="description" className="bg-card p-4 rounded-lg shadow-sm">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4 prose-sm max-w-none prose-invert" dangerouslySetInnerHTML={{ __html: product.details?.description || '' }} />
          <TabsContent value="specifications" className="pt-4">{product.details?.specifications}</TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4">Produtos relacionados</h2>
            <div className="grid grid-cols-2 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} view="grid" onAddToCart={(prod, quant) => {
                  addToCart(prod, quant);
                  setAddedProduct({ ...prod, quantity: quant });
                  setIsModalOpen(true);
                }} />
              ))}
            </div>
          </section>
        )}

      </main>
      <MobileNav />
      <Footer />
      <AddedToCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={addedProduct} cartSubtotal={getCartTotal()} />
    </div>
  );
};

export default ProductDetail;