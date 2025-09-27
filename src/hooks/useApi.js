import { useState, useEffect, useCallback } from "react";

export function useApi(apiFunc, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        const result = await apiFunc(...args);
        const payload = result.data ?? result.application ?? result.transformedApplication ?? result; // try possible shapes
        setData(payload);
        return payload;
      } catch (err) {
        const erroMessage =
          err.response?.data?.message || err.message || "An error occurred";
        setError(erroMessage);
        console.error("API Error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  useEffect(() => {
    fetchData();
  }, deps);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch, fetchData };
}

// Hook for manual API calls (e.g., form submissions)
export function useApiCall(apiFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const result = await apiFunction(...args);
        setSuccess(true);
        return result.data;
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "An error occurred";
        setError(errorMessage);
        console.error("API Error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return { loading, error, success, execute, reset };
}
