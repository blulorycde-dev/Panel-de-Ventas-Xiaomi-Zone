// Stub de carrito para usar más adelante.
// IMPORTANTE: sin JSX aquí (archivo .ts).

import { Product } from "./useProducts";

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

const emptyCart: UseCartResult = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalItems: 0
};

export function useCart(): UseCartResult {
  return emptyCart;
}





