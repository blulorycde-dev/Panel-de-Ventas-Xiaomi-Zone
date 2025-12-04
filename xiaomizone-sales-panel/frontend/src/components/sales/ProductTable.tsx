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
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>SKU</th>
            <th>Categoría</th>
            <th className="num">Minorista</th>
            <th className="num">Mayorista</th>
            <th className="num">Stock Depósito</th>
            <th className="num">Stock Tienda</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.category}</td>
              <td className="num">{p.priceRetail.toFixed(2)} $</td>
              <td className="num">{p.priceWholesale.toFixed(2)} $</td>
              <td className="num">{p.stockByBranch.DEPOSITO ?? 0}</td>
              <td className="num">{p.stockByBranch.TIENDA ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
