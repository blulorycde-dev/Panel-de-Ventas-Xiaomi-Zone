// src/components/sales/SalesApiDebug.tsx
import { useEffect, useState } from "react";
import {
  getHealth,
  getPanelConfig,
  getLocations,
  HealthResponse,
  PanelConfigResponse,
  LocationsResponse,
} from "../../api/client";

type Status = "idle" | "loading" | "ok" | "error";

export const SalesApiDebug: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [config, setConfig] = useState<PanelConfigResponse["config"] | null>(
    null
  );
  const [locations, setLocations] = useState<
    LocationsResponse["locations"] | null
  >(null);

  useEffect(() => {
    async function load() {
      try {
        setStatus("loading");
        setError(null);

        const [h, c, l] = await Promise.all([
          getHealth(),
          getPanelConfig(),
          getLocations(),
        ]);

        setHealth(h);
        setConfig(c.config);
        setLocations(l.locations);
        setStatus("ok");
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error desconocido");
        setStatus("error");
      }
    }

    load();
  }, []);

  return (
    <div
      style={{
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        background: "#f9fafb",
        fontSize: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Diagnóstico API ventas</strong>
        <span>
          Estado:{" "}
          <b>
            {status === "idle" && "Idle"}
            {status === "loading" && "Cargando..."}
            {status === "ok" && "OK"}
            {status === "error" && "Error"}
          </b>
        </span>
      </div>

      {error && (
        <p style={{ color: "#b91c1c", marginTop: 8 }}>
          Error al conectar con la API: {error}
        </p>
      )}

      {health && (
        <details style={{ marginTop: 8 }}>
          <summary>/health</summary>
          <pre
            style={{
              background: "#111827",
              color: "#e5e7eb",
              padding: 8,
              borderRadius: 4,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
            {JSON.stringify(health, null, 2)}
          </pre>
        </details>
      )}

      {config && (
        <details style={{ marginTop: 8 }}>
          <summary>/config</summary>
          <pre
            style={{
              background: "#111827",
              color: "#e5e7eb",
              padding: 8,
              borderRadius: 4,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
            {JSON.stringify(config, null, 2)}
          </pre>
        </details>
      )}

      {locations && (
        <details style={{ marginTop: 8 }}>
          <summary>/locations</summary>
          <pre
            style={{
              background: "#111827",
              color: "#e5e7eb",
              padding: 8,
              borderRadius: 4,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
            {JSON.stringify(locations, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};
