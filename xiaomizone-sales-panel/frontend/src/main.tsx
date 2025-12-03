import React from "react";
import ReactDOM from "react-dom/client";
import { SalesPage } from "./pages/SalesPage";
import "./styles/globals.css";
import "./styles/theme.css";
import { CartProvider } from "./hooks/useCart";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <SalesPage />
    </CartProvider>
  </React.StrictMode>
);
