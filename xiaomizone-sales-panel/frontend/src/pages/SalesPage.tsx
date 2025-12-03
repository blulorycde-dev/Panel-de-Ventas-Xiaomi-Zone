// frontend/src/pages/SalesPage.tsx
import React from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductSearch } from "../components/sales/ProductSearch";
import { ProductTable } from "../components/sales/ProductTable";

export const SalesPage: React.FC = () => {
  const {
    q,
    setQ,
    category,
    setCategory,
    branch,
    setBranch,
    page,
    setPage,
    data,
    loading,
    error,
    fetchProducts
  } = useProducts();

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-semibold mb-2">
        Búsqueda de productos
      </h1>

      <ProductSearch
        q={q}
        onQChange={setQ}
        category={category}
        onCategoryChange={setCategory}
        branch={branch}
        onBranchChange={setBranch}
        onSearch={() => {
          setPage(1);
          fetchProducts();
        }}
      />

      {loading && <div>Cargando productos…</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}

      {data && (
        <>
          <ProductTable items={data.items} />
          <div className="flex items-center justify-between mt-2 text-sm">
            <span>
              Página {data.page} de {totalPages} · {data.total} productos
            </span>
            <div className="flex gap-2">
              <button
                className="border rounded px-3 py-1 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Anterior
              </button>
              <button
                className="border rounded px-3 py-1 disabled:opacity-50"
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={page >= totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
