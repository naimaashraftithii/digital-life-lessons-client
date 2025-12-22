import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function useDashboardSummary(uid) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) {
      setData(null);
      setLoading(false);
      setError("");
      return;
    }

    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/dashboard/summary?uid=${uid}`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.message || "Failed to load dashboard summary");
        }

        if (!ignore) setData(json);
      } catch (e) {
        if (!ignore) setError(e.message || "Something went wrong");
        if (!ignore) setData(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [uid]);

  return { data, loading, error };
}
