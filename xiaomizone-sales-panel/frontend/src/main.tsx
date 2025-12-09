// frontend/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // o "./SalesPage", lo que tengas
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App /> {/* o <SalesPage /> */}
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

