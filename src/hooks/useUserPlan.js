import { useCallback, useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function useUserPlan(uid) {
  const [plan, setPlan] = useState({
    isPremium: false,
    role: "user",
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [bump, setBump] = useState(0);

  // ✅ call this to refresh premium/role status anytime
  const refetch = useCallback(() => {
    setBump((v) => v + 1);
  }, []);

  useEffect(() => {
    if (!uid) {
      setPlan({ isPremium: false, role: "user", user: null });
      setLoading(false);
      return;
    }

    let ignore = false;

    (async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/users/plan?uid=${uid}`);
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          if (!ignore) setPlan({ isPremium: false, role: "user", user: null });
          return;
        }

        if (!ignore) {
          setPlan({
            isPremium: !!data?.isPremium,
            role: data?.role || "user",
            user: data?.user || null,
          });
        }
      } catch {
        if (!ignore) setPlan({ isPremium: false, role: "user", user: null });
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [uid, bump]);

  return { plan, loading, refetch };
}
