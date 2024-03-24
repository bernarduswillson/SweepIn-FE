import { useState, useEffect } from "react";
import axios from 'axios';

export function useFetch(url: string) {
  const [error, setError] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function call() {
      setLoading(true);
      
      try {
        const res = await axios.get(url);
        const data = await res?.data;
        setData(data);  
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    
    }
    
    call();
  }, [url]);

  return {data, loading, error};
}