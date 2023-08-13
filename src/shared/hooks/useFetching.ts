import { useState } from "react";

export function useFetching(callback: () => Promise<void>) {
  const [isLoading, setIsLoadting] = useState(false);
  const [error, setError] = useState("");

  const fetching = async () => {
    try {
      setIsLoadting(true);
      await callback();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoadting(false);
    }
  };

  return [isLoading, error, fetching] as const;
}