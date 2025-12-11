// frontend/src/api/client.ts

const BASE_URL =
  (import.meta.env.VITE_SALES_API_BASE as string | undefined) ?? "";

if (!BASE_URL) {
  console.warn("VITE_SALES_API_BASE no configurado en el frontend");
}

function buildUrl(path: string, params?: Record<string, string | number | undefined>) {
  const url = new URL(path, BASE_URL || "http://localhost");
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Error API ${res.status} ${res.statusText || ""} ${text || ""}`.trim()
    );
  }
  return (await res.json()) as T;
}

// ---------------------- Tipos ----------------------

export interface HealthResponse {
  ok: boolean;
  mode: string;
  timestamp: string;
}

export interface PanelConfigResponse {
  config: {
    panelMode: string;
    supportedLangs: string[];
  };
}

export interface LocationsResponse {
  locations: Array<{
    id: number;
    code: string;
    name: string;
  }>;
}

export interface SearchProductsParams {
  q?: string;
  category?: string;
  branchFilter?: "AMBOS" | "DEPOSITO" | "TIENDA";
  page?: number;
  pageSize?: number;
}

export interface SearchProductsResponse {
  items: ProductApiItem[];
  page: number;
  total: number;
  totalPages: number;
}

export interface ProductApiItem {
  id: number;
  sku: string;
  name: string;
  category: string | null;
  store_price_usd: number;
  wholesale_price_usd: number | null;
  min_price_usd: number | null;
  min_price_locked: boolean;
  stock_deposito: number;
  stock_tienda: number;
}

// ---------------------- Endpoints ----------------------

export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch(buildUrl("/health"));
  return handleJson<HealthResponse>(res);
}

export async function getPanelConfig(): Promise<PanelConfigResponse> {
  const res = await fetch(buildUrl("/config"));
  return handleJson<PanelConfigResponse>(res);
}

export async function getLocations(): Promise<LocationsResponse> {
  const res = await fetch(buildUrl("/locations"));
  return handleJson<LocationsResponse>(res);
}

export async function searchProducts(
  params: SearchProductsParams
): Promise<SearchProductsResponse> {
  const res = await fetch(
    buildUrl("/products/search", {
      q: params.q ?? "",
      category: params.category ?? "",
      branch: params.branchFilter ?? "AMBOS",
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 25,
    })
  );
  return handleJson<SearchProductsResponse>(res);
}
