// frontend/src/hooks/useCart.ts
import React, { ReactNode } from "react";
import type { Product } from "./useProducts";

export interface CartItem {
  id: string;
  product: Product;
  qty: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalRetail: number;
  totalWholesale: number;
}

// Por ahora es solo un “passthrough” sin estado real
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => <>{children}</>;

// Hook stub: exporta todas las funciones, pero sin lógica aún.
// Esto es solo para que el build pase y podamos ver la UI funcionando.
export const useCart = (): CartContextValue => {
  const cart: CartItem[] = [];

  const addToCart = (product: Product) => {
    console.log("addToCart (stub) →", product.name);
    alert(`(stub) Se agregó: ${product.name}`);
  };

  const increment = (id: string) => {
    console.log("increment (stub)", id);
  };

  const decrement = (id: string) => {
    console.log("decrement (stub)", id);
  };

  const removeFromCart = (id: string) => {
    console.log("removeFromCart (stub)", id);
  };

  const clearCart = () => {
    console.log("clearCart (stub)");
  };

  return {
    cart,
    addToCart,
    increment,
    decrement,
    removeFromCart,
    clearCart,
    totalRetail: 0,
    totalWholesale: 0,
  };
};


