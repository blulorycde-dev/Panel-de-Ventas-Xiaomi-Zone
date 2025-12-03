// frontend/src/components/sales/ProductSearch.tsx
import React, { FormEvent } from "react";

interface Props {
  q: string;
  onQChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  branch: string;
  onBranchChange: (value: string) => void;
  onSearch: () => void;
}

export const ProductSearch: React.FC<Props> = ({
  q,
  onQChange,
  category,
  onCategoryChange,
  branch,
  onBranchChange,
  onSearch
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-2 mb-4"
    >
      <input
        className="border rounded px-3 py-2 flex-1"
        placeholder="Buscar por nombre, SKU o código de barras"
        value={q}
        onChange={(e) => onQChange(e.target.value)}
      />
      <select
        className="border rounded px-3 py-2"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        <option value="movilidad">Movilidad eléctrica</option>
        <option value="electronicos">Electrónicos</option>
        <option value="myhome">My Home</option>
        <option value="wearables">Wearables</option>
      </select>
      <select
        className="border rounded px-3 py-2"
        value={branch}
        onChange={(e) => onBranchChange(e.target.value)}
      >
        <option value="">Depósito + Tienda</option>
        <option value="Deposito">Solo Depósito</option>
        <option value="Tienda">Solo Tienda</option>
      </select>
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>
    </form>
  );
};
