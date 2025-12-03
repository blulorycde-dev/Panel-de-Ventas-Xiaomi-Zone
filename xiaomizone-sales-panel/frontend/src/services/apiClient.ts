// frontend/src/services/apiClient.ts

export interface ApiError extends Error {
  status?: number;
}

export async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!res.ok) {
    const err: ApiError = new Error(`Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  return res.json() as Promise<T>;
}
