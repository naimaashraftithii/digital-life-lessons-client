// src/hooks/useUserPlan.js
import { useEffect, useState } from "react";
import { getUserPlan } from "../api/usersPlan";

export default function useUserPlan(uid) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        if (!uid) {
          if (!ignore) setPlan({ isPremium: false, role: "user", user: null });
          return;
        }
        const data = await getUserPlan(uid);
        if (!ignore) setPlan(data);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [uid]);

  return { plan, loading };
}
