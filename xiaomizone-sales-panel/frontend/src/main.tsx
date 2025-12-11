// frontend/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";
import { SalesPage } from "./pages/sales";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SalesPage />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
