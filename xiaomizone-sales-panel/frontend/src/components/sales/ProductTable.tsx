// frontend/src/components/sales/ProductTable.tsx
import React from "react";
import { Product } from "../../hooks/useProducts";

interface Props {
  items: Product[];
  // opcional: si el padre pasa esta función, el botón “Agregar” la usará
  onAddToCart?: (product: Product) => void;
}

export const ProductTable: React.FC<Props> = ({ items, onAddToCart }) => {
  if (!items.length) {
    return <div className="text-sm text-gray-500">Sin resultados.</div>;
  }

  return (
    <div className="overflow-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">Producto</th>
            <th className="px-3 py-2 text-left">SKU</th>
            <th className="px-3 py-2 text-left">Categoría</th>
            <th className="px-3 py-2 text-right">Minorista</th>
            <th className="px-3 py-2 text-right">Mayorista</th>
            <th className="px-3 py-2 text-left">Stock Depósito</th>
            <th className="px-3 py-2 text-left">Stock Tienda</th>
            {/* Columna de acción */}
            {onAddToCart && (
              <th className="px-3 py-2 text-center">Acción</th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-3 py-2">{p.name}</td>
              <td className="px-3 py-2">{p.sku}</td>
              <td className="px-3 py-2">{p.category}</td>
              <td className="px-3 py-2 text-right">
                {p.priceRetail.toFixed(2)} $
              </td>
              <td className="px-3 py-2 text-right">
                {p.priceWholesale.toFixed(2)} $
              </td>
              <td className="px-3 py-2">
                {p.stockByBranch?.DEPOSITO ?? 0}
              </td>
              <td className="px-3 py-2">
                {p.stockByBranch?.TIENDA ?? 0}
              </td>
              {onAddToCart && (
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => onAddToCart(p)}
                    className="px-3 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    Agregar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



