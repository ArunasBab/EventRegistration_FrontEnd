import { useState, useCallback, useRef, useEffect } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const activeHttpRequests = useRef([]);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  const sendRequest = useCallback(async (requestFn, ...args) => {
    setIsLoading(true);
    setError(null);

    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await requestFn(...args, {
        signal: httpAbortCtrl.signal,
      });

      activeHttpRequests.current = activeHttpRequests.current.filter(
        (reqCtrl) => reqCtrl !== httpAbortCtrl
      );

      return response;
    } catch (err) {
      if (err.name !== "AbortError") {
        setError({
          message: err.message || "Kažkas nutiko... Bandykite dar kartą.",
          status: err.response?.status,
          data: err.response?.data,
        });
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = () => setError(null);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};

export default useHttp;
