"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
      <p className="mb-4">{error.message}</p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  );
}
