import { useState, useEffect } from 'react';

const useHttpProxy = (url, initialBody = {}) => {
  const [data, setData] = useState(null);
  const [body, setBody] = useState(initialBody);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setHasError(false);
      try {
        const res = await fetch(url, {
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          cache: 'no-cache',
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [body]);
  return [{ data, isLoading, hasError }, setBody];
};

export default useHttpProxy;
