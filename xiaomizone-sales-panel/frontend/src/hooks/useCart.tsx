import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

export interface Product {
  id: string;
  title: string;
  sku?: string | null;
  priceRetail: number;
}

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

const CartContext = createContext<CartContextValue | null>(null);

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
        return prev.filter((i) => i.product.id !== productId);
      }
      return prev.map((i) =>
        i.product.id === productId ? { ...i, qty: safeQty } : i
      );
    });
  };

  const { totalItems, subtotalRetail } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.totalItems += item.qty;
        acc.subtotalRetail += item.product.priceRetail * item.qty;
        return acc;
      },
      { totalItems: 0, subtotalRetail: 0 }
    );
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

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);

  // Fallback seguro si algún componente usa useCart fuera del provider
  if (!ctx) {
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      clear: () => {},
      setQty: () => {},
      totalItems: 0,
      subtotalRetail: 0,
    };
  }

  return ctx;
};
