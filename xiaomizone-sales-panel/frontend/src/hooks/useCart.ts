// Lógica de carrito simple para el panel de ventas.
// Importante: aquí no usamos JSX, solo hooks de React.

import { useCallback, useMemo, useState } from "react";
import type { Product } from "./useProducts";

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface UseCartResult {
  items: CartLine[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
}

export function useCart(): UseCartResult {
  const [items, setItems] = useState<CartLine[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id
            ? { ...l, quantity: l.quantity + 1 }
            : l
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, l) => sum + l.quantity, 0),
    [items]
  );

  return { items, addItem, removeItem, clearCart, totalItems };
}







