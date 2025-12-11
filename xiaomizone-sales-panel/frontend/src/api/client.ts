// src/api/client.ts

const BASE_URL = import.meta.env.VITE_SALES_API_BASE;

if (!BASE_URL) {
  // Ayuda para detectar problemas de configuración
  // En producción casi nunca deberías ver esto si la env está bien puesta en Cloudflare Pages.
  console.warn(
    "VITE_SALES_API_BASE no está definido. Configúralo en las variables de entorno de Cloudflare Pages."
  );
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("API base URL no configurada (VITE_SALES_API_BASE).");
  }

  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error API ${res.status}: ${text}`);
  }

  // Intentamos parsear JSON; si falla, devolvemos null
  try {
    return (await res.json()) as T;
  } catch {
    return null as T;
  }
}

// Helpers específicos

export type HealthResponse = {
  ok: boolean;
  message: string;
  mode: string;
  timestamp: string;
};

export type PanelConfigResponse = {
  ok: boolean;
  config: {
    mode: string;
    supported_langs: string[];
    rates: {
      usd_pyg: number;
      usd_brl: number;
    };
  };
};

export type Location = {
  id: number;
  code: string;
  name: string;
  is_active: number;
  sort_order: number;
  created_at: string;
};

export type LocationsResponse = {
  ok: boolean;
  locations: Location[];
};

export function getHealth() {
  return apiFetch<HealthResponse>("/health");
}

export function getPanelConfig() {
  return apiFetch<PanelConfigResponse>("/config");
}

export function getLocations() {
  return apiFetch<LocationsResponse>("/locations");
}
