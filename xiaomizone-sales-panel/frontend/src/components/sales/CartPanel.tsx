import React from "react";
import type { CartLine } from "../../hooks/useCart";

interface Props {
  items: CartLine[];
  note: string;
  onChangeNote: (value: string) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export const CartPanel: React.FC<Props> = ({
  items,
  note,
  onChangeNote,
  onRemove,
  onClear
}) => {
  const hasItems = items.length > 0;

  return (
    <div>
      <h2>Nota rápida / Carrito</h2>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        Útil para armar presupuestos rápidos o anotar lo que se lleva el
        cliente.
      </p>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 8,
          marginBottom: 8,
          maxHeight: 220,
          overflow: "auto",
          background: "#f9fafb"
        }}
      >
        {items.length === 0 && (
          <div style={{ fontSize: 13, color: "#9ca3af" }}>
            Aún no hay productos en la nota.  
            Usá el botón “Agregar” de la tabla.
          </div>
        )}

        {items.map((line) => (
          <div
            key={line.product.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              fontSize: 13,
              padding: "4px 0",
              borderBottom: "1px solid #e5e7eb"
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {line.product.name}
              </div>
              <div style={{ color: "#6b7280", fontSize: 12 }}>
                {line.product.sku} · x{line.quantity}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemove(line.product.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "#b91c1c",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1
              }}
              title="Quitar de la nota"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 500,
          marginBottom: 4
        }}
      >
        Comentarios / nombre del cliente
      </label>
      <textarea
        value={note}
        onChange={(e) => onChangeNote(e.target.value)}
        placeholder="Ej: Juan Pérez · quiere comparar este combo con Nissei / Mega..."
        style={{
          width: "100%",
          minHeight: 80,
          fontSize: 13,
          borderRadius: 8,
          border: "1px solid #e5e7eb",
          padding: 8,
          resize: "vertical"
        }}
      />

      <div
        style={{
          marginTop: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          fontSize: 12
        }}
      >
        <span style={{ color: "#6b7280" }}>
          Total ítems:{" "}
          <strong>
            {items.reduce((s, l) => s + l.quantity, 0)}
          </strong>
        </span>
        <button
          type="button"
          onClick={onClear}
          disabled={!hasItems && !note}
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            background: hasItems || note ? "#fff" : "#f9fafb",
            cursor: hasItems || note ? "pointer" : "default",
            color: "#374151"
          }}
        >
          Limpiar nota
        </button>
      </div>
    </div>
  );
};
