// frontend/src/components/sales/ProductTable.tsx
import React from "react";
import { Product } from "../../hooks/useProducts";

interface Props {
  items: Product[];
}

export const ProductTable: React.FC<Props> = ({ items }) => {
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
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="px-3 py-2">{p.name}</td>
              <td className="px-3 py-2">{p.sku}</td>
              <td className="px-3 py-2">{p.category}</td>
              <td className="px-3 py-2 text-right">
                {p.priceRetail} $
              </td>
              <td className="px-3 py-2 text-right">
                {p.priceWholesale} $
              </td>
              <td className="px-3 py-2">
                {p.stockByBranch?.Deposito ??
                  p.stockByBranch?.DEPOSITO ??
                  0}
              </td>
              <td className="px-3 py-2">
                {p.stockByBranch?.Tienda ??
                  p.stockByBranch?.TIENDA ??
                  0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


