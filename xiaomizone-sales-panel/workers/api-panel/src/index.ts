function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

export interface Env {
  // aquí después agregamos KV, D1, etc.
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Healthcheck básico
    if (path === "/api/health") {
      return json({
        status: "ok",
        service: "panel-general-ventas",
        path,
        timestamp: new Date().toISOString()
      });
    }

    // Más adelante:
    // if (path.startsWith("/api/products")) { ... }

    return json({ error: "Not found", path }, 404);
  }
};
