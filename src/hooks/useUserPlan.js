import { useCallback, useEffect, useRef, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function useUserPlan(uid) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(Boolean(uid));
  const [error, setError] = useState("");

  const abortRef = useRef(null);

  const refetch = useCallback(async () => {
    // no uid => reset
    if (!uid) {
      abortRef.current?.abort?.();
      setPlan(null);
      setLoading(false);
      setError("");
      return;
    }

    // cancel old request
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError("");

      const url = `${API}/users/plan?uid=${encodeURIComponent(uid)}`;
      const res = await fetch(url, { signal: controller.signal });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.message || `Failed to load plan (${res.status})`);
      }

      // ✅ normalize so Navbar always works
      const normalized = {
        ...json,
        user: json?.user || null,
        isPremium: Boolean(json?.isPremium ?? json?.user?.isPremium),
        role: json?.role || json?.user?.role || "user",
      };

      setPlan(normalized);
    } catch (e) {
      if (e?.name === "AbortError") return;
      setPlan(null);
      setError(e?.message || "Failed to load plan");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    refetch();
    return () => abortRef.current?.abort?.();
  }, [refetch]);

  return { plan, loading, error, refetch };
}
