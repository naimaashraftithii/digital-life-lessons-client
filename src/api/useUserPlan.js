
import { useCallback, useEffect, useState } from "react";
import { getUserPlan } from "../api/usersPlan";

const FREE = { isPremium: false, role: "user", user: null };

export default function useUserPlan(uid) {
  const [plan, setPlan] = useState(FREE);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserPlan(uid);
      setPlan(data || FREE);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { plan, loading, refetch };
}

