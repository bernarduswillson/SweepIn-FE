import { useState, useEffect } from "react";
import axios from 'axios';

export function useFetch(url:string) {

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (
      async function() {
        try {
          setLoading(true);
          const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + url);
          if (response.status === 200) {
            setData(response.data);
          } else {
            setError(true);
          }
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    )()
  }, [url]);

  return { data, loading, error };
};