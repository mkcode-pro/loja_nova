import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    // Limpa o carrinho ao chegar nesta página
    clearCart();
    // Impede o usuário de voltar para a página de pagamento
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, [clearCart]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Ocorreu um erro</h1>
        <p className="text-muted-foreground mb-6">Não foi possível carregar os detalhes do seu pedido.</p>
        <Button asChild>
          <Link to="/">Voltar para a Página Inicial</Link>
        </Button>
      </div>
    );
  }

  const handleOpenWhatsApp = () => {
    const message = `
=== PEDIDO M#${orderDetails.id} ===
Data/Hora: ${new Date(orderDetails.created_at).toLocaleString('pt-BR')}

=== DADOS DO CLIENTE ===
Nome: ${orderDetails.shipping_address.name}
CPF: ${orderDetails.shipping_address.cpf}
Telefone: ${orderDetails.shipping_address.whatsapp}
E-mail: ${orderDetails.user_email}
Endereço: ${orderDetails.shipping_address.address}, Nº ${orderDetails.shipping_address.number}
Complemento: ${orderDetails.shipping_address.complement || 'N/A'}
Bairro: ${orderDetails.shipping_address.neighborhood}
Cidade/Estado: ${orderDetails.shipping_address.city}/${orderDetails.shipping_address.state}
CEP: ${orderDetails.shipping_address.cep}

=== ITENS DO PEDIDO ===
${orderDetails.order_items.map(item => `${item.quantity}x ${item.product_name} ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}`).join('\n')}

=== RESUMO FINANCEIRO ===
Subtotal Itens: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orderDetails.subtotal)}
Frete: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orderDetails.shipping_cost)}
Seguro: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orderDetails.insurance_cost)}
Total Final: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(orderDetails.total)}

FormaDePagamento: PIX
Tipo de Frete: ${orderDetails.shipping_method}
    `.trim();
    
    const whatsappUrl = `https://wa.me/SEUNUMERO?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Pedido Realizado com Sucesso!</h1>
      <p className="text-muted-foreground mb-6">Obrigado pela sua compra. Seu pedido <span className="font-bold text-primary">#{orderDetails.id}</span> foi recebido.</p>
      
      <div className="space-y-4 w-full max-w-md">
        <Button onClick={handleOpenWhatsApp} className="w-full">
          Enviar Pedido no WhatsApp
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to="/">Voltar para a Página Inicial</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;