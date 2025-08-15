import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PaymentPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-grow pb-32 md:pb-6 space-y-4">
        <h1 className="text-2xl font-bold">Pagamento</h1>
        <div className="bg-card p-8 rounded-lg shadow-sm text-center">
          <p className="text-muted-foreground">Aguardando instruções para a finalização do pagamento.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/resumo">Voltar ao Resumo</Link>
          </Button>
        </div>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default PaymentPage;