// workers/api-panel/src/index.ts
import { handleProducts } from "./routes/products";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

export interface Env {}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/api/health") {
      return json({
        status: "ok",
        service: "panel-general-api",
        path,
        timestamp: new Date().toISOString()
      });
    }

    if (path.startsWith("/api/products")) {
      return handleProducts(request);
    }

    return json({ error: "Not found", path }, 404);
  }
};

