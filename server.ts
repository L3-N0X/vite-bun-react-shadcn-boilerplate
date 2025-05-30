import { serve } from "bun";

const isDevelopment = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3001;

const server = serve({
  port,
  development: isDevelopment,

  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const method = req.method;

    // CORS headers for development
    const corsHeaders: Record<string, string> = isDevelopment
      ? {
          "Access-Control-Allow-Origin": "http://localhost:5173",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true",
        }
      : {};

    // Handle preflight requests
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // API Routes
    if (pathname.startsWith("/api")) {
      let response: Response;

      switch (pathname) {
        case "/api/health":
          if (method === "GET") {
            response = Response.json({
              status: "OK",
              timestamp: new Date().toISOString(),
              environment: isDevelopment ? "development" : "production",
            });
          } else {
            response = new Response("Method not allowed", { status: 405 });
          }
          break;

        case "/api/version":
          if (method === "GET") {
            response = Response.json({
              version: "1.0.0",
              runtime: "bun",
              hot_reload: isDevelopment,
            });
          } else {
            response = new Response("Method not allowed", { status: 405 });
          }
          break;

        default:
          response = Response.json(
            {
              error: "API endpoint not found",
              available_endpoints: ["/api/health", "/api/version"],
            },
            { status: 404 }
          );
      }

      // Add CORS headers to API responses
      const headers = new Headers(response.headers);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    // In development, all non-API routes should be handled by Vite dev server
    if (isDevelopment) {
      return new Response(
        "This server only handles API routes in development. Frontend is served by Vite dev server on http://localhost:5173",
        {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        }
      );
    }

    // Production static file serving would go here
    return new Response("Not found", { status: 404 });
  },

  // Error handler
  error(error) {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  },
});

console.log(`🚀 Bun server running on http://localhost:${server.port}`);
console.log(`🔧 Environment: ${isDevelopment ? "development" : "production"}`);
console.log(`🔗 API endpoints:`);
console.log(`   - GET /api/health`);
console.log(`   - GET /api/version`);

if (isDevelopment) {
  console.log(`📝 Note: Frontend is served by Vite dev server on http://localhost:5173`);
  console.log(`🔄 Hot reload enabled for server-side code`);
}
