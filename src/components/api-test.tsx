import { useState } from "react";
import { Button } from "./ui/button";

interface ApiResponse {
  status?: string;
  timestamp?: string;
  version?: string;
  runtime?: string;
  error?: string;
}

export function ApiTest() {
  const [healthResponse, setHealthResponse] = useState<ApiResponse | null>(null);
  const [versionResponse, setVersionResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<{ health: boolean; version: boolean }>({
    health: false,
    version: false,
  });

  const testHealthEndpoint = async () => {
    setLoading((prev) => ({ ...prev, health: true }));
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      setHealthResponse(data);
    } catch (error) {
      setHealthResponse({ error: `Failed to fetch: ${error}` });
    } finally {
      setLoading((prev) => ({ ...prev, health: false }));
    }
  };

  const testVersionEndpoint = async () => {
    setLoading((prev) => ({ ...prev, version: true }));
    try {
      const response = await fetch("/api/version");
      const data = await response.json();
      setVersionResponse(data);
    } catch (error) {
      setVersionResponse({ error: `Failed to fetch: ${error}` });
    } finally {
      setLoading((prev) => ({ ...prev, version: false }));
    }
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      <h2 className="text-2xl font-bold">API Endpoint Test</h2>

      <div className="space-y-4">
        <div>
          <Button onClick={testHealthEndpoint} disabled={loading.health} className="mr-4">
            {loading.health ? "Testing..." : "Test /api/health"}
          </Button>
          {healthResponse && (
            <div className="mt-2 p-3 bg-muted rounded text-sm">
              <pre>{JSON.stringify(healthResponse, null, 2)}</pre>
            </div>
          )}
        </div>

        <div>
          <Button onClick={testVersionEndpoint} disabled={loading.version} className="mr-4">
            {loading.version ? "Testing..." : "Test /api/version"}
          </Button>
          {versionResponse && (
            <div className="mt-2 p-3 bg-muted rounded text-sm">
              <pre>{JSON.stringify(versionResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
