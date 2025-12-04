// frontend/src/components/sales/CartPanel.tsx
import React from "react";
import { useCart } from "../../hooks/useCart";

interface Props {
  noteText: string;
  onNoteTextChange: (value: string) => void;
}

export const CartPanel: React.FC<Props> = ({
  noteText,
  onNoteTextChange,
}) => {
  const { items, removeItem, clear, setQty, totalItems, subtotalRetail } =
    useCart();

  const handleQtyChange = (productId: string, value: string) => {
    const num = parseInt(value.replace(/[^\d]/g, ""), 10);
    if (Number.isNaN(num)) {
      setQty(productId, 1);
    } else {
      setQty(productId, num);
    }
  };

  return (
    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <h2>Nota rápida / Carrito</h2>
        <p style={{ fontSize: 12, color: "var(--xz-text-soft)", margin: 0 }}>
          Útil para armar presupuestos rápidos o anotar lo que se lleva el
          cliente.
        </p>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          border: "1px solid var(--xz-border)",
          borderRadius: 8,
          padding: 8,
          background: "#f9fafb",
        }}
      >
        {items.length === 0 ? (
          <div style={{ fontSize: 13, color: "var(--xz-text-soft)" }}>
            Nota vacía. Agregá productos desde la tabla de la izquierda.
          </div>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.map((item) => {
              const lineSubtotal = item.product.priceRetail * item.qty;
              return (
                <li
                  key={item.product.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    padding: "6px 4px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>
                        {item.product.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--xz-text-soft)",
                        }}
                      >
                        {item.product.sku}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                      aria-label="Quitar producto"
                    >
                      ✕
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      fontSize: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span>Cant.</span>
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) =>
                          handleQtyChange(item.product.id, e.target.value)
                        }
                        style={{
                          width: 60,
                          padding: "2px 4px",
                          borderRadius: 6,
                          border: "1px solid var(--xz-border)",
                          fontSize: 12,
                        }}
                      />
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div>
                        <span style={{ color: "var(--xz-text-soft)" }}>
                          Precio unit.:
                        </span>{" "}
                        {item.product.priceRetail.toFixed(2)} $
                      </div>
                      <div style={{ fontWeight: 600 }}>
                        Subtotal: {lineSubtotal.toFixed(2)} $
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Comentarios / nombre del cliente
        </label>
        <textarea
          value={noteText}
          onChange={(e) => onNoteTextChange(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            resize: "vertical",
            padding: 8,
            borderRadius: 8,
            border: "1px solid var(--xz-border)",
            fontSize: 13,
          }}
          placeholder="Ej: Juan Pérez - quiere comparar este combo con Nissei / Mega..."
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          marginTop: 4,
          gap: 8,
        }}
      >
        <div>
          <div>Total ítems: {totalItems}</div>
          <div>
            Total estimado (minorista):{" "}
            <strong>{subtotalRetail.toFixed(2)} $</strong>
          </div>
        </div>
        <button
          type="button"
          onClick={clear}
          disabled={items.length === 0 && !noteText}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid var(--xz-border)",
            background: "#fff",
            cursor: items.length === 0 && !noteText ? "default" : "pointer",
            opacity: items.length === 0 && !noteText ? 0.6 : 1,
            fontSize: 13,
          }}
        >
          Limpiar nota
        </button>
      </div>
    </div>
  );
};
