function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

export default {
  /**
   * Worker principal del Panel General de Ventas
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Endpoint de prueba: /api/health
    if (path === "/api/health") {
      return json({
        status: "ok",
        service: "panel-general-ventas",
        path,
        timestamp: new Date().toISOString()
      });
    }

    // Más adelante: /api/products, /api/notes, etc.
    // if (path.startsWith("/api/products")) { ... }

    // Si no coincide con ninguna ruta conocida:
    return json(
      {
        error: "Not found",
        path
      },
      404
    );
  }
};
