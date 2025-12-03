// frontend/src/hooks/useCart.ts
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import type { Product } from "./useProducts";

export interface CartItem {
  id: string;          // id del producto
  product: Product;    // producto completo
  qty: number;         // cantidad
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

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, product, qty: 1 }];
    });
  };

  const increment = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrement = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const { totalRetail, totalWholesale } = useMemo(() => {
    let retail = 0;
    let wholesale = 0;
    for (const item of cart) {
      retail += item.product.priceRetail * item.qty;
      wholesale += item.product.priceWholesale * item.qty;
    }
    return { totalRetail: retail, totalWholesale: wholesale };
  }, [cart]);

  const value: CartContextValue = {
    cart,
    addToCart,
    increment,
    decrement,
    removeFromCart,
    clearCart,
    totalRetail,
    totalWholesale,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return ctx;
};
