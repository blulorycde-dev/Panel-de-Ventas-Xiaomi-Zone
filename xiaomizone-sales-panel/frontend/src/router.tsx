import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SalesPage } from "./pages/SalesPage";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/sales" element={<SalesPage />} />
      <Route path="*" element={<Navigate to="/sales" replace />} />
    </Routes>
  );
};
