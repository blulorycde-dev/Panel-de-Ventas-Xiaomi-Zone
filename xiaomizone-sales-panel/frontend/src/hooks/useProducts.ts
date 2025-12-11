// frontend/src/hooks/useProducts.ts
import { searchProducts } from "../api/client";

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string | null;
  storePriceUsd: number;
  wholesalePriceUsd: number | null;
  minPriceUsd: number | null;
  minPriceLocked: boolean;
  stockDeposito: number;
  stockTienda: number;
}

export interface FetchProductsParams {
  q?: string;
  category?: string;
  branchFilter?: "AMBOS" | "DEPOSITO" | "TIENDA";
  page?: number;
  pageSize?: number;
}

export interface FetchProductsResult {
  items: Product[];
  page: number;
  total: number;
  totalPages: number;
}

export async function fetchProducts(
  params: FetchProductsParams
): Promise<FetchProductsResult> {
  const res = await searchProducts({
    q: params.q,
    category: params.category,
    branchFilter: params.branchFilter,
    page: params.page,
    pageSize: params.pageSize,
  });

  const items: Product[] = res.items.map((p) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    category: p.category,
    storePriceUsd: p.store_price_usd,
    wholesalePriceUsd: p.wholesale_price_usd,
    minPriceUsd: p.min_price_usd,
    minPriceLocked: p.min_price_locked,
    stockDeposito: p.stock_deposito,
    stockTienda: p.stock_tienda,
  }));

  return {
    items,
    page: res.page,
    total: res.total,
    totalPages: res.totalPages,
  };
}
