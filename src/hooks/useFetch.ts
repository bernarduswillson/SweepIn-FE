import { useState, useEffect } from "react";
import axios from 'axios';
import Attendance from "@/interface/Attendance";

export function useFetch(url:string) {

  const [data, setData] = useState<Attendance[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Boolean>(false)

  useEffect(() => {
    (
      async function() {
        try {
          setLoading(true);
          const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + url);
          if (response.status === 200) {
            setData(response.data.data);
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