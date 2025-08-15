import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BrandProducts from "./pages/BrandProducts";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CheckoutPage from "./pages/Checkout";
import ProfilePage from "./pages/Profile";
import OrderSummaryPage from "./pages/OrderSummary";
import PaymentPage from "./pages/Payment";
import OrderConfirmationPage from "./pages/OrderConfirmation";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/marcas/:brandName" element={<BrandProducts />} />
                <Route path="/diversos/:categoryName" element={<CategoryProducts />} />
                <Route path="/produto/:productId" element={<ProductDetail />} />
                <Route path="/carrinho" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/resumo" element={<OrderSummaryPage />} />
                <Route path="/pagamento" element={<PaymentPage />} />
                <Route path="/confirmacao-pedido" element={<OrderConfirmationPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;