// frontend/src/hooks/useCart.ts
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import type { Product } from "./useProducts";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  setQty: (productId: string, qty: number) => void;
  totalItems: number;
  subtotalRetail: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clear = () => setItems([]);

  const setQty = (productId: string, qty: number) => {
    const safeQty = Number.isFinite(qty) ? Math.max(0, Math.round(qty)) : 1;

    setItems((prev) => {
      if (safeQty <= 0) {
        // Si la cantidad es 0 o menos, sacamos el ítem
        return prev.filter((i) => i.product.id !== productId);
      }
      return prev.map((i) =>
        i.product.id === productId ? { ...i, qty: safeQty } : i
      );
    });
  };

  const { totalItems, subtotalRetail } = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        acc.totalItems += item.qty;
        acc.subtotalRetail += item.product.priceRetail * item.qty;
        return acc;
      },
      { totalItems: 0, subtotalRetail: 0 }
    );
    return totals;
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    clear,
    setQty,
    totalItems,
    subtotalRetail,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return ctx;
};







