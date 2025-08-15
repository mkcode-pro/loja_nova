import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShippingAddress {
  name: string;
  cpf: string;
  whatsapp: string;
  cep: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface ShippingMethod {
  method: string;
  price: number;
}

interface OrderContextType {
  shippingAddress: ShippingAddress | null;
  shippingMethod: ShippingMethod | null;
  setOrderDetails: (details: { address: ShippingAddress; method: ShippingMethod }) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);

  const setOrderDetails = (details: { address: ShippingAddress; method: ShippingMethod }) => {
    setShippingAddress(details.address);
    setShippingMethod(details.method);
  };

  return (
    <OrderContext.Provider value={{ shippingAddress, shippingMethod, setOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};