import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ApiTest } from "@/components/api-test";

export function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-4xl font-bold">Simple Counter Demo</h1>

      <div className="flex flex-col items-center space-y-4">
        <div className="text-6xl font-mono font-bold">{count}</div>

        <Button onClick={() => setCount((count) => count + 1)} size="lg" className="min-w-32">
          Increment
        </Button>

        <Button
          onClick={() => {
            setCount(0);
            toast.success("Counter reset!");
          }}
          variant="outline"
          size="sm"
        >
          Reset
        </Button>
      </div>

      <div className="w-full max-w-2xl">
        <ApiTest />
      </div>
    </>
  );
}
