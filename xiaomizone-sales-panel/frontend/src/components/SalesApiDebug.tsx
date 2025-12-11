// src/components/SalesApiDebug.tsx
import { useEffect, useState } from "react";
import {
  getHealth,
  getPanelConfig,
  getLocations,
  HealthResponse,
  PanelConfigResponse,
  LocationsResponse,
} from "../api/client";

type Status = "idle" | "loading" | "ok" | "error";

export function SalesApiDebug() {
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
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Diagnóstico API ventas</h2>
      <p style={{ fontSize: 12, opacity: 0.8 }}>
        Verificando conexión entre frontend y sales-panel-api.
      </p>

      <p>
        Estado:{" "}
        <strong>
          {status === "idle" && "Idle"}
          {status === "loading" && "Cargando..."}
          {status === "ok" && "OK"}
          {status === "error" && "Error"}
        </strong>
      </p>

      {error && (
        <p style={{ color: "red" }}>
          Error al conectar con la API: {error}
        </p>
      )}

      {health && (
        <div style={{ marginTop: "1rem" }}>
          <h3>/health</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: 4,
              fontSize: 12,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
{JSON.stringify(health, null, 2)}
          </pre>
        </div>
      )}

      {config && (
        <div style={{ marginTop: "1rem" }}>
          <h3>/config</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: 4,
              fontSize: 12,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
{JSON.stringify(config, null, 2)}
          </pre>
        </div>
      )}

      {locations && (
        <div style={{ marginTop: "1rem" }}>
          <h3>/locations</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "0.5rem",
              borderRadius: 4,
              fontSize: 12,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
{JSON.stringify(locations, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
