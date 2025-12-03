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
  {products.map((p) => (
    <tr key={p.id}>
      <td>{p.name}</td>
      <td>{p.sku}</td>
      <td>{p.category}</td>
      <td>{p.priceRetail}</td>
      <td>{p.priceWholesale}</td>
      <td>{p.stockByBranch.DEPOSITO}</td>
      <td>{p.stockByBranch.TIENDA}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

