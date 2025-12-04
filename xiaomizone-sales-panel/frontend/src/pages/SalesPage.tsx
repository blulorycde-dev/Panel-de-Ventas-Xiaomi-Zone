import React, { useEffect, useState } from "react";
import { Product, fetchProducts } from "../hooks/useProducts";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";
import { ProductTable } from "../components/sales/ProductTable";
import { useCart } from "../hooks/useCart";
import { CartPanel } from "../components/sales/CartPanel";

type BranchFilter = "AMBOS" | "DEPOSITO" | "TIENDA";

export const SalesPage: React.FC = () => {
  const { isMobile } = useResponsiveLayout();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("TODAS");
  const [branchFilter, setBranchFilter] = useState<BranchFilter>("AMBOS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const { items: cartItems, addItem, removeItem, clearCart } = useCart();
  const [note, setNote] = useState("");

  async function load(pageToLoad = 1) {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchProducts({
        q: q.trim() || undefined,
        category: category !== "TODAS" ? category : undefined,
        branchFilter,
        page: pageToLoad,
        pageSize
      });

      setItems(data.items);
      setPage(data.page);
      setTotal(data.total);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  }

  // Carga inicial
  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    load(1);
  }

  function handleNextPage() {
    if (page < totalPages) load(page + 1);
  }

  function handlePrevPage() {
    if (page > 1) load(page - 1);
  }

  function handleClearNote() {
    clearCart();
    setNote("");
  }

  return (
    <div className="app-shell layout-main">
      {/* Columna principal: búsqueda + tabla */}
      <div className="main-column card">
        <h1>Panel de ventas · Búsqueda de productos</h1>
        <p style={{ marginBottom: 12, color: "#6b7280", fontSize: 13 }}>
          Vista rápida para vendedores — optimizada para{" "}
          {isMobile ? "móvil" : "escritorio"}.
        </p>

        <form className="toolbar" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Buscar por nombre, SKU o código"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ minWidth: 180, flex: "1 1 160px" }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="TODAS">Todas las categorías</option>
            <option value="movilidad">Movilidad eléctrica</option>
            <option value="myhome">My Home</option>
            <option value="electronicos">Electrónicos</option>
            <option value="wearables">Wearables</option>
          </select>

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value as BranchFilter)}
          >
            <option value="AMBOS">Depósito + Tienda</option>
            <option value="DEPOSITO">Solo Depósito</option>
            <option value="TIENDA">Solo Tienda</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Buscar"}
          </button>
        </form>

        {error && (
          <div
            style={{
              marginBottom: 8,
              padding: 8,
              borderRadius: 6,
              background: "#fef2f2",
              color: "#b91c1c",
              fontSize: 12
            }}
          >
            {error}
          </div>
        )}

        <ProductTable items={items} onAddToCart={addItem} />

        <div className="pagination">
          <span>
            Página {page} de {totalPages} · {total} productos
          </span>
          <button onClick={handlePrevPage} disabled={page <= 1 || loading}>
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages || loading}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Columna lateral: nota / carrito */}
      <div className="side-column card">
        <CartPanel
          items={cartItems}
          note={note}
          onChangeNote={setNote}
          onRemove={removeItem}
          onClear={handleClearNote}
        />
      </div>
    </div>
  );
};
