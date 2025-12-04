// Tipos compartidos para productos y filtros

export type Branch = "DEPOSITO" | "TIENDA";

export interface StockByBranch {
  DEPOSITO: number;
  TIENDA: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  barcode?: string;
  priceRetail: number;
  priceWholesale: number;
  imageUrl?: string;
  stockByBranch: StockByBranch;
}

export interface ProductsResponse {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Llama al worker de API de panel:
 *   GET https://panel-general-api.blulorycde.workers.dev/api/products?q=...
 */
export async function fetchProducts(params: {
  q?: string;
  category?: string;
  branchFilter?: "AMBOS" | Branch;
  page?: number;
  pageSize?: number;
}): Promise<ProductsResponse> {
  const apiBase =
    import.meta.env.VITE_API_BASE ??
    "https://panel-general-api.blulorycde.workers.dev";

  const url = new URL("/api/products", apiBase);

  if (params.q) url.searchParams.set("q", params.q);
  if (params.category && params.category !== "TODAS") {
    url.searchParams.set("category", params.category);
  }
  if (params.page) url.searchParams.set("page", String(params.page));
  if (params.pageSize) url.searchParams.set("pageSize", String(params.pageSize));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar productos`);
  }
  return (await res.json()) as ProductsResponse;
}
