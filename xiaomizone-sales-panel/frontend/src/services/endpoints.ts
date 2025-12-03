// frontend/src/services/endpoints.ts

// URL base de tu Worker en producción
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "https://panel-general-api.blulorycde.workers.dev";

export const endpoints = {
  products: (
    params?: URLSearchParams | Record<string, string | number | undefined>
  ) => {
    let query = "";
    if (params instanceof URLSearchParams) {
      query = `?${params.toString()}`;
    } else if (params) {
      const usp = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== "") {
          usp.set(key, String(value));
        }
      }
      query = `?${usp.toString()}`;
    }
    return `${API_BASE}/api/products${query}`;
  }
};

