import { useEffect, useState } from "react";

export function useLoadingData<T>(
  fetchFn: () => Promise<T> | null,
  fetchKey: string | number = "default"
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setHasError(false);

      try {
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if ( fetchFn !== null ) {
      fetchData();
    }
    
    return () => {
      isMounted = false;
    };
  }, [fetchKey]);

  return { data, loading, hasError, setData };
}
