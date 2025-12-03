// frontend/src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { endpoints } from "../services/endpoints";
import { getJson } from "../services/apiClient";

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  barcode?: string;
  imageUrl?: string;
  priceRetail: number;
  priceWholesale: number;
  stockByBranch: Record<string, number>; // { Deposito: 10, Tienda: 3 }
}

export interface ProductsResponse {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function useProducts() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("");
  const [branch, setBranch] = useState<string>(""); // "Deposito" | "Tienda" | ""
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);

  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const url = endpoints.products({
        q,
        category,
        // el Worker convierte a upper, así que no importa el case
        branch,
        page,
        pageSize
      });
      const json = await getJson<ProductsResponse>(url);
      setData(json);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, category, branch]);

  return {
    q,
    setQ,
    category,
    setCategory,
    branch,
    setBranch,
    page,
    setPage,
    pageSize,
    data,
    loading,
    error,
    fetchProducts
  };
}
