import { useState, useEffect } from 'react';

const useHttpProxy = (initialUrl, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`fetching data from ${url}`);
      setHasError(false);
      try {
        const res = await fetch(url);
        const result = await res.json();
        setData(result);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return [{ data, isLoading, hasError }, setUrl];
};

export default useHttpProxy;
