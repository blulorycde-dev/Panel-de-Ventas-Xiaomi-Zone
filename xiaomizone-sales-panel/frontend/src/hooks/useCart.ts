// frontend/src/hooks/useCart.ts
// Stub sencillo del carrito para que el proyecto compile.
// Más adelante le agregamos estado real, contexto, etc.

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

// Implementación “vacía” por ahora.
// Así podemos usar useCart() sin que rompa el build.
const emptyCart: UseCartResult = {
  items: [],
  addItem: () => {
    // TODO: implementar lógica real del carrito
  },
  removeItem: () => {
    // TODO
  },
  clearCart: () => {
    // TODO
  },
  totalItems: 0,
};

export function useCart(): UseCartResult {
  return emptyCart;
}




