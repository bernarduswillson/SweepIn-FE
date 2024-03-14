import { useState, useEffect } from "react";
import axios from 'axios';

export function useSubmit() {

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const submit = async (url:string, body: any) => {
    try {
      setLoading(true);
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + url, body);
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

  return { submit, data, loading, error };
};