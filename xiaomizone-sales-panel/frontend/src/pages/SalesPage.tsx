import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/client";

type ApiState = {
  status: "idle" | "loading" | "ok" | "error";
  error?: string;
  health?: any;
  config?: any;
  locations?: any[];
};

export const SalesApiDebug: React.FC = () => {
  const [state, setState] = useState<ApiState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [healthRes, configRes, locRes] = await Promise.allSettled([
          apiClient.get("/health"),
          apiClient.get("/config"),
          apiClient.get("/locations"),
        ]);

        if (cancelled) return;

        const next: ApiState = { status: "ok" };

        if (healthRes.status === "fulfilled") {
          next.health = healthRes.value;
        }
        if (configRes.status === "fulfilled") {
          next.config = configRes.value;
        }
        if (locRes.status === "fulfilled") {
          next.locations =
            (locRes.value as any)?.locations ?? (locRes.value as any);
        }

        if (
          healthRes.status === "rejected" &&
          configRes.status === "rejected" &&
          locRes.status === "rejected"
        ) {
          next.status = "error";
          next.error = "No se pudo contactar la API";
        }

        setState(next);
      } catch (err: any) {
        if (cancelled) return;
        setState({
          status: "error",
          error: err?.message ?? "Error al cargar diagnóstico",
        });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const { status, health, config, locations, error } = state;

  return (
    <div
      style={{
        marginBottom: 8,
        padding: 8,
        borderRadius: 6,
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        fontSize: 12,
      }}
    >
      <strong>Diagnóstico API ventas</strong>
      <span style={{ float: "right" }}>
        Estado:{" "}
        <span style={{ color: status === "ok" ? "#16a34a" : "#b91c1c" }}>
          {status.toUpperCase()}
        </span>
      </span>

      {error && (
        <div style={{ marginTop: 4, color: "#b91c1c" }}>
          {error} (esto no afecta la búsqueda)
        </div>
      )}

      {config && (
        <div style={{ marginTop: 4 }}>
          <div>
            Base API: <code>{config.apiBase ?? "-"}</code>
          </div>
          {typeof config.usd_rate === "number" && (
            <div>Tasa USD: {config.usd_rate.toFixed(2)}</div>
          )}
        </div>
      )}

      {locations && locations.length > 0 && (
        <details style={{ marginTop: 4 }}>
          <summary>Locales conocidos ({locations.length})</summary>
          <ul>
            {locations.map((loc: any) => (
              <li key={loc.id}>
                {loc.code} – {loc.name}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
};
