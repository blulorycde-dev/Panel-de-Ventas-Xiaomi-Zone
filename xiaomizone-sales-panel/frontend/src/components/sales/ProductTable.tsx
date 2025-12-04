import React from "react";
import { Product } from "../../hooks/useProducts";

interface Props {
  items: Product[];
  onAddToCart?: (product: Product) => void;
}

export const ProductTable: React.FC<Props> = ({ items, onAddToCart }) => {
  if (!items.length) {
    return <div className="text-sm text-gray-500">Sin resultados.</div>;
  }

  const hasActions = Boolean(onAddToCart);

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
            {hasActions && <th className="num">Acciones</th>}
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
              {hasActions && (
                <td className="num">
                  <button
                    type="button"
                    onClick={() => onAddToCart && onAddToCart(p)}
                    style={{
                      padding: "3px 8px",
                      borderRadius: 9999,
                      border: "1px solid #ff6a00",
                      background: "#fff7ed",
                      color: "#c2410c",
                      fontSize: 12,
                      cursor: "pointer"
                    }}
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

